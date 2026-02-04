export const endpoints = [
  // without initial /
  // relative path to runtime/handlers
  { method: 'get', route: 'limits', file: 'limits.get.js' },
  { method: 'post', route: 'offer', file: 'offer.post.js' },
  { method: 'get', route: 'order', file: 'order.get.js' },
  { method: 'post', route: 'robot', file: 'robot.post.js' },
]