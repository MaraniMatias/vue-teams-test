<!--
Para persistir la búsqueda como en la vista de equipos tendría que usar el
storage
-->

<template>
  <GridTeam
    favorite
    :items="filterItems"
    :page="page"
    :items-pre-page="itemsPrePage"
    :total-items="totalElements"
    :loading="loading"
    @before="beforePage"
    @next="nextPage"
    @search="search"
    @order="order"
  />
</template>

<script>
import { mapActions } from 'vuex'
import GridTeam from './../components/GridTeam'
import * as Favorites from '~/api/favorite'
import FilterItems from '~/utils/FilterTeams'
import OrderByTeams from '~/utils/OrderByTeams'

export default {
  components: { GridTeam },
  asyncData() {},
  data: () => ({
    /** @type {Team[]} */
    teams: [],
    filterItems: [],
    totalElements: 0,
    page: 0,
    itemsPrePage: 9,
    loading: true,
    query: null,
    orderKey: null,
  }),
  computed: {},
  mounted() {
    this.getTeams()
    this.teams = Favorites.getAll().map((teamIdAndComent) => {
      const teamId = teamIdAndComent[0]
      return this.$store.getters.findById(teamId)
    })
    this.reloadItems()
    this.loading = false
  },
  methods: {
    ...mapActions(['getTeams']),
    reloadItems() {
      this.page = 0
      this.totalElements = this.teams.length
      this.filterItems = this.teams.slice(0)
    },
    beforePage() {
      const start = this.page * this.itemsPrePage - this.itemsPrePage
      const end = start + this.itemsPrePage
      this.filterItems = this.teams.slice(start, end)
      if (start > 0) {
        this.page -= 1
      } else {
        this.page = 0
      }
    },
    nextPage() {
      const start = this.page * this.itemsPrePage + this.itemsPrePage
      const end = start + this.itemsPrePage
      this.filterItems = this.teams.slice(start, end)
      if (start < this.totalElements) {
        this.page += 1
      }
    },
    search(query) {
      this.query = null
      this.reloadItems()

      if (query) {
        this.filterItems = FilterItems(query, this.teams)
      }
      if (this.orderKey) {
        this.filterItems = OrderByTeams(this.orderKey, this.filterItems)
      }

      this.query = query
    },
    order(orderKey) {
      this.loading = true
      this.orderKey = null
      this.reloadItems()

      if (this.query) {
        this.filterItems = FilterItems(this.query, this.teams)
      }
      if (orderKey) {
        this.filterItems = OrderByTeams(orderKey, this.filterItems)
      }

      this.orderKey = orderKey
      this.loading = false
    },
  },
}
</script>
