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

        // В API не нашел метода для получения количество постов, поэтому решил просто возвращать число,
        // если в фильтрах пользователь не выбран то 100, если фильтр по пользователю активен то 10.
        // Вариант конечно странный, но тут либо так либо получать все посты и считать сколько постов всего что не эффиктивно и вызывало много багов.
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
      try {
        const users = await $fetch('/api/users')
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