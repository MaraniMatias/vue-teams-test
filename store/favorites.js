import http from '~/api/http'

export const state = () => ({
  items: {},
  favorite: new Set(),
})

export const getters = {
  isLoggedIn: (state) => !!state.user._id,
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
}

export const actions = {
  async login({ commit }, { email, password }) {
    try {
      const { data } = await http.post('/api/auth/login', { email, password })
      if (data.email_verified) {
        commit('SET_USER', data)
      }
      return { data }
    } catch (resp) {
      return {
        error:
          resp.status === 401 &&
          (resp.error || 'Contraseña o email no valido.'),
      }
    }
  },
}
