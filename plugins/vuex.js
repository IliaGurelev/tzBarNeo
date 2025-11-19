import { defineNuxtPlugin } from "#app";  
import createStore from '@/store'

export default defineNuxtPlugin((nuxtApp) => {
  const store = createStore()
  nuxtApp.vueApp.use(store)
  nuxtApp.provide('store', store)
})