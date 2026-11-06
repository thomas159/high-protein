<script setup lang="ts">
import Img from '@/components/Img.vue'
const { siteName, siteDescription } = useAppConfig()
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { data: recipe } = await useAsyncData(`${route.path}-${locale.value}`, () => {
  const contentPath = locale.value === 'en' ? `/recipes/${route.params.slug}` : `/recipes/${route.params.slug}.${locale.value}`
  return queryCollection('recipes').path(contentPath).first()
})

if (!recipe.value) {
  const slugParam = route.params.slug as string
  const otherLocaleRecipe = await queryCollection('recipes').where('slug', '=', slugParam).first()
  if (otherLocaleRecipe) {
    if (otherLocaleRecipe.image) {
      const allMatching = await queryCollection('recipes').where('image', '=', otherLocaleRecipe.image).all()
      const targetSibling = allMatching.find((s: any) => {
        if (locale.value === 'en') return !s.path.endsWith('.es') && !s.path.endsWith('.de')
        return s.path.endsWith(`.${locale.value}`)
      })
      if (targetSibling?.slug) {
        const isTargetEs = targetSibling.path.endsWith('.es')
        const isTargetDe = targetSibling.path.endsWith('.de')
        const targetPrefix = isTargetEs ? '/es/recetas' : isTargetDe ? '/de/rezepte' : '/recipes'
        await navigateTo(`${targetPrefix}/${targetSibling.slug}`, { redirectCode: 301 })
      }
    }
    const isEs = otherLocaleRecipe.path.endsWith('.es')
    const isDe = otherLocaleRecipe.path.endsWith('.de')
    const targetPrefix = isEs ? '/es/recetas' : isDe ? '/de/rezepte' : '/recipes'
    await navigateTo(`${targetPrefix}/${otherLocaleRecipe.slug}`, { redirectCode: 301 })
  } else {
    throw createError({ statusCode: 404, statusMessage: t('error.pageNotFound'), fatal: true })
  }
}

if (recipe.value?.image) {
  const { data: siblings } = await useAsyncData(`${route.path}-siblings`, async () => {
    const all = await queryCollection('recipes').select('slug', 'path', 'image').all()
    return all.filter((r: any) => r.image === recipe.value?.image)
  })

  if (siblings.value?.length) {
    const enSibling = siblings.value.find(s => !s.path.endsWith('.es') && !s.path.endsWith('.de'))
    const esSibling = siblings.value.find(s => s.path.endsWith('.es'))
    const deSibling = siblings.value.find(s => s.path.endsWith('.de'))
    const i18nParams: Record<string, { slug: string }> = {}
    if (enSibling) i18nParams.en = { slug: enSibling.slug }
    if (esSibling) i18nParams.es = { slug: esSibling.slug }
    if (deSibling) i18nParams.de = { slug: deSibling.slug }
    
    useSetI18nParams()(i18nParams)
  }
}
// Helper to format minutes into ISO8601 (Schema requirement)
const formatIso = (mins: number) => `PT${mins}M`

// 2. Map the Nuxt Content FAQ data to fit Nuxt UI's UAccordion properties
const accordionItems = computed(() => {
  if (!recipe.value?.faq) return []
  
  return recipe.value.faq.map((item) => ({
    label: item.question,
    content: item.answer
  }))
})

// 3. Inject valid FAQPage & Recipe JSON-LD schema for Google
if (recipe.value) {
  const schema = []

  // If FAQs exist, add the FAQPage type and map the questions into schema
  if (recipe.value.faq && recipe.value.faq.length > 0) {
    // Add FAQPage as an additional type to the WebPage
    schema.push(
      defineWebPage({
        '@type': ['WebPage', 'FAQPage']
      })
    )

    // Push each question as valid Google Schema
    recipe.value.faq.forEach(item => {
      schema.push(
        defineQuestion({
          name: item.question,
          acceptedAnswer: item.answer
        })
      )
    })
  }

  // Generate the schema into the document <head>
  useSchemaOrg(schema)
}
// Short SEO description (falls back to a trimmed version of the long description)
const truncate = (text: string, max = 160) => {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}
const seoDescription = recipe.value?.seoDescription || (recipe.value?.description ? truncate(recipe.value.description) : undefined)
const publishedDate = recipe.value?.date || undefined
const modifiedDate = recipe.value?.updated || publishedDate
const ogImageUrl = recipe.value?.image ? `https://res.cloudinary.com/mealse-co-uk/image/upload/f_auto,q_auto,c_fill,w_1200,h_630/${recipe.value.image}.jpg` : undefined

