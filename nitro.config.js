export default defineNitroConfig({
  runtimeConfig: {
    public: {
      robosatsCoordinatorUrl: process.env.NUXT_ROBOSATS_COORDINATOR_URL,
      torSocksUrl: process.env.NUXT_TOR_SOCKS_URL
    }
  },
});
