import * as Teams from '~/api/teams'

export const state = () => ({
  teams: [],
  filterItems: [],
  // totalElements: 0,
  // page: 0,
  // itemsPrePage: 9,
})

export const getters = {
  findById: (state) => (teamId) => {
    return state.teams.find((team) => team.id === teamId)
  },
}

export const mutations = {
  SET_TEAMS(state, teams) {
    // state.teams = teams.splice(0, 20)
    state.teams = teams
    state.filterItems = teams.slice(0)
  },
  SET_FILTER(state, teams) {
    state.filterItems = teams
  },
  CLEANER_FILTER(state) {
    state.filterItems = state.teams.slice(0)
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
  filterTeams({ commit, state }, query) {
    if (query) {
      const filterItems = state.filterItems.filter((team) => {
        const mascot = team.mascot?.toLowerCase() || ''
        const school = team.school?.toLowerCase() || ''
        return mascot.includes(query) || school.includes(query)
      })
      commit('SET_FILTER', filterItems || [])
    } else {
      commit('CLEANER_FILTER')
    }
  },
  orderByTeams({ commit, state }, orderKey) {
    if (orderKey) {
      const filterItems = state.filterItems.sort((teamA, teamB) => {
        if (teamA[orderKey] < teamB[orderKey]) {
          return -1
        }
        if (teamA[orderKey] > teamB[orderKey]) {
          return 1
        }
        return 0
      })
      commit('SET_FILTER', filterItems || [])
    } else {
      commit('CLEANER_FILTER')
    }
  },
}
