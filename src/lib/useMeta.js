import { useEffect } from 'react'

// Lightweight per-route meta manager for SEO.
export function useMeta({ title, description, canonical }) {
  useEffect(() => {
    if (title) document.title = title

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)

      let og = document.querySelector('meta[property="og:description"]')
      if (og) og.setAttribute('content', description)
    }

    if (title) {
      let ogt = document.querySelector('meta[property="og:title"]')
      if (ogt) ogt.setAttribute('content', title)
    }

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', canonical)
    }
  }, [title, description, canonical])
}
