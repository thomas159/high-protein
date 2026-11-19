// Build-time redirects for legacy / cross-language URLs.
//
// The site is deployed to Vercel as a static build (`vercel-static` preset), so
// `server/middleware/redirects.ts` never runs in production. These rules are fed
// into Nitro `routeRules`, which the Vercel preset writes into
// `.vercel/output/config.json` as real 301 routes.
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CATEGORY_SLUGS } from './app/utils/constants'

type Lang = 'en' | 'es' | 'de'
type Group = Partial<Record<Lang, string>> & { previous?: string[] }
type RouteRules = Record<string, { redirect: { to: string, statusCode: 301 } }>

const LANGS: Lang[] = ['en', 'es', 'de']

const PREFIX = {
  recipes: { en: '/recipes', es: '/es/recetas', de: '/de/rezepte' },
  collections: { en: '/collections', es: '/es/colecciones', de: '/de/sammlungen' },
  categories: { en: '/categories', es: '/es/categorias', de: '/de/kategorien' },
} as const

// Wrong-but-seen prefixes for each language (legacy English paths under a locale,
// and translated paths without the locale prefix).
const LEGACY_PREFIXES = {
  recipes: { en: [], es: ['/es/recipes', '/recetas'], de: ['/de/recipes', '/rezepte'] },
  collections: { en: [], es: ['/es/collections', '/colecciones'], de: ['/de/collections', '/sammlungen'] },
  categories: { en: [], es: ['/es/categories', '/categorias'], de: ['/de/categories', '/kategorien'] },
} as const

function frontmatterField(src: string, field: string): string | undefined {
  const m = src.match(new RegExp(`^${field}:\\s*['"]?(.+?)['"]?\\s*$`, 'm'))
  return m?.[1]?.trim() || undefined
}

