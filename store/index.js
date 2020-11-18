import * as Teams from '~/api/teams'

export const state = () => ({
  teams: [],
  filterItems: [],
  // totalElements: 0,
  // page: 0,
  // itemsPrePage: 9,
})

// export const getters = {
//   filterItems: (state) => {
//     const start = state.page + state.itemsPrePage
//     return state.teams.slice(start, state.itemsPrePage)
//   },
// }

export const mutations = {
  SET_TEAMS(state, teams) {
    // state.teams = teams.splice(0, 20)
    state.teams = teams
    state.filterItems = teams
  },
  SET_FILTER(state, teams) {
    state.filterItems = teams
  },
  CLEANER_FILTER(state) {
    state.filterItems = state.teams
  },
}

export const actions = {
  async getTeams({ commit }) {
    try {
      const { data } = await Teams.get()
      commit('SET_TEAMS', data || [])
      return { data }
    } catch (resp) {
      return { error: resp.error }
    }
  },
  filter({ commit, state }, query) {
    if (query) {
      console.log(query)
      const filterItems = state.teams.filter((team) => {
        const mascot = team.mascot?.toLowerCase() || ''
        const school = team.school?.toLowerCase() || ''
        return mascot.includes(query) || school.includes(query)
      })
      commit('SET_FILTER', filterItems || [])
    } else {
      commit('CLEANER_FILTER')
    }
  },
}