// 1. SEO Meta Tags (Dynamic for both SSR & Client Navigation)
useSeoMeta({
  title: recipe.value?.title,
  ogTitle: recipe.value?.title,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: ogImageUrl,
  ogImageWidth: ogImageUrl ? 1200 : undefined,
  ogImageHeight: ogImageUrl ? 630 : undefined,
  ogImageAlt: recipe.value?.alt || recipe.value?.title,
  ogType: 'article',
  articleAuthor: ['Tom Harrison'],
  articlePublishedTime: publishedDate,
  articleModifiedTime: modifiedDate,
  ogUrl: `https://www.hotrecipes.co.uk${route.path}`,
  twitterCard: 'summary_large_image',
  twitterTitle: recipe.value?.title,
  twitterDescription: seoDescription,
  twitterImage: ogImageUrl,
})

// 2. Schema
type RecipeDiet = "LowCalorieDiet" | "VeganDiet" | "VegetarianDiet";

// Every recipe on the site is vegetarian. Vegan is flagged via tags or categories.
const dietArray: RecipeDiet[] = ["VegetarianDiet"];
const dietLabels = [...(recipe.value?.categories || []), ...(recipe.value?.tags || [])].map(l => String(l).toLowerCase())
if (dietLabels.includes('vegan')) {
  dietArray.push("VeganDiet");
}
// Only claim low calorie when it is actually true (per serving)
if (recipe.value?.macros?.calories && recipe.value.macros.calories <= 400) {
  dietArray.push("LowCalorieDiet");
}

// Map internal category keys to human-readable schema categories
const SCHEMA_CATEGORY: Record<string, string> = {
  dinner: 'Main Course',
  snacks: 'Snack',
  dessert: 'Dessert',
  ninjacreami: 'Dessert',
  sauce: 'Sauce',
  'side-dish': 'Side Dish',
  soup: 'Soup',
  pasta: 'Main Course',
  pizza: 'Main Course',
  baking: 'Dessert',
}
const schemaCategory = recipe.value?.categories?.map(c => SCHEMA_CATEGORY[c]).find(Boolean) || 'Main Course'

const baseImg = 'https://res.cloudinary.com/mealse-co-uk/image/upload/f_auto,q_auto'
const schemaImages = recipe.value?.image ? [
  `${baseImg},c_fill,ar_16:9,w_1200/${recipe.value.image}.jpg`,
  `${baseImg},c_fill,ar_4:3,w_1200/${recipe.value.image}.jpg`,
  `${baseImg},c_fill,ar_1:1,w_1200/${recipe.value.image}.jpg`,
  `${baseImg}/${recipe.value.image}`
] : []

const getStepText = (step: unknown): string => {
  if (!step) return ''
  if (typeof step === 'string') return step
  if (typeof step === 'object') {
    const record = step as Record<string, unknown>
    if (typeof record.text === 'string') return record.text
    const entries = Object.entries(record)
    if (entries.length > 0) {
      return entries.map(([k, v]) => `${k}: ${v}`).join(' ')
    }
  }
  return String(step)
}

const getStepImage = (step: unknown): string | undefined => {
  if (typeof step === 'object' && step !== null) {
    const record = step as Record<string, unknown>
    if (typeof record.image === 'string') {
      return record.image
    }
  }
  return undefined
}

