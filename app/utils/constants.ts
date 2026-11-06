export const RECIPE_CATEGORIES = [
  { key: 'dinner', icon: 'ph:bowl-food-duotone', image: '15-minute-cherry-tomato-and-courgette-risotto_1_lsbbrh' },
  { key: 'snacks', icon: 'ph:popcorn-duotone', image: 'air-fryer-mozarella-sticks_oiud1f' },
  { key: 'dessert', icon: 'ph:cookie-duotone', image: 'air-fryer-protein-cheesecake-bites-2_bsig6f' },
  { key: 'airfryer', icon: 'ph:wind-duotone', image: 'air-fryer-jalapeno-cheese-loaded-fries_twwfu7' },
  { key: '15minutemeals', icon: 'ph:timer-duotone', image: '5-minute-miso-peanut-butter-noodles_eo9aef' },
  { key: 'ninjacreami', icon: 'ph:ice-cream-duotone', image: 'ninja-creami-banana-vanilla-ice-cream_qmcu31' },
  { key: 'vegan', icon: 'ph:leaf-duotone', image: '15-minute-crispy-sticky-korean-tofu_vu0qlh' },
  { key: 'highprotein', icon: 'ph:barbell-duotone', image: 'udon-peanut-butter-noodles_qufch8' }
]

// Virtual categories are not stored in a recipe's `categories` array. They are derived from tags/macros.
export const HIGH_PROTEIN_MIN_GRAMS = 20

export const matchesCategory = (
  recipe: { categories?: string[] | null, tags?: string[] | null, macros?: { protein?: number | null } | null },
  key: string
): boolean => {
  if (key === 'allrecipes') return true
  const labels = [...(recipe.categories || []), ...(recipe.tags || [])].map(l => String(l).toLowerCase())
  if (key === 'vegan') return labels.includes('vegan')
  if (key === 'highprotein') return (recipe.macros?.protein || 0) >= HIGH_PROTEIN_MIN_GRAMS
  return (recipe.categories || []).map(c => String(c).toLowerCase()).includes(key)
}

export const CATEGORY_SLUGS = {
  en: {
    allrecipes: 'all-recipes',
    dinner: 'dinner',
    snacks: 'snacks',
    dessert: 'dessert',
    airfryer: 'air-fryer',
    '15minutemeals': '15-minute-meals',
    ninjacreami: 'ninja-creami',
    vegan: 'vegan',
    highprotein: 'high-protein'
  },
  es: {
    allrecipes: 'todas-las-recetas',
    dinner: 'cena',
    snacks: 'aperitivos',
    dessert: 'postre',
    airfryer: 'freidora-de-aire',
    '15minutemeals': 'comidas-de-15-minutos',
    ninjacreami: 'ninja-creami',
    vegan: 'veganas',
    highprotein: 'altas-en-proteinas'
  },
  de: {
    allrecipes: 'alle-rezepte',
    dinner: 'abendessen',
    snacks: 'snacks',
    dessert: 'nachtisch',
    airfryer: 'heissluftfritteuse',
    '15minutemeals': '15-minuten-gerichte',
    ninjacreami: 'ninja-creami',
    vegan: 'vegan',
    highprotein: 'proteinreich'
  }
} as const



