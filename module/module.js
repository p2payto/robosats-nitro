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

  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.robosatsCoordinatorUrl = nuxt.options.runtimeConfig.public.robosatsCoordinatorUrl ?? 'http://otmoonrndnrddqdlhu6b36heunmbyw3cgvadqo2oqeau3656wfv7fwad.onion'
    nuxt.options.runtimeConfig.public.torSocksUrl = nuxt.options.runtimeConfig.public.torSocksUrl ?? 'socks5h://127.0.0.1:9050'

    const resolver = createResolver(import.meta.url)

    const prefix = (options.prefix || '/api/robosats').replace(/\/+$/, '')

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
