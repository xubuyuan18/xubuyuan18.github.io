'use strict'

// Override the cover URL to use timestamp parameter for t.alcy.cc API
// The API supports ?t=timestamp to return different random images per request
hexo.extend.filter.register('before_post_render', function(data) {
  let coverVal = data.cover
  if (coverVal && coverVal.includes('t.alcy.cc')) {
    try {
      let urlParts = new URL(coverVal)
      // Remove _r_ param added by theme, use t=timestamp instead
      urlParts.searchParams.delete('_r_')
      urlParts.searchParams.set('t', Date.now() + Math.random().toString(36).substr(2, 6))
      data.cover = urlParts.toString()
    } catch (e) {
      // fallback
    }
  }
  return data
})
