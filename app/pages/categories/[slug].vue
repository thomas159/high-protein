<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSetI18nParams } from "#imports";
import Button from "@/components/common/Button.vue";
import { RECIPE_CATEGORIES } from "@/utils/constants";
import enLocales from "../../../i18n/locales/en.json";
import esLocales from "../../../i18n/locales/es.json";
import deLocales from "../../../i18n/locales/de.json";

const route = useRoute();
const { t, te, locale } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const setI18nParams = useSetI18nParams();

// Map raw or unplugin-vue-i18n compiled AST objects back to a clean string
const getStaticValue = (val: any): string => {
  if (typeof val === "string") return val;
  if (val && typeof val === "object") {
    if ("static" in val && typeof val.static === "string") return val.static;
    if ("s" in val && typeof val.s === "string") return val.s;
    if (val.b && typeof val.b === "object" && "s" in val.b && typeof val.b.s === "string") return val.b.s;
    if (val.body && typeof val.body === "object" && "static" in val.body && typeof val.body.static === "string")
      return val.body.static;
    if (val.loc && typeof val.loc === "object" && "source" in val.loc && typeof val.loc.source === "string")
      return val.loc.source;
  }
  return typeof val === "object" ? "" : String(val || "");
};

const formatTag = (tag: any) => {
  const cleanTag = getStaticValue(tag);
  if (!cleanTag) return "";
  if (te("tags." + cleanTag)) {
    return t("tags." + cleanTag);
  }
  return cleanTag.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const categorySlug = computed(() => route.params.slug as string);

// Explicitly resolve the static slugs so we can pair English <-> Spanish <-> German
const enSlugs = enLocales.categorySlugs as Record<string, string>;
const esSlugs = esLocales.categorySlugs as Record<string, string>;
const deSlugs = deLocales.categorySlugs as Record<string, string>;

const resolveKey = computed(() => {
  const currentSlug = categorySlug.value;
  const findKey = (slugs: Record<string, any>) =>
    Object.keys(slugs).find((k) => getStaticValue(slugs[k]) === currentSlug);

  if (locale.value === "es") {
    return findKey(esSlugs) || findKey(enSlugs) || findKey(deSlugs) || currentSlug;
  } else if (locale.value === "de") {
    return findKey(deSlugs) || findKey(enSlugs) || findKey(esSlugs) || currentSlug;
  } else {
    return findKey(enSlugs) || findKey(esSlugs) || findKey(deSlugs) || currentSlug;
  }
});

// Canonical redirect: If a user accesses an English or alternative slug under another locale (e.g. /es/categorias/all-recipes or /es/categorias/dinner),
// 301 redirect to the current locale's canonical translated slug (e.g. /es/categorias/todas-las-recetas or /es/categorias/cena).
const canonicalSlug = computed(() => {
  const key = resolveKey.value;
  if (!key) return null;
  if (locale.value === "es") return getStaticValue(esSlugs[key]);
  if (locale.value === "de") return getStaticValue(deSlugs[key]);
  return getStaticValue(enSlugs[key]);
});

if (canonicalSlug.value && canonicalSlug.value !== categorySlug.value) {
  await navigateTo(localePath(`/categories/${canonicalSlug.value}`), { redirectCode: 301 });
}

const categoryKey = resolveKey;

// 1. Tell the Nuxt i18n router what the counterparts are for this dynamically generated page
// Now the language switch button will link to /es/categorias/cena when on /categories/dinner
watch(
  [resolveKey, locale],
  () => {
    setI18nParams({
      en: {
        slug: getStaticValue(enSlugs[resolveKey.value]) || resolveKey.value,
      },
      es: {
        slug: getStaticValue(esSlugs[resolveKey.value]) || resolveKey.value,
      },
      de: {
        slug: getStaticValue(deSlugs[resolveKey.value]) || resolveKey.value,
      },
    });
  },
  { immediate: true },
);


const getCategoryName = (key: string): string => {
  const staticKey = getStaticValue(key);
  if (!staticKey) return "";
  if (te("categories." + staticKey)) {
    return t("categories." + staticKey);
  }
  let raw: any = "";
  if (locale.value === "es") {
    raw = (esLocales.categories as Record<string, any>)?.[staticKey];
  } else if (locale.value === "de") {
    raw = (deLocales.categories as Record<string, any>)?.[staticKey];
  } else {
    raw = (enLocales.categories as Record<string, any>)?.[staticKey];
  }
  const resolved = getStaticValue(raw);
  if (resolved) return resolved;
  return staticKey.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const categoryName = computed(() => getCategoryName(categoryKey.value));

const titleText = computed(() => {
  return resolveKey.value === "allrecipes"
    ? t("categoryPage.allRecipesTitle")
    : t("categoryPage.categoryTitle", { category: categoryName.value });
});

const descText = computed(() => {
  return resolveKey.value === "allrecipes"
    ? t("categoryPage.allRecipesDesc")
    : t("categoryPage.categoryDesc", { category: categoryName.value });
});

const ogImg = computed(() => {
  const cat = RECIPE_CATEGORIES.find((c) => c.key === resolveKey.value);
  if (cat?.image) {
    return cat.image.startsWith("http")
      ? cat.image
      : `https://res.cloudinary.com/mealse-co-uk/image/upload/f_auto,q_auto/${cat.image}`;
  }
  return "https://www.hotrecipes.co.uk/cover.png";
});

useSeoMeta({
  title: () => titleText.value,
  description: () => descText.value,
  ogTitle: () => titleText.value,
  ogDescription: () => descText.value,
  ogUrl: `https://www.hotrecipes.co.uk${route.path}`,
  ogImage: ogImg,
  twitterTitle: () => titleText.value,
  twitterDescription: () => descText.value,
  twitterImage: ogImg,
  twitterCard: "summary_large_image",
});

const toAbsoluteUrl = (pathStr: string) => `https://www.hotrecipes.co.uk${pathStr.startsWith('/') ? pathStr : `/${pathStr}`}`

useSchemaOrg([
  defineWebPage({
    name: () => titleText.value,
    description: () => descText.value,
  }),
  defineBreadcrumb({
    itemListElement: computed(() => [
      { name: t('nav.home'), item: toAbsoluteUrl(localePath('/')) },
      { name: categoryName.value, item: toAbsoluteUrl(route.path) }
    ])
  })
]);

// 1. Fetch recipes for this specific category
const {
  data: recipes,
  status,
} = await useAsyncData(
  () => `category-${resolveKey.value}-${locale.value}`,
  async () => {
    let query = queryCollection("recipes");
    
    if (locale.value === "en") {
      query = query.where("path", "NOT LIKE", "%.es").where("path", "NOT LIKE", "%.de");
    } else {
      query = query.where("path", "LIKE", `%.${locale.value}`);
    }

    if (resolveKey.value !== "allrecipes") {
      // Use a more relaxed LIKE query to avoid JSON quote issues
      // instead of %"postre"% we use %postre% which is safer for various SQLite JSON formats
      query = query.where("categories", "LIKE", `%${resolveKey.value}%`);
    }

    const result = await query.all();
    return result;
  },
  {
    watch: [() => route.params.slug, locale],
  },
);

// 2. Extract unique tags from the fetched recipes
const availableTags = computed(() => {
  if (!recipes.value) return [];

  const tags = new Set<string>();
  recipes.value.forEach((recipe) => {
    if (recipe.tags && Array.isArray(recipe.tags)) {
      recipe.tags.forEach((rawTag: any) => {
        if (!rawTag) return;

        const tagStr = getStaticValue(rawTag).trim().toLowerCase();
        if (tagStr && tagStr !== "[object object]" && tagStr !== "vegetarian") {
          tags.add(tagStr);
        }
      });
    }
  });
  return Array.from(tags).sort();
});

// 3. Track selected tags (Initialize from URL query parameters!)
const getTagsFromQuery = () => {
  const tags = route.query.tags;
  if (!tags) return [];
  return typeof tags === "string" ? tags.split(",") : (tags as string[]);
};
const selectedTags = ref<string[]>(getTagsFromQuery());

// 4. Toggle tag selection and update the URL silently
const updateQuery = () => {
  router.replace({
    query: {
      ...route.query,
      tags: selectedTags.value.length
        ? selectedTags.value.join(",")
        : undefined,
    },
  });
};

const toggleTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
  updateQuery();
};

const clearTags = () => {
  selectedTags.value = [];
  updateQuery();
};
const clearFilters = clearTags;

// Sync tags if query parameter changes externally
watch(
  () => route.query.tags,
  () => {
    selectedTags.value = getTagsFromQuery();
  },
);

// 5. Filter recipes based on selected tags
const filteredRecipes = computed(() => {
  if (!recipes.value) return [];
  if (selectedTags.value.length === 0) return recipes.value;

  return recipes.value.filter((recipe) => {
    if (!recipe.tags || !Array.isArray(recipe.tags)) return false;

    const lowerRecipeTags = recipe.tags
      .map((rawTag: any) => getStaticValue(rawTag).trim().toLowerCase())
      .filter(Boolean);

    return selectedTags.value.every((tag) => lowerRecipeTags.includes(tag));
  });
});
</script>

<template>
  <div class="-mx-5 px-[1px] md:mx-0 md:px-0 space-y-6">
    <!-- Category Header -->
    <div
      class="bg-gradient-to-br from-card/80 to-card/40 border border-border/60 rounded-3xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden"
    >
      <div
        class="absolute -right-10 -bottom-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-3">
        <NuxtLink :to="localePath('/')" class="hover:text-foreground transition-colors flex items-center gap-1">
          <UIcon name="i-lucide-home" class="w-3.5 h-3.5" />
          {{ t('nav.home') }}
        </NuxtLink>
        <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5 text-muted-foreground/50" />
        <span class="text-primary font-bold uppercase tracking-wider text-[11px]">{{ categoryName }}</span>
      </nav>

      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1
            class="text-3xl md:text-5xl font-black text-foreground tracking-tight capitalize"
          >
            {{ categoryName }}
          </h1>
          <p
            v-if="recipes"
            class="text-xs font-semibold text-muted-foreground mt-1"
          >
            {{ recipes.length }}
            {{ recipes.length === 1 ? "recipe" : "recipes" }} available
          </p>
        </div>
      </div>

      <p
        v-if="descText"
        class="text-sm md:text-base text-muted-foreground/90 max-w-2xl mt-4 leading-relaxed font-medium"
      >
        {{ descText }}
      </p>

      <!-- Horizontal Tag Filters -->
      <div
        v-if="availableTags.length > 0"
        class="mt-6 flex items-center gap-[1px] md:gap-2 overflow-x-auto pb-1 no-scrollbar -mx-[1px] px-[1px] md:mx-0 md:px-0 mask-fade-edges"
      >
        <button
          v-for="tag in availableTags"
          :key="tag"
          :class="[
            selectedTags.includes(tag)
              ? 'bg-emerald-500 text-white border-emerald-400'
              : 'bg-muted/50 text-muted-foreground border-border hover:border-foreground/20',
            'px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all active:scale-95 cursor-pointer capitalize',
          ]"
          @click="toggleTag(tag)"
        >
          {{ formatTag(tag) }}
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="status === 'pending'"
      class="grid grid-cols-2 lg:grid-cols-4 gap-[1px] md:gap-6"
    >
      <SkeletonCard v-for="i in 8" :key="i" />
    </div>

    <!-- Recipe Grid -->
    <div
      v-else-if="filteredRecipes.length > 0"
      class="grid grid-cols-2 lg:grid-cols-4 gap-[1px] md:gap-6"
    >
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.path"
        :recipe="recipe"
        class="h-full"
      />
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="text-center py-20 bg-muted/40 rounded-3xl border border-border shadow-inner"
    >
      <div class="text-5xl mb-6">🥣</div>
      <h3
        class="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground mb-2"
      >
        {{ t("categoryPage.empty") }}
      </h3>
      <p
        class="text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed mb-8"
      >
        We couldn't find any recipes for "{{ categoryName }}" that match your
        fitness goals right now.
      </p>
      <Button
        v-if="selectedTags.length > 0"
        variant="outline"
        class="rounded-full px-8"
        @click="clearFilters"
        >Clear All Filters</Button
      >
      <NuxtLink
        v-else
        :to="localePath('/')"
        class="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 font-bold text-sm transition-colors"
      >
        <span>&larr;</span> Back to Home
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* Vue TransitionGroup Animations */
.list-move,
.list-enter-active,
.list-leave-active {
  /* Target specific properties to prevent the browser from blurring text */
  transition:
    transform 0.1s ease,
    opacity 0.1s ease !important;
  backface-visibility: hidden;
  will-change: transform, opacity;
}

.list-enter-from,
.list-leave-to {
  opacity: 0 !important;
  transform: translateY(15px) scale(0.98) !important;
}

/* Ensure elements are taken out of flow when leaving so others slide smoothly */
.list-leave-active {
  position: absolute;
  z-index: -1;
}
</style>
