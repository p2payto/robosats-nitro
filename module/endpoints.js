export const endpoints = [
  // without initial /
  // relative path to runtime/handlers
  { method: 'GET', route: 'limits', file: 'limits.get.js' },
  { method: 'POST', route: 'offer', file: 'offer.post.js' },
  { method: 'GET', route: 'order', file: 'order.get.js' },
  { method: 'POST', route: 'robot', file: 'robot.post.js' },
]