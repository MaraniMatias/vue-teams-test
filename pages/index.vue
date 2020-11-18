<template>
  <TeamGrid
    :items="itemsOnPage"
    :page="page"
    :items-pre-page="itemsPrePage"
    :total-items="totalElements"
    :loading="loading"
    @before="beforeItems"
    @next="nextItems"
    @search="search"
    @order="order"
  />
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import TeamGrid from './../components/TeamGrid'

export default {
  components: { TeamGrid },
  asyncData() {},
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapState(['itemsPrePage', 'page']),
    ...mapGetters(['totalElements', 'itemsOnPage']),
  },
  async mounted() {
    const { error } = await this.getTeams()
    if (error) {
      this.$notify({ type: 'error', text: 'No pudimos listar los equipos' })
    }
    this.loading = false
  },
  methods: {
    ...mapActions([
      'getTeams',
      'orderByTeams',
      'nextItems',
      'beforeItems',
      'filterTeams',
    ]),
    async search(query) {
      await this.filterTeams(query)
    },
    async order(orderKey) {
      this.loading = true
      await this.orderByTeams(orderKey)
      this.loading = false
    },
  },
}
</script>
