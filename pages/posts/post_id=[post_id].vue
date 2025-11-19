<template>
  <div>
    <p><b>User ID:</b> {{ post.userId }}</p>
    <p><b>Post ID:</b> {{ post.id }}</p>
    <div v-if="!isEdit" class="wrap">
      <p><b>Post Title:</b> {{ post.title }}</p>
      <p><b>Post Body</b> {{ post.body }}</p>
      <button @click="changeIsEdit(true)">Редактировать</button>
    </div>
    <form v-else @submit.prevent="updatePost" class="form-edit">
      <div class="wrap-input">
        <label for="post-title">Post Title</label>
        <input type="text" id="post-title" v-model="title">
      </div>
      <div class="wrap-input">
        <label for="post-body">Post Body</label>
        <input type="text" id="post-body" v-model="body">
      </div>
      <button @click="changeIsEdit(false)">Отмена</button>
      <input type="submit" value="Сохранить">
    </form>
    
  </div>
</template>

<script setup>
  const {post_id} = useRoute().params

  const isEdit = ref(false)

  const { data } = await useFetch(`/api/posts/${post_id}`)
  const post = ref(data)

  const title = ref(post.value.title)
  const body = ref(post.value.body)

  function changeIsEdit(newValue) {
    isEdit.value = newValue
  }

  async function updatePost() {
    const response = await $fetch(`https://jsonplaceholder.typicode.com/posts/${post_id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({title: title.value, body: body.value})
    })
    
    const data = await response.json()
    post.value = data
    console.log(data)

    changeIsEdit(false)
  }
</script>

<style lang="scss" scoped>

</style>