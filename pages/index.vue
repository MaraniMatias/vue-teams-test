<template>
  <TeamGrid
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
import { mapActions, mapState } from 'vuex'
import TeamGrid from './../components/TeamGrid'

export default {
  components: { TeamGrid },
  asyncData() {},
  data: () => ({
    filterItems: [],
    totalElements: 0,
    page: 0,
    itemsPrePage: 9,
    loading: true,
  }),
  computed: {
    ...mapState({ teams: 'filterItems' }),
  },
  async mounted() {
    const { error } = await this.getTeams()
    if (error) {
      this.$notify({ type: 'error', text: 'No pudimos listar los equipos' })
    }
    this.loading = false
    this.reloadItems()
  },
  methods: {
    ...mapActions(['getTeams', 'filterTeams', 'orderByTeams']),
    reloadItems() {
      this.page = 0
      this.totalElements = this.teams.length
      this.filterItems = this.teams.slice(0, this.itemsPrePage)
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
    async search(query) {
      await this.filterTeams(query)
      this.reloadItems()
    },
    async order(orderKey) {
      this.loading = true
      await this.orderByTeams(orderKey)
      this.reloadItems()
      this.loading = false
    },
  },
}
</script>
