<template>
  <div class="selector">
    <label for="user-select">Фильтр по пользователю</label>
    <select id="user-select" @change="handlerSelect">
      <option :value="''">--Пусто</option>
      <option
        v-for="user in props.users"
        :key="user.id"
        :value="user.id"
      >
        {{ user.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  users: {
    type: Array,
    required: true,
    default: []
  }
})

const emit = defineEmits(['selected-user'])

const handlerSelect = (event) => {
  const value = event.target.value  
  const userId = value === '' ? null : Number(value)

  emit('selected-user', userId)
}
</script>

<style lang="scss" scoped>
.selector {
  display: flex;
  align-items: center;
  gap: 15px;

  label {
    font-weight: bold;
  }

  select {
    padding: 8px;
    border: 1px solid #000000;
    border-radius: 5px;
  }
}
</style>