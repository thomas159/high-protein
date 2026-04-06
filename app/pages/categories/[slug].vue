<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from '@/components/common/Button.vue'

const route = useRoute()
const router = useRouter()
const categorySlug = route.params.slug as string
const showFilters = ref(false)

// 1. Fetch recipes for this specific category
const { data: recipes } = await useAsyncData(`category-${categorySlug}`, () => {
  if (categorySlug === 'all-recipes') {
    return queryCollection('recipes').all()
  }
  return queryCollection('recipes')
    .where('categories', 'LIKE', `%${categorySlug}%`)
    .all()
})

// 2. Extract unique tags from the fetched recipes
const availableTags = computed(() => {
  if (!recipes.value) return []
  
  const tags = new Set<string>()
  recipes.value.forEach(recipe => {
    if (recipe.tags && Array.isArray(recipe.tags)) {
      recipe.tags.forEach((tag: string) => tags.add(tag.toLowerCase()))
    }
  })
  return Array.from(tags).sort()
})

// 3. Track selected tags (Initialize from URL query parameters!)
const getTagsFromQuery = () => {
  const tags = route.query.tags
  if (!tags) return []
  return typeof tags === 'string' ? tags.split(',') : (tags as string[])
}
const selectedTags = ref<string[]>(getTagsFromQuery())

// 4. Toggle tag selection and update the URL silently
const updateUrl = () => {
  router.replace({
    query: {
      ...route.query,
      tags: selectedTags.value.length ? selectedTags.value.join(',') : undefined
    }
  })
}

const toggleTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
  } else {
    selectedTags.value.push(tag)
  }
  updateUrl()
}

const clearFilters = () => {
  selectedTags.value = []
  updateUrl()
}

// Listen for browser back/forward buttons to sync URL state back to the UI
watch(() => route.query.tags, () => {
  selectedTags.value = getTagsFromQuery()
})

// 5. Filter recipes based on selected tags
const filteredRecipes = computed(() => {
  if (!recipes.value) return []
  if (selectedTags.value.length === 0) return recipes.value

  return recipes.value.filter(recipe => {
    if (!recipe.tags) return false
    
    const lowerRecipeTags = recipe.tags.map((t: string) => t.toLowerCase())
    // AND logic: recipe must have every selected tag
    return selectedTags.value.every(tag => lowerRecipeTags.includes(tag))
  })
})
</script>

<template>
  <div class="container mx-auto">
    <div class="text-center">
    <h1 class="text-3xl font-bold mb-4 capitalize">
      {{ categorySlug === 'all-recipes' ? 'All Recipes' : `${categorySlug.replace(/-/g, ' ')} Recipes` }}
    </h1>
    <p class="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
      {{ categorySlug === 'all-recipes' 
        ? 'Browse our complete collection of delicious, macro-friendly, and high-protein recipes designed to help you hit your fitness goals without sacrificing flavor.' 
        : `Explore our delicious collection of ${categorySlug.replace(/-/g, ' ')} recipes. Perfect for hitting your protein goals while enjoying satisfying, guilt-free meals.` 
      }}
    </p>
    </div>

    <!-- Filters section -->
    <div v-if="availableTags.length > 0" class="mb-8 text-left">
      <!-- Mobile Filter Toggle -->
      <div class="md:hidden mb-4">
        <Button 
          color="white" 
          class="w-full justify-center"
          @click="showFilters = !showFilters"
        >
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
          </svg>
          {{ showFilters ? 'Hide Filters' : 'Filter Recipes' }}
          <span v-if="selectedTags.length > 0" class="ml-1 bg-emerald-500 border border-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
            {{ selectedTags.length }}
          </span>
        </Button>
      </div>

      <h3 class="text-lg font-semibold mb-3 hidden md:block text-left">Filter by Tags:</h3>
      <div :class="[showFilters ? 'flex' : 'hidden', 'md:flex flex-wrap gap-2']">
        <Button
          v-for="tag in availableTags"
          :key="tag"
          :color="selectedTags.includes(tag) ? 'green' : 'white'"
          size="small"
          @click="toggleTag(tag)">
          {{ tag }}
        </Button>
        
        <Button 
          v-if="selectedTags.length > 0"
          color="clear"
          size="small"
          @click="clearFilters"
        >
          Clear Filters
        </Button>
      </div>
    </div>

    <!-- Recipe Grid -->
    <TransitionGroup 
      v-if="filteredRecipes.length > 0" 
      name="list" 
      tag="div" 
      class="grid grid-cols-2 lg:grid-cols-4 gap-main -mx-4 lg:-mx-0"
    >
      <RecipeCard
        v-for="recipe in filteredRecipes" 
        :key="recipe.path" 
        :recipe="recipe"
      />
    </TransitionGroup>
    
    <!-- Empty State -->
    <div v-else class="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
      <p class="text-lg mb-2">No recipes found matching the selected tags.</p>
      <Button color="clear" size="small" @click="clearFilters">
        Clear filters
      </Button>
    </div>
  </div>
</template>

<style scoped>
/* Vue TransitionGroup Animations */
.list-move,
.list-enter-active,
.list-leave-active {
  /* Target specific properties to prevent the browser from blurring text */
  transition: transform 0.1s ease, opacity 0.1s ease !important;
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