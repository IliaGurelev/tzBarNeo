<template>
  <ul v-show="props.length > 1" class="list">
    <li 
      v-for="number in props.length"
      class="item" 
      :class="{'item--active': isActive(number)}"
      :key="number"
     >
      <button @click="changePage(number)" class="btn">{{number}}</button>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  length: {
    type: Number,
    required: false,
    default: 1
  },
  currentPage: {
    type: Number,
    required: false,
    default: 1
  }
})

const emit = defineEmits(['change-page'])

const currentPage = computed(() => props.currentPage)

const isActive = (number) => {
  return number === currentPage.value
}

const changePage = (number) => {
  emit('change-page', number)
} 
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  gap: 3px;
}

.item {
  padding: 8px 12px;
  font-size: 24px;
  color: #ffffff;
  background-color: #2aa9fd;
  cursor: pointer;

  &--active {
    background-color: #1e84c9;
  }

  &:hover {
    background-color: #1e84c9;
  }
}
</style>