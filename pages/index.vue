<template>
  <div class="main-wrap">
    <Loader v-if="isLoading" class="loading" />
    <main class="main" v-else >
      <SelecterUsers 
        @selected-user="seletcedUser" 
        :users="users" 
        :current-user="currentUserId"
      />
      <ul class="list-posts">
        <li 
          v-for="post in posts" 
          :key="post.id"
          class="post"
        >
          <Post :post="post" />
        </li>
      </ul>
      <Pagination 
        class="pagination" 
        :length="pageCount" 
        :current-page="currentPage"
        @change-page="changePage" 
      /> 
    </main>
  </div>
</template>

<script setup>
const store = useNuxtApp().$store

const limitPosts = 20
const currentPage = ref(1)
const currentUserId = ref(null)
const pageCount = computed(() => Math.ceil(store.state.totalPosts / limitPosts))

const posts = computed(() => store.getters['posts'])
const users = computed(() => store.getters['users'])
const isLoading = computed(() => store.state.isLoading);

async function loadingPosts() {
  const startPost = limitPosts * (currentPage.value - 1)
  await store.dispatch('fetchPosts', {
    limit: limitPosts, 
    start: startPost, 
    userId: currentUserId.value
  })
}

function changePage (numberPage) {
  currentPage.value = numberPage
  console.log(currentPage.value)
  loadingPosts()
}

function seletcedUser (userId) {
  currentUserId.value = userId
  currentPage.value = 1
  loadingPosts()
}

onMounted(async () => {
  await store.dispatch('fetchUsers')
  await loadingPosts()
})
</script>

<style lang="scss" scoped>
.loading {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: max-content;
  height: max-content;
  transform: translateX(-50%);
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background-color: #ffffff;
}

.list-posts {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>