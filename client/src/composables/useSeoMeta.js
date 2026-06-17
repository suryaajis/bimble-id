import { onMounted, onUnmounted, watch, isRef } from 'vue'

const setMetaTag = (attr, attrValue, content) => {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${attrValue}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, attrValue)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const removeMetaTag = (attr, attrValue) => {
  const el = document.querySelector(`meta[${attr}="${attrValue}"]`)
  if (el) el.remove()
}

export function useSeoMeta(options) {
  const apply = () => {
    const opts = isRef(options) ? options.value : (typeof options === 'function' ? options() : options)
    if (!opts) return

    const siteName = 'Bimble.id'
    const defaultDesc = 'Platform e-learning Indonesia — belajar pemrograman, data science, dan teknologi bersama ribuan pelajar.'

    const title = opts.title ? `${opts.title} | ${siteName}` : `${siteName} — Platform E-Learning Indonesia`
    const description = opts.description || defaultDesc
    const image = opts.image || `${window.location.origin}/favicon.svg`
    const url = opts.url || window.location.href

    document.title = title

    // Standard meta
    setMetaTag('name', 'description', description)
    setMetaTag('name', 'keywords', opts.keywords || '')

    // Open Graph
    setMetaTag('property', 'og:title', title)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:image', image)
    setMetaTag('property', 'og:url', url)
    setMetaTag('property', 'og:type', opts.type || 'website')
    setMetaTag('property', 'og:site_name', siteName)

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', title)
    setMetaTag('name', 'twitter:description', description)
    setMetaTag('name', 'twitter:image', image)
  }

  if (isRef(options) || typeof options === 'function') {
    watch(isRef(options) ? options : options, apply, { immediate: false })
  }

  onMounted(apply)

  onUnmounted(() => {
    // Reset to default on unmount
    document.title = 'Bimble.id — Platform E-Learning Indonesia'
  })
}
