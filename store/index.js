import * as Teams from '~/api/teams'

export const state = () => ({
  items: {},
})

export const getters = {
  isLoggedIn: (state) => !!state.user._id,
}

export const mutations = {
  SET_TEAMS(state, teams) {
    state.items = teams
  },
}

export const actions = {
  async getTeams({ commit }) {
    try {
      const { data } = await Teams.get()
      if (data) {
        commit('SET_TEAMS', data)
      }
      return { data }
    } catch (resp) {
      return { error: resp.error }
    }
  },
}