useSchemaOrg([
  defineRecipe({
    name: recipe.value?.title,
    description: seoDescription,
    image: schemaImages,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    aggregateRating: (recipe.value?.rating && recipe.value?.reviews && recipe.value.reviews > 0) ? {
      '@type': 'AggregateRating',
      ratingValue: recipe.value.rating,
      reviewCount: recipe.value.reviews
    } : undefined,
    author: {
      '@type': 'Person',
      name: 'Tom Harrison',
      url: `https://www.hotrecipes.co.uk${localePath('about')}`,
      sameAs: ['https://www.pinterest.com/hotRecipesUk']
    },
    // Time mapping (only passed when > 0 to prevent PT0M warnings in Google Search Console)
    prepTime: recipe.value?.prepTimeMins ? formatIso(recipe.value.prepTimeMins) : undefined,
    cookTime: recipe.value?.cookTimeMins ? formatIso(recipe.value.cookTimeMins) : undefined,
    totalTime: ((recipe.value?.prepTimeMins || 0) + (recipe.value?.cookTimeMins || 0)) > 0
      ? formatIso((recipe.value?.prepTimeMins || 0) + (recipe.value?.cookTimeMins || 0))
      : undefined,

    // Yield and Category
    recipeYield: recipe.value?.servings ? String(recipe.value.servings) : undefined,
    recipeCategory: schemaCategory,
    recipeCuisine: recipe.value?.cuisine || undefined,

    // Keywords and Diet
    keywords: recipe.value?.keywords?.length ? recipe.value.keywords : (recipe.value?.flavor_profile ? recipe.value.flavor_profile.split(', ') : []),
    suitableForDiet: dietArray,

    // Nutrition mapping (Using your nested macros)
    // Only emit nutrition values that actually exist (never claim 0 kcal by default)
    nutrition: recipe.value?.macros?.calories ? {
      '@type': 'NutritionInformation',
      servingSize: '1 serving',
      calories: `${recipe.value.macros.calories} calories`,
      proteinContent: recipe.value.macros.protein != null ? `${recipe.value.macros.protein} g` : undefined,
      fatContent: recipe.value.macros.fat != null ? `${recipe.value.macros.fat} g` : undefined,
      carbohydrateContent: recipe.value.macros.carbs != null ? `${recipe.value.macros.carbs} g` : undefined,
    } : undefined,

    // Ingredients mapping
    recipeIngredient: recipe.value?.ingredients?.map(i => {
      const amount = i.amount ? `${i.amount}${i.unit || ''} ` : ''
      const type = i.type ? ` (${i.type})` : ''
      return `${amount}${i.item}${type}`.trim()
    }) || [],
    // Directions mapping
    recipeInstructions: recipe.value?.steps?.map((step: unknown, index: number) => {
      const text = getStepText(step)
      const stepObj: Record<string, unknown> = {
        '@type': 'HowToStep',
        name: `Step ${index + 1}`,
        position: index + 1,
        text,
        url: `https://www.hotrecipes.co.uk${route.path}#step-${index + 1}`
      }
      const stepImg = getStepImage(step)
      if (stepImg) {
        stepObj.image = stepImg.startsWith('http')
          ? stepImg
          : `https://res.cloudinary.com/mealse-co-uk/image/upload/f_auto,q_auto/${stepImg}`
      }
      return stepObj
    }) || [],

  })
])

// Only the fields recipe cards render (keeps the SSR payload lean)
const CARD_FIELDS = ['path', 'slug', 'title', 'seoDescription', 'image', 'alt', 'categories', 'tags', 'macros', 'prepTimeMins', 'cookTimeMins', 'rating', 'reviews'] as const

const { data: relatedRecipes } = await useAsyncData(`${route.path}-related`, async () => {
  // Guard: if no recipe found, return empty array
  if (!recipe.value?.categories || recipe.value.categories.length === 0) return []

  // Get the first category from the current recipe's array
  const primaryCategory = recipe.value.categories[0]


  let builder = queryCollection('recipes')
    .where('categories', 'LIKE', `%${primaryCategory}%`)
    .where('slug', '<>', recipe.value.slug)

  if (locale.value === 'en') {
    builder = builder.where('path', 'NOT LIKE', '%.es').where('path', 'NOT LIKE', '%.de')
  } else {
    builder = builder.where('path', 'LIKE', `%.${locale.value}`)
  }

  return builder.select(...CARD_FIELDS).limit(4).all()

}, {
  watch: [recipe], // Re-run if the main recipe changes
  default: () => []
})

