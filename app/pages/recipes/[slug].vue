<script setup lang="ts">
const { siteName, siteDescription } = useAppConfig()
const route = useRoute()

const { data: recipe } = await useAsyncData(route.path, () => {
  return queryCollection('recipes').path(route.path).first()
})

// Helper to format minutes into ISO8601 (Schema requirement)
const formatIso = (mins: number) => `PT${mins}M`


// Now integrate with SEO
// 2. SEO & Schema (Server-only injection)
if (import.meta.server) {
  useSeoMeta({
    title: recipe.value?.title,
    ogTitle: recipe.value?.title,
    description: recipe.value?.description,
    ogDescription: recipe.value?.description,
    ogImage: recipe.value?.image,
  })

 type RecipeDiet = "LowCalorieDiet" | "VeganDiet" | "VegetarianDiet";

// 2. Apply that type to the array, and use the shorthand strings
const dietArray: RecipeDiet[] = ["LowCalorieDiet"];

if (recipe.value?.categories?.includes('vegan')) {
  dietArray.push("VeganDiet");
} else if (recipe.value?.categories?.includes('vegetarian')) {
  dietArray.push("VegetarianDiet");
}

  useSchemaOrg([
    defineRecipe({
      name: recipe.value?.title,
      description: recipe.value?.meta?.seoMetaDescription || recipe.value?.description,
      image: [`https://res.cloudinary.com/mealse-co-uk/image/upload/f_auto,q_auto/${recipe.value?.image}`], // Must be absolute URL
      author: {
        name: 'Hot Recipes'
      },
      // Time mapping
      prepTime: formatIso(recipe.value?.prepTimeMins || 0),
      cookTime: formatIso(recipe.value?.cookTimeMins || 0),
      totalTime: formatIso((recipe.value?.prepTimeMins || 0) + (recipe.value?.cookTimeMins || 0)),

      // Yield and Category
      recipeYield: `${recipe.value?.servings} serving(s)`,
      recipeCategory: recipe.value?.categories?.[0] || 'Main Course',
      recipeCuisine: recipe.value?.cuisine || '',

      // recipeCuisine: 'Korean',

      // Keywords and Diet
      keywords: recipe.value?.keywords?.length ? recipe.value.keywords : (recipe.value?.flavor_profile ? recipe.value.flavor_profile.split(', ') : []),
      suitableForDiet: dietArray,

      // Nutrition mapping (Using your nested macros)
      nutrition: {
        calories: `${recipe.value?.macros?.calories} calories`,
        proteinContent: `${recipe.value?.macros?.protein}g`,
        fatContent: `${recipe.value?.macros?.fat}g`,
        carbohydrateContent: `${recipe.value?.macros?.carbs}g`,
      },

      // Ingredients mapping
      recipeIngredient: recipe.value?.ingredients.map(i => {
        const amount = i.amount ? `${i.amount}${i.unit || ''} ` : ''
        const type = i.type ? ` (${i.type})` : ''
        return `${amount}${i.item}${type}`.trim()
      }),
      // Directions mapping
      recipeInstructions: recipe.value?.steps?.map(step => ({
        "@type": "HowToStep",
        "text": step
      })),

    })
  ])
}

const { data: relatedRecipes } = await useAsyncData(`${route.path}-related`, async () => {
  // Guard: if no recipe found, return empty array
  if (!recipe.value?.categories) return []

  // Get the first category from the current recipe's array
  const primaryCategory = recipe.value.categories[0]

  return queryCollection('recipes')
    .where('categories', 'LIKE', `%${primaryCategory}%`)
    .where('slug', '<>', recipe.value.slug) // Exclude current recipe
    .limit(4) // Only get a few
    .all()
}, {
  watch: [recipe], // Re-run if the main recipe changes
  default: () => []
})

const formatText = (text: string) => {
  if (!text) return ''

  // Regex: ^ matches start of string, [\w\s]+ matches words/spaces, : matches colon
  // The 'gm' flags mean Global and Multiline (checks every new line)
  return text.replace(/^([^:\n]+:)/gm, '<strong class="text-green-600 dark:text-green-400">$1</strong>')
}

useHead({
  titleTemplate: (title) => title ? `${title} | ${siteName}` : siteName,
  meta: [{ name: 'description', content: siteDescription }]
})
</script>

