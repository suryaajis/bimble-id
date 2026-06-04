const YT_REGEX = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/

export function toEmbedUrl(url) {
  if (!url) return null
  if (url.includes('youtube.com/embed/')) return url
  const match = url.match(YT_REGEX)
  if (match) return `https://www.youtube.com/embed/${match[1]}`
  return url
}

export function isYoutubeUrl(url) {
  return Boolean(url && (url.includes('youtube.com') || url.includes('youtu.be')))
}

export function getThumbnail(url) {
  const match = url?.match(YT_REGEX)
  if (match) return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`
  return null
}

/** Returns the embed-ready src for a Video record (prefers youtubeUrl over videoUrl). */
export function videoSrc(video) {
  if (!video) return null
  if (video.youtubeUrl) return video.youtubeUrl  // already stored as embed URL
  if (video.videoUrl) return video.videoUrl
  return null
}
