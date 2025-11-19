export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const userId = query.userId

  let url = 'https://jsonplaceholder.typicode.com/posts'
  if (userId) url += `?userId=${userId}`

  try {
    const posts = await $fetch(url)
    return posts.length
  } catch (err) {
    console.error('Error:', err)
    return 0
  }
})