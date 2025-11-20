<template>
  <Loader v-if="isLoading" class="loading" />
  <main class="main" v-else="">
    <p class="info"><b>User ID:</b> {{ post.userId }}</p>
    <p class="info"><b>Post ID:</b> {{ post.id }}</p>
    <div v-if="!isEdit" class="wrap">
      <p class="info"><b>Post Title:</b> {{ post.title }}</p>
      <p class="info"><b>Post Body</b> {{ post.body }}</p>
      <button @click="changeIsEdit(true)" class="btn">Редактировать</button>
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
      <div class="btn-wrap">
        <button @click="changeIsEdit(false)" class="btn">Отмена</button>
        <input type="submit" value="Сохранить" class="btn">
      </div>
    </form>
    
  </main>
</template>

<script setup>
  const {post_id} = useRoute().params
  
  const { data, pending: isLoading } = await useFetch(`/api/posts/${post_id}`)
  const post = ref(data)
  const title = ref(post.value.title)
  const body = ref(post.value.body)

  const isEdit = ref(false)

  function changeIsEdit(newValue) {
    isEdit.value = newValue
  }

  async function updatePost() {
    const data = await $fetch(`/api/posts/${post_id}`, {
      method: 'PATCH',
      body: {
        title: title.value,
        body: body.value
      }
    })
    
    post.value = data

    changeIsEdit(false)
  }
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  min-height: 100vh;
  font-size: 24px;
}

.info {
  padding: 12px;
  border-bottom: 1px solid #d3d3d3;
}

.wrap-input {
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 12px;

  label {
    font-weight: bold;
  }

  input {
    border: 1px solid #2aa9fd;
    padding: 6px;
    border-radius: 6px;
    width: 80%;
  }
}

.btn {
  padding: 12px;
  margin-top: 12px;
  color: #ffffff;
  background-color: #2aa9fd;
  border-radius: 12px;
}

.btn-wrap {
  display: flex;
  gap: 12px;
}
</style>