// Randomized Feature: "You Might Also Like"
const { data: randomizedRecipes } = await useAsyncData(`${route.path}-random`, async () => {
  if (!recipe.value?.categories || recipe.value.categories.length === 0) return []

  const primaryCategory = recipe.value.categories[0]

  let builder = queryCollection('recipes')
    .where('categories', 'LIKE', `%${primaryCategory}%`)
    .where('slug', '<>', recipe.value.slug)
  
  if (locale.value === 'en') {
    builder = builder.where('path', 'NOT LIKE', '%.es').where('path', 'NOT LIKE', '%.de')
  } else {
    builder = builder.where('path', 'LIKE', `%.${locale.value}`)
  }
  const matchingRecipes = await builder.select(...CARD_FIELDS).all()

  // Exclude the recipes already shown in the standard "Related Recipes" section
  const relatedSlugs = relatedRecipes.value?.map(r => r.slug) || []
  const uniqueRecipes = matchingRecipes.filter(r => !relatedSlugs.includes(r.slug))

  // Shuffle the remaining unique recipes and grab 3. The shuffle is seeded from the slug so the
  // server and client render the same list (no hydration mismatch, stable internal links for crawlers).
  let seed = [...(recipe.value.slug || '')].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7)
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }
  const shuffled = [...uniqueRecipes]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]
  }
  return shuffled.slice(0, 3)
}, {
  watch: [recipe],
  default: () => []
})

// Fetch collections that feature this recipe
const { data: relatedCollections } = await useAsyncData(`${route.path}-collections`, async () => {
  if (!recipe.value?.slug) return []
  
  let builder = queryCollection('collections')
  if (locale.value === 'en') {
    builder = builder.where('path', 'NOT LIKE', '%.es').where('path', 'NOT LIKE', '%.de')
  } else {
    builder = builder.where('path', 'LIKE', `%.${locale.value}`)
  }
  const allCollections = await builder.select('path', 'slug', 'title', 'description', 'image', 'recipes').all()
  return allCollections.filter(c => 
    c.recipes?.some((r: any) => r.slug === recipe.value?.slug)
  )
}, {
  watch: [recipe],
  default: () => []
})


// Helper to clean up collection titles for the SEO hook
const getCollectionHook = (title?: string) => {
  if (!title) return t('recipes.more')
  const clean = title.replace(/^(The\s+Ultimate\s+|The\s+Quickest,\s+Crispiest\s+|The\s+|A\s+|An\s+)/i, '')
  return `${t('recipes.more')} ${clean.toLowerCase()}`
}

const { formatText } = useFormatText()

useHead({
  // Recipe titles are already long and keyword-rich, so skip the site-name suffix to avoid truncation in SERPs
  titleTemplate: (title) => title || siteName,
  meta: [
    ...(recipe.value?.keywords?.length ? [{ name: 'keywords', content: recipe.value.keywords.join(', ') }] : [])
  ]
})
</script>

