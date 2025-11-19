export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id
  
    return await $fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  } catch (err) {
    console.error('Error:', err)
    return []
  }
})