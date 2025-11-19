<template>
  <NuxtLink :to="`/posts/post_id=${post.id}`" class="post">
    <div class="user-info" v-if="user">
      <div>
        <p><b>User: </b>{{ user.name }}</p>
        <p><b>Username: </b>{{ user.username }}</p>
      </div>
      <div>
        <p><b>Email: </b>{{ user.email }}</p>
        <p><b>Phone: </b>{{ user.phone }}</p>
        <p><b>Website: </b>{{ user.website }}</p>
      </div>
    </div>
    <div class="user-info user-info--error" v-else>
      <p>Ошибка загрузки пользователя</p>
    </div>
    <p><b>Title: </b>{{ post.title }}</p>
    <p><b>Body: </b>{{post.body}}</p>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const store = useNuxtApp().$store

const user = store.getters['getUserById'](props.post.userId)  
</script>

<style lang="scss" scoped>
.post {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 15px;
  color: #000000;
  border: 1px solid #d3d3d3;
  border-radius: 25px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.1s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
}

.user-info {
  display: grid;
  grid-template-columns: 50% 50%;
  border: 1px solid #2aa9fd;
  padding: 8px;
  border-radius: 16px;

  &--error {
    border-color: #fd2a2a;
  }
}
</style>