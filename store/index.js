import * as Teams from '~/api/teams'
import FilterItems from '~/utils/FilterTeams'
import OrderByTeams from '~/utils/OrderByTeams'

export const state = () => ({
  items: [],
  filterItems: [],
  itemsPrePage: 9,
  page: 0,
})

export const getters = {
  findById: (state) => (teamId) => {
    return state.items.find((team) => team.id === teamId)
  },
  totalElements: (state) => state.filterItems.length,
  itemsOnPage: (state) => {
    const start = state.page * state.itemsPrePage * 2
    const end = start + state.itemsPrePage
    return state.filterItems.slice(start, end)
  },
}

export const mutations = {
  SET_TEAMS(state, teams) {
    state.items = teams || []
    state.filterItems = teams.slice(0)
  },
  SET_FILTER(state, teams) {
    state.filterItems = teams || []
  },
  CLEANER_FILTER(state) {
    state.filterItems = state.items.slice(0)
  },
  SET_PAGE(state, page) {
    state.page = page
  },
  //
  ORDER_BY(state, orderKey) {
    state.filterItems = OrderByTeams(orderKey, state.filterItems)
  },
}

export const actions = {
  async getTeams({ commit, getters }) {
    try {
      if (getters.totalElements) return { data: state.items }
      const { data } = await Teams.get()
      commit('SET_TEAMS', data || [])
      commit('SET_PAGE', 0)
      return { data }
    } catch (resp) {
      return { error: resp.error }
    }
  },
  filterTeams({ commit, state }, query) {
    if (query) {
      const filterItems = FilterItems(query, state.items)
      commit('SET_FILTER', filterItems || [])
    } else {
      commit('CLEANER_FILTER')
    }
    commit('SET_PAGE', 0)
  },
  orderByTeams({ commit }, orderKey) {
    if (orderKey) {
      commit('ORDER_BY', orderKey)
    } else {
      commit('CLEANER_FILTER')
    }
    commit('SET_PAGE', 0)
  },
  beforeItems({ commit, state }) {
    const start = state.page * state.itemsPrePage - state.itemsPrePage
    if (start > 0) {
      commit('SET_PAGE', state.page - 1)
    } else {
      commit('SET_PAGE', 0)
    }
  },
  nextItems({ commit, state, getters }) {
    const start = state.page * state.itemsPrePage + state.itemsPrePage
    if (start < getters.totalElements) {
      commit('SET_PAGE', state.page + 1)
    }
  },
}