<template>
  <main v-if="recipe">

    <RecipesHero :recipe="recipe" />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8 md:mt-12">

      <RecipesIngredients class="hidden lg:block" :recipe="recipe" />

      <div id="#recipe" class="lg:col-span-8 lg:pl-6 relative">
        <!-- <div class="absolute top-0 right-0 flex gap-2">
            <button class="p-2 text-muted-foreground hover:text-green-600 dark:hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors" title="Share Recipe">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
            </button>
          </div> -->
        <div v-if="recipe.blurb?.length" class="mt-4 space-y-4">
          <p v-for="(blurb, index) in recipe.blurb" :key="index" class="text-muted-foreground" v-html="formatText(blurb)" />
        </div>

        <h2 v-if="recipe.works?.length" id="works" class="mt-12">Why this recipe works</h2>
        <div v-if="recipe.works?.length" class="mt-4 space-y-4">
          <p v-for="(work, index) in recipe.works" :key="index" class="text-muted-foreground" v-html="formatText(work)" />
        </div>

        <h2 v-if="recipe.flavour?.length" id="flavour" class="mt-12">Flavour profile</h2>
        <div v-if="recipe.flavour?.length" class="mt-4 space-y-4">
          <p v-for="(flav, index) in recipe.flavour" :key="index" class="text-muted-foreground" v-html="formatText(flav)" />
        </div>

        <h2 v-if="recipe.variations?.length" id="flavour" class="mt-12">Variations and combinations of ingredients</h2>
        <div v-if="recipe.variations?.length" class="mt-4 space-y-4">
          <p v-for="(variation, index) in recipe.variations" :key="index" class="text-muted-foreground" v-html="formatText(variation)" />
        </div>

        <h2 v-if="recipe.use?.length" id="use" class="mt-12">How to serve</h2>
        <div v-if="recipe.use?.length" class="mt-4 space-y-4">
          <p v-for="(u, index) in recipe.use" :key="index" class="text-muted-foreground" v-html="formatText(u)" />
        </div>

        <h2 v-if="recipe.whyTitle && recipe.why?.length" id="why" class="mt-12">{{ recipe.whyTitle }}</h2>
        <div v-if="recipe.why?.length" class="mt-4 space-y-4">
          <p v-for="(reason, index) in recipe.why" :key="index" class="text-muted-foreground" v-html="formatText(reason)" />
        </div>

        <h2 v-if="recipe.tips?.length" id="tips" class="mt-12">{{ recipe.tipsTitle || 'Tips' }}</h2>
        <div v-if="recipe.tips?.length" class="mt-4 space-y-4">
          <p v-for="(tip, index) in recipe.tips" :key="index" class="text-muted-foreground" v-html="formatText(tip)" />
        </div>

        <h2 v-if="recipe.muscleBuildingTip" id="#muscleBuildingTip" class="mt-12">Muscle building tips</h2>
        <p class=" text-muted-foreground mb-12" v-html="formatText(recipe.muscleBuildingTip)" />

        <h2 v-if="recipe.servingSuggestions" id="why" class="mt-12">Serving Suggestions and Pairings</h2>
        <p class=" text-muted-foreground" v-html="formatText(recipe.servingSuggestions)" />


        <div class="lg:hidden mt-12">
          <RecipesIngredients :recipe="recipe" />
        </div>

        <h2 id="howToMake" class="scroll-mt-24 mt-12">How to make {{ recipe.title }}</h2>
        <div class="markdown-recipe-body mt-6">
          <ol>
            <li v-for="(step, index) in recipe.steps" :key="index">
              <div>
                <p>{{ step }}</p>
              </div>
            </li>
          </ol>
        </div>

        <h2 v-if="recipe.storageInstructions" id="storage" class="mt-12 ">Storage and Freezing</h2>
        <p class=" text-muted-foreground" v-html="formatText(recipe.storageInstructions)" />

       

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

    <h2 id="relatedRecipes" class="mt-8">Related Recipes</h2>
    <div class="grid grid-cols-2 gap-main -mx-4 lg:-mx-0">
      <RecipeCard v-for="relatedRecipe in relatedRecipes" :key="relatedRecipe.slug" :recipe="relatedRecipe" />
    </div>
  </main>
  <main v-else>
    <p>Loading Recipe...</p>
  </main>
</template>

<style scoped>
/* 1. Style the Markdown ## Method (H2) */
.markdown-recipe-body :deep(h2) {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  color: var(--color-foreground);
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
}

/* 2. Reset the CSS counter for the ordered list */
.markdown-recipe-body :deep(ol) {
  padding-left: 0;
  list-style: none;
  counter-reset: recipe-step;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  /* Space between each numbered step */
}

/* 3. Style the main list item container */
.markdown-recipe-body :deep(ol > li) {
  display: flex;
  flex-direction: row;
  /* Number and Content stay side-by-side */
  gap: 1.5rem;
  color: var(--color-foreground);
  opacity: 0.9;
  line-height: 1.7;
  font-size: 1.125rem;
  counter-increment: recipe-step;
  align-items: flex-start;
}

/* 4. The Content Wrapper Fix */
/* This forces all paragraphs and elements inside the li to stack vertically */
.markdown-recipe-body :deep(ol > li > div),
.markdown-recipe-body :deep(ol > li > p),
.markdown-recipe-body :deep(ol > li > span) {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* Space between paragraphs within a single step */
}

/* 5. Custom Numbered Circle */
.markdown-recipe-body :deep(ol > li::before) {
  content: counter(recipe-step);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  background-color: var(--color-secondary);
  color: var(--color-foreground);
  font-weight: 700;
  font-size: 0.875rem;
  border: 1px solid var(--color-border);
  transition: all 0.2s ease-in-out;
  margin-top: 0.125rem;
}

/* 6. Sub-list (Unordered) Reset */
/* This ensures that bullets inside a step don't get the big green circles */
.markdown-recipe-body :deep(li ul) {
  list-style: disc;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.markdown-recipe-body :deep(li ul li) {
  display: list-item;
  /* Reset to standard bullet behavior */
  counter-increment: none;
  /* Stop the numbers from counting here */
  font-size: 1rem;
}

.markdown-recipe-body :deep(li ul li::before) {
  content: none;
  /* Hide the custom circle number for sub-items */
}

/* 7. Hover states and Accents */
.markdown-recipe-body :deep(ol > li:hover::before) {
  background-color: rgba(66, 185, 131, 0.1);
  color: #10b981;
  /* Tailwind green-500 equivalent */
  border-color: rgba(66, 185, 131, 0.3);
}

.markdown-recipe-body :deep(strong) {
  font-weight: 700;
  color: var(--color-foreground);
}

/* 8. Fix for ContentRenderer wrapping everything in a single paragraph */
.markdown-recipe-body :deep(li p) {
  margin: 0;
}
</style>