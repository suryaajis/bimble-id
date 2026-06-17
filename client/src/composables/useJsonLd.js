import { onMounted, onUnmounted } from 'vue'

export function useJsonLd(schema) {
  let scriptEl = null

  onMounted(() => {
    scriptEl = document.createElement('script')
    scriptEl.type = 'application/ld+json'
    scriptEl.textContent = JSON.stringify(schema)
    scriptEl.setAttribute('data-json-ld', 'true')
    document.head.appendChild(scriptEl)
  })

  onUnmounted(() => {
    if (scriptEl && document.head.contains(scriptEl)) {
      document.head.removeChild(scriptEl)
    }
  })
}