<template>
  <article v-if="recipe">

    <RecipesHero :recipe="recipe" />

    <!--
      Ingredients render ONCE (no duplicate hidden copy for SEO). CSS grid order places
      them after the intro on mobile and as a sticky left sidebar on desktop.
    -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12 lg:gap-y-0 lg:grid-rows-[auto_1fr]">

      <RecipesIngredients class="order-2 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2" :recipe="recipe" />

      <div id="recipe" class="order-1 lg:order-none lg:col-start-5 lg:col-span-8 lg:row-start-1 lg:pl-6 relative">
        <div v-if="relatedCollections?.length" class="mt-4 mb-8 space-y-6">
          <div v-for="collection in relatedCollections" :key="collection.path">
            <p class="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
              <Icon name="ph:sparkle-duotone" class="w-4 h-4 text-emerald-500" />
              {{ t('recipes.featuredIn') }}
            </p>
            <CollectionCard :collection="collection" heading-tag="h3" />
          </div>
        </div>

        <div v-if="recipe.blurb?.length" class="mt-4 space-y-4">
          <p v-for="(blurb, index) in recipe.blurb" :key="index" class="text-muted-foreground" v-html="formatText(blurb)" />
        </div>

        <h2 v-if="recipe.works?.length" id="works" class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground mt-8 mb-6">{{ t('recipes.whyWorks', { title: recipe.title }) }}</h2>
        <div v-if="recipe.works?.length" class="mt-4 space-y-4 border-b border-border pb-8">
          <p v-for="(work, index) in recipe.works" :key="index" class="text-muted-foreground" v-html="formatText(work)" />
        </div>
      </div>

      <div class="order-3 lg:order-none lg:col-start-5 lg:col-span-8 lg:row-start-2 lg:pl-6 relative">
        <!-- How To Make / Steps Section -->
        <section class="mt-12 mb-12">
          <!-- Section Kicker / Badge -->
          <div class="flex items-center gap-2 mb-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Icon name="ph:fire-simple-bold" class="w-4 h-4 text-emerald-500" />
              {{ t('recipes.stepByStep') }}
            </span>
          </div>

          <h2 id="howToMake" class="scroll-mt-24 text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground mb-6">
            {{ t('recipes.howToMake', { title: recipe.title }) }}
          </h2>

          <!-- Steps Container with background and border -->
          <div class="bg-card/70 dark:bg-card/40 border border-border/80 rounded-3xl p-4 sm:p-7 shadow-xs">
            <ol class="space-y-4 list-none p-0 m-0">
              <li
                v-for="(step, index) in recipe.steps"
                :id="`step-${index + 1}`"
                :key="index"
                class="scroll-mt-24 rounded-2xl border border-border bg-background/95 dark:bg-muted/20 hover:border-emerald-500/40 p-5 sm:p-6 transition-all duration-200 group"
              >
                <div class="flex items-start gap-4">
                  <!-- Step Number Badge -->
                  <div class="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 font-black text-sm sm:text-base flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-200 shadow-xs">
                    {{ index + 1 }}
                  </div>

                  <!-- Step Content Body -->
                  <div class="flex-grow min-w-0 space-y-2.5">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-black uppercase tracking-wider text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {{ t('recipes.step', { index: index + 1 }) }}
                      </span>
                    </div>

                    <!-- eslint-disable vue/no-v-html -->
                    <p
                      class="text-base sm:text-lg text-foreground/90 leading-relaxed m-0"
                      v-html="formatText(getStepText(step))"
                    />
                    <!-- eslint-enable vue/no-v-html -->

                    <!-- Step Image if available -->
                    <div v-if="getStepImage(step)" class="pt-3">
                      <Img
                        :src="getStepImage(step)!"
                        :alt="t('recipes.stepImageAlt', { index: index + 1, title: recipe.title })"
                        class="w-full max-w-[440px] !h-auto aspect-video rounded-xl object-cover shadow-sm border border-border/70"
                      />
                    </div>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <div v-if="recipe.muscleBuildingTip" id="muscleBuildingTip" class="my-12 bg-emerald-500/5 dark:bg-emerald-500/10 border-l-4 border-emerald-500 p-6 rounded-r-xl shadow-sm">
          <h2 class="text-2xl md:text-3xl font-black uppercase tracking-tighter italic text-emerald-700 dark:text-emerald-400 mt-0 flex items-center gap-2 pb-2">
            <Icon name="ph:muscle-bold" class="w-6 h-6" />
            {{ t('recipes.muscleTips') }}
          </h2>
          <p class="text-muted-foreground" v-html="formatText(recipe.muscleBuildingTip)" />
        </div>


        <h2 v-if="recipe.flavour?.length" id="flavour" class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground mt-8 mb-6">{{ t('recipes.flavourProfile') }}</h2>
        <div v-if="recipe.flavour?.length" class="mt-4 space-y-4">
          <p v-for="(flav, index) in recipe.flavour" :key="index" class="text-muted-foreground" v-html="formatText(flav)" />
        </div>

        <h2 v-if="recipe.variations?.length" id="variations" class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground mt-8 mb-6">{{ t('recipes.variations') }}</h2>
        <div v-if="recipe.variations?.length" class="mt-4 space-y-4">
          <p v-for="(variation, index) in recipe.variations" :key="index" class="text-muted-foreground" v-html="formatText(variation)" />
        </div>

        <h2 v-if="recipe.use?.length" id="use" class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground mt-8 mb-6">{{ t('recipes.howToServe') }}</h2>
        <div v-if="recipe.use?.length" class="mt-4 space-y-4">
          <p v-for="(u, index) in recipe.use" :key="index" class="text-muted-foreground" v-html="formatText(u)" />
        </div>


        <h2 v-if="recipe.whyTitle && recipe.why?.length" id="why" class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground mt-8 mb-6">{{ recipe.whyTitle }}</h2>
        <div v-if="recipe.why?.length" class="mt-4 space-y-4">
          <p v-for="(reason, index) in recipe.why" :key="index" class="text-muted-foreground" v-html="formatText(reason)" />
        </div>

        <h2 v-if="recipe.tips?.length" id="tips" class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground mt-8 mb-6">{{ recipe.tipsTitle || t('recipes.tips') }}</h2>
        <div v-if="recipe.tips?.length" class="mt-4 space-y-4">
          <p v-for="(tip, index) in recipe.tips" :key="index" class="text-muted-foreground" v-html="formatText(tip)" />
        </div>



        <h2 v-if="recipe.servingSuggestions" id="servingSuggestions" class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground mt-8 mb-6">{{ t('recipes.servingSuggestions') }}</h2>
        <p v-if="recipe.servingSuggestions" class="text-muted-foreground" v-html="formatText(recipe.servingSuggestions)" />


        <h2 v-if="recipe.storageInstructions" id="storage" class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground mt-8 mb-6">{{ t('recipes.storage', { title: recipe.title }) }}</h2>
        <p v-if="recipe.storageInstructions" class="text-muted-foreground" v-html="formatText(recipe.storageInstructions)" />

           <!-- New FAQ Section -->
        <section v-if="recipe?.faq?.length" class="mt-8">
          <h2 id="faq" class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground mt-8 mb-6">
            {{ t('recipes.faq') }}
          </h2>
          
          <!-- Nuxt UI Accordion for a clean UX -->
          <UAccordion 
            :items="accordionItems" 
            size="lg"
            variant="outline"
            class="max-w-3xl"
          />
        </section>

        <div v-if="randomizedRecipes?.length" id="youMightAlsoLike" class="mt-8 md:mt-10 border-t border-border pt-5 md:pt-10">
          <MobileScroll 
            :recipes="randomizedRecipes.slice(0, 3)" 
            :title="t('recipes.youMightLike')"
          />
        </div>

        <!-- <div v-if="recipe.dontTitle && recipe.dont" class="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <Icon name="ph:info-bold" class="h-5 w-5 text-blue-400" />
              </div>
              <div class="ml-3">
                <p class="text-sm text-blue-700">
                  <strong>{{ recipe.dontTitle}}</strong>{{ recipe.dont }}
                </p>
              </div>
            </div>
          </div> -->

        <!-- <div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg shadow-sm">
            <div class="flex items-center mb-4">
              <Icon name="ph:lightbulb-bold" class="text-green-600 w-6 h-6 mr-2" />
              <span class="text-green-800 font-bold uppercase tracking-wider text-sm">
                Chef's Insights
              </span>
            </div>
          </div> -->

        <!-- <MDC 
        :value="recipe.why" 
        class="prose prose-green max-w-none 
               prose-h2:text-xl prose-h2:mt-0 prose-h2:mb-2 prose-h2:text-green-900
               prose-p:text-green-800 prose-p:leading-relaxed
               prose-li:text-green-700" -->
        <!-- /> -->

      </div>
    </div>

    <h2 id="relatedRecipes" class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground mt-16 mb-8">{{ t('recipes.similar') }}</h2>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-main -mx-4 lg:-mx-0">
      <RecipeCard v-for="relatedRecipe in relatedRecipes" :key="relatedRecipe.slug" :recipe="relatedRecipe" />
    </div>

  </article>
  <div v-else>
    <p>{{ t('recipes.loading') }}</p>
  </div>
</template>