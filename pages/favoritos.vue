<!--
Para persistir la búsqueda como en la vista de equipos tendría que usar el
storage
-->

<template>
  <TeamGrid
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
import TeamGrid from './../components/TeamGrid'
import * as Favorites from '~/api/favorite'
import FilterItems from '~/utils/FilterTeams'
import OrderByTeams from '~/utils/OrderByTeams'

export default {
  components: { TeamGrid },
  asyncData() {},
  data: () => ({
    teams: [],
    filterItems: [],
    totalElements: 0,
    page: 0,
    itemsPrePage: 9,
    loading: true,
  }),
  computed: {},
  mounted() {
    this.teams = Favorites.getAll()
    this.reloadItems()
    this.loading = false
  },
  methods: {
    reloadItems() {
      this.page = 0
      this.totalElements = this.teams.length
      this.filterItems = this.teams
        .slice(0, this.itemsPrePage)
        .map((teamIdAndComent) => {
          const teamId = teamIdAndComent[0]
          return this.$store.getters.findById(teamId)
        })
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
      if (query) {
        this.filterItems = FilterItems(query, this.filterItems)
      } else {
        this.reloadItems()
      }
    },
    order(orderKey) {
      this.loading = true
      if (orderKey) {
        this.filterItems = OrderByTeams(orderKey, this.filterItems)
      } else {
        this.reloadItems()
      }
      this.loading = false
    },
  },
}
</script>
