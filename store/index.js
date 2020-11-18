import * as Teams from '~/api/teams'
import FilterTeams from '~/utils/FilterTeams'
import OrderByTeams from '~/utils/OrderByTeams'

export const state = () => ({
  items: [],
  filterItems: [],
  itemsPrePage: 9,
  page: 0,
  query: null,
  orderKey: null,
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
  SAVE_QUERY(state, query) {
    state.query = query
  },
  SAVE_ORDER_KEY(state, key) {
    state.orderKey = key
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
  filterTeams({ commit, state, dispatch }, query) {
    commit('SAVE_QUERY', query)
    if (query) {
      const filterItems = FilterTeams(query, state.items)
      commit('SET_FILTER', filterItems || [])
    } else {
      commit('CLEANER_FILTER')
      if (state.orderKey) {
        dispatch('orderByTeams', state.orderKey)
      }
    }
    commit('SET_PAGE', 0)
  },
  orderByTeams({ commit, state, dispatch }, orderKey) {
    commit('SAVE_ORDER_KEY', orderKey)
    if (orderKey) {
      commit('ORDER_BY', orderKey)
    } else if (state.query) {
      dispatch('filterTeams', state.query)
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
