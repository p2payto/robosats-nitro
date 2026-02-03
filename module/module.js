import { defineNuxtModule, addServerHandler, createResolver } from '@nuxt/kit'
import { endpoints } from './endpoints.js'

export default defineNuxtModule({
  meta: {
    name: 'robosats-nitro',
    configKey: 'robosatsNitro'
  },

  defaults: {
    prefix: '/api/robosats'
  },

  setup(options) {
    nuxt.options.runtimeConfig.public.somePublicValue = nuxt.options.runtimeConfig.public.somePublicValue ?? 'default public value'

    const resolver = createResolver(import.meta.url)

    // normalizza prefix
    const prefix = (options.prefix || '/api/robosats').replace(/\/+$/, '')

    // de-dupe + safety
    const seen = new Set()

    for (const ep of endpoints) {
      if (!ep?.method || !ep?.route || !ep?.file) {
        throw new Error(`[robosats-nitro] Invalid endpoint entry: ${JSON.stringify(ep)}`)
      }

      const method = String(ep.method).toLowerCase()
      const routeRel = String(ep.route).replace(/^\/+/, '').replace(/\/+$/, '')
      const route = `${prefix}/${routeRel}`

      const key = `${method} ${route}`
      if (seen.has(key)) {
        throw new Error(`[robosats-nitro] Duplicate endpoint: ${key}`)
      }
      seen.add(key)

      addServerHandler({
        method,
        route,
        handler: resolver.resolve(`../runtime/handlers/${ep.file}`)
      })
    }
  }
})
