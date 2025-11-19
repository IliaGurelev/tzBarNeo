export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)

    const limit = query.limit ?? 20
    const start = query.start ?? 0
    const userId = query.userId

    let url = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_start=${start}`
    if (userId) url += `&userId=${userId}`

    return await $fetch(url)
  }
  catch (err) {
    console.error('Error:', err)
    return []
  }
})