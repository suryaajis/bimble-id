const YT_REGEX = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/

/**
 * Converts any YouTube URL format to the embed URL required by <iframe>.
 * Returns the original string unchanged if it is not a recognisable YouTube URL.
 */
function toEmbedUrl(url) {
  if (!url) return null
  if (url.includes('youtube.com/embed/')) return url
  const match = url.match(YT_REGEX)
  if (match) return `https://www.youtube.com/embed/${match[1]}`
  return url
}

function isYoutubeUrl(url) {
  return Boolean(url && (url.includes('youtube.com') || url.includes('youtu.be')))
}

module.exports = { toEmbedUrl, isYoutubeUrl }
