import { createStore } from "vuex";

export default () => createStore({
  state: () => ({
    posts: [],
    users: [],
    isLoading: true,
    totalPosts: 0,
  }),

  mutations: {
    setPosts(state, posts) { state.posts = posts },
    setUsers(state, users) { state.users = users },
    setTotalPosts(state, total) { state.totalPosts = total },
    setLoading(state, newValue) { state.isLoading = newValue }
  },

  actions: {
    async fetchPosts({ commit }, { start = 0, limit = 20, userId = null } = {}) {
      commit('setLoading', true)
      try {
        const posts = await $fetch('/api/posts', {
          params: { start, limit, userId }
        })
        commit('setPosts', posts)

        // В API не нашел метода для получения количество постов, поэтому решил пойти путем получения всех постов и расчета длины полученного массива,
        // также я учел количество постов отфильтрованных по пользователю.
        // Вариант конечно не эффективный но другого выхода я не вижу если нужна адаптивная пагинация что бы учитывать количество страниц.
        const totalPosts = await $fetch('/api/posts-count', {
          params: { userId }
        })
        commit('setTotalPosts', totalPosts)

      } catch (err) {
        console.error('Error: ', err)
        commit('setPosts', [])
        commit('setTotalPosts', 0)  
      } finally {
        commit('setLoading', false)
      }
    },

    async fetchUsers({ commit }) {
      commit('setLoading', true)
      if (process.server) return 
      try {
        const users = await fetch('https://jsonplaceholder.typicode.com/users')
        commit('setUsers', users)
      } catch (err) {
        console.error('Error: ', err)
        commit('setUsers', [])
      } finally {
        commit('setLoading', false)
      } 
    },
  },

  getters: {
    posts: state => state.posts,
    users: state => state.users,
    totalPosts: state => state.totalPosts,
    getUserById: (state) => (userId) => {
      return state.users.find((u) => u.id === userId)
    },
    isLoading: (state) => state.isLoading
  }
})