// Reads a simple YAML list (`key:` followed by `- item` lines) from frontmatter.
function frontmatterList(src: string, field: string): string[] {
  const m = src.match(new RegExp(`^${field}:\\s*\\n((?:\\s*-\\s*.+\\n?)+)`, 'm'))
  if (!m?.[1]) return []
  return m[1].split('\n').map(l => l.replace(/^\s*-\s*/, '').replace(/^['"]|['"]$/g, '').trim()).filter(Boolean)
}

function loadGroups(dir: string): Group[] {
  const groups = new Map<string, Group>()
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md')) continue
    const base = file.replace(/\.md$/, '')
    const lang: Lang = base.endsWith('.es') ? 'es' : base.endsWith('.de') ? 'de' : 'en'
    const src = readFileSync(join(dir, file), 'utf8')
    const slug = frontmatterField(src, 'slug') || base.replace(/\.(es|de)$/, '')
    const key = frontmatterField(src, 'image') || slug
    const group = groups.get(key) || {}
    group[lang] = slug
    // Old slugs kept after a rename (frontmatter `previousSlugs`) so their URLs 301
    const previous = frontmatterList(src, 'previousSlugs')
    if (previous.length) group.previous = [...(group.previous || []), ...previous]
    groups.set(key, group)
  }
  return [...groups.values()]
}

function canonical(kind: 'recipes' | 'collections', group: Group, lang: Lang): string | undefined {
  const slug = group[lang]
  if (slug) return `${PREFIX[kind][lang]}/${slug}`
  if (group.en) return `${PREFIX[kind].en}/${group.en}`
  return undefined
}

function add(rules: RouteRules, from: string, to: string | undefined) {
  if (!to || from === to || rules[from]) return
  rules[from] = { redirect: { to, statusCode: 301 } }
}

function contentRedirects(rules: RouteRules, kind: 'recipes' | 'collections', groups: Group[]) {
  for (const group of groups) {
    const { previous = [], ...current } = group
    const slugs = [...new Set([...Object.values(current), ...previous])] as string[]
    for (const lang of LANGS) {
      const target = canonical(kind, group, lang)
      const prefixes = [PREFIX[kind][lang], ...LEGACY_PREFIXES[kind][lang]]
      for (const prefix of prefixes) {
        for (const slug of slugs) add(rules, `${prefix}/${slug}`, target)
      }
    }
  }
}

function categoryRedirects(rules: RouteRules) {
  const keys = Object.keys(CATEGORY_SLUGS.en) as (keyof typeof CATEGORY_SLUGS.en)[]
  for (const lang of LANGS) {
    const prefixes = [PREFIX.categories[lang], ...LEGACY_PREFIXES.categories[lang]]
    for (const key of keys) {
      const target = `${PREFIX.categories[lang]}/${CATEGORY_SLUGS[lang][key]}`
      const slugs = new Set(LANGS.map(l => CATEGORY_SLUGS[l][key]))
      for (const prefix of prefixes) {
        for (const slug of slugs) add(rules, `${prefix}/${slug}`, target)
      }
    }
  }
}

export function buildStaticRedirects(rootDir = dirname(fileURLToPath(import.meta.url))): RouteRules {
  const rules: RouteRules = {}
  contentRedirects(rules, 'recipes', loadGroups(join(rootDir, 'content/recipes')))
  contentRedirects(rules, 'collections', loadGroups(join(rootDir, 'content/collections')))
  categoryRedirects(rules)

  const r = (to: string) => ({ redirect: { to, statusCode: 301 as const } })
  Object.assign(rules, {
    // Section indexes
    '/es/recipes': r('/es/categorias/todas-las-recetas'),
    '/recetas': r('/es/categorias/todas-las-recetas'),
    '/es/categories': r('/es/categorias/todas-las-recetas'),
    '/categorias': r('/es/categorias/todas-las-recetas'),
    '/es/collections': r('/es/colecciones'),
    '/colecciones': r('/es/colecciones'),
    '/de/recipes': r(`/de/kategorien/${CATEGORY_SLUGS.de.allrecipes}`),
    '/rezepte': r(`/de/kategorien/${CATEGORY_SLUGS.de.allrecipes}`),
    '/de/categories': r(`/de/kategorien/${CATEGORY_SLUGS.de.allrecipes}`),
    '/kategorien': r(`/de/kategorien/${CATEGORY_SLUGS.de.allrecipes}`),
    '/de/collections': r('/de/sammlungen'),
    '/sammlungen': r('/de/sammlungen'),
    // Section index stubs: these pages only meta-refresh, so give crawlers a real 301
    '/recipes': r(`/categories/${CATEGORY_SLUGS.en.allrecipes}`),
    '/es/recetas': r(`/es/categorias/${CATEGORY_SLUGS.es.allrecipes}`),
    '/de/rezepte': r(`/de/kategorien/${CATEGORY_SLUGS.de.allrecipes}`),
    '/categories': r(`/categories/${CATEGORY_SLUGS.en.allrecipes}`),
    '/es/categorias': r(`/es/categorias/${CATEGORY_SLUGS.es.allrecipes}`),
    '/de/kategorien': r(`/de/kategorien/${CATEGORY_SLUGS.de.allrecipes}`),
    // i18n localises the sitemap module's /sitemap.xml route into indexable HTML pages
    '/es/sitemap.xml': r('/sitemap_index.xml'),
    '/de/sitemap.xml': r('/sitemap_index.xml'),
    // Top-level aliases
    '/high-protein': r(`/categories/${CATEGORY_SLUGS.en.highprotein}`),
    '/vegan': r(`/categories/${CATEGORY_SLUGS.en.vegan}`),
    '/es/high-protein': r(`/es/categorias/${CATEGORY_SLUGS.es.highprotein}`),
    '/es/vegan': r(`/es/categorias/${CATEGORY_SLUGS.es.vegan}`),
    '/de/high-protein': r(`/de/kategorien/${CATEGORY_SLUGS.de.highprotein}`),
    '/de/vegan': r(`/de/kategorien/${CATEGORY_SLUGS.de.vegan}`),
  })
  return rules
}

// Vercel Build Output API routes. These go straight into `.vercel/output/config.json`
// via `nitro.vercel.config.routes`. They must NOT go into Nuxt `routeRules`: Nuxt turns
// each routeRule into a router route, i18n then prefixes those with every locale, and
// the prerender crawler explodes into junk paths like /es/de/rezepte/...
export function buildVercelRedirectRoutes() {
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const routes = Object.entries(buildStaticRedirects()).map(([from, rule]) => ({
    src: `^${escape(from)}/?$`,
    status: rule.redirect.statusCode,
    headers: { Location: rule.redirect.to },
  }))
  // Strip trailing slashes so /recipes/x/ is not served as a duplicate of /recipes/x
  // (site config uses trailingSlash: false). Runs after the specific redirects above.
  routes.push({ src: '^/(.+)/$', status: 301, headers: { Location: '/$1' } })
  return routes
}
