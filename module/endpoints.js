export const endpoints = [
  // route è RELATIVA al prefix, senza / iniziale
  // file è RELATIVO a runtime/handlers
  { method: 'get', route: 'test', file: 'test.get.js' },

  // esempi:
  // { method: 'post', route: 'offer', file: 'robosats/offer.post.js' },
]