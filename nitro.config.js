export default defineNitroConfig({
  runtimeConfig: {
    somePrivateValue: process.env.NUXT_SOME_PRIVATE_VALUE,
    public: {
      somePublicValue: process.env.NUXT_SOME_PUBLIC_VALUE
    }
  },
});
