export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const userId = query.userId

  let total = 100
  if (userId) {
    total = 10
  } 

  try {
    return total
  } catch (err) {
    console.error('Error:', err)
    return 0
  }
})