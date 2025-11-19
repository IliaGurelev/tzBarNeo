export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const body = await readBody(event)

  return await $fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PATCH',
    body
  })
})