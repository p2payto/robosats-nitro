import { foo } from '../lib/foo.js'

export default defineEventHandler(async (event) => {
  const { somePrivateValue, public: { somePublicValue } } = useRuntimeConfig()
  return {
    message: 'Hello from robosats-nitro module!',
    foo,
    somePrivateValue,
    somePublicValue
  }
})
