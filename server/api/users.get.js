export default defineEventHandler(async () => {
  const users = await $fetch('https://jsonplaceholder.typicode.com/users')
  return users
})
