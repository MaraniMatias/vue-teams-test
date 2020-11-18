<template>
  <v-layout column justify-center>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" lg="10" class="pa-0 mb-0">
        <v-layout justify-center align-center wrap>
          <v-flex xs12 lg3 class="px-2">
            <v-text-field
              v-model.lazy="query"
              label="Buscar"
              hide-details
              clearable
              :readonly="loading"
            />
          </v-flex>
          <!--
          <v-flex xs12 lg3 class="px-2">
            <v-text-field label="Filtrar" hide-details :readonly="loading" />
          </v-flex>
          -->
          <v-flex xs12 lg3 class="px-2">
            <v-select
              v-model.lazy="orderKey"
              label="Ordenar"
              hide-details
              :items="orderKeyList"
              item-value="key"
              item-text="text"
              clearable
              :readonly="loading"
            />
          </v-flex>
          <v-flex xs12 lg3>
            <v-layout align-center class="mt-3" fill-height justify-end>
              <p class="mb-0 mx-2" v-text="showPageInfo" />
              <v-btn icon :disabled="disableBeforeBtn" @click="beforePage">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn icon :disabled="disableNextBtn" @click="nextPage">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-flex v-show="loading" xs12 class="text-center my-12">
        <v-progress-circular
          width="2"
          indeterminate
          active
          color="grey darken-1"
        />
        <p class="mt-6">Buscando...</p>
      </v-flex>
    </v-row>
    <v-row justify="center">
      <v-col
        v-for="team in filterItems"
        :key="team.id"
        cols="auto"
        class="pb-0 mb-0"
      >
        <CardTeam :team="team" />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CardTeam from './../components/CardTeam'

export default {
  components: { CardTeam },
  asyncData() {},
  data: () => ({
    filterItems: [],
    totalElements: 0,
    page: 0,
    itemsPrePage: 9,
    loading: true,
    query: null,
    orderKeyList: [
      { key: 'id', text: 'Código' },
      { key: 'mascot', text: 'Mascota' },
      { key: 'school', text: 'Escuela' },
      { key: 'color', text: 'Color' },
    ],
    orderKey: '',
  }),
  computed: {
    ...mapState({ teams: 'filterItems' }),
    showPageInfo() {
      return `Pag.: ${this.page + 1} - Equipo: ${this.totalElements}`
    },
    disableBeforeBtn() {
      return this.loading || this.page === 0
    },
    disableNextBtn() {
      return (
        this.loading || this.page * this.itemsPrePage * 2 >= this.totalElements
      )
    },
  },
  watch: {
    query: 'search',
    orderKey: 'order',
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
    async search() {
      await this.filterTeams(this.query)
      this.reloadItems()
    },
    async order() {
      this.loading = true
      await this.orderByTeams(this.orderKey)
      this.reloadItems()
      this.loading = false
    },
  },
}
</script>
