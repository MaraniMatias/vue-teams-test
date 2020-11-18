<template>
  <v-layout column justify-center>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" class="pb-0 mb-0">
        <v-layout justify-center align-center>
          <v-text-field label="Buscar" />
          <v-text-field label="Filtrar" />
          <v-text-field label="Ordenar" />
          <v-spacer />
          <v-btn icon>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
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
    loading: true,
  }),
  computed: {
    ...mapState(['teams']),
  },
  async mounted() {
    const { data, error } = await this.getTeams()
    if (error) {
      this.$notify({ type: 'error', text: 'No pudimos listar los equipos' })
    }
    this.loading = false
    this.teams = data || []
    this.filterItems = data.splice(0, 9)
  },
  methods: {
    ...mapActions(['getTeams']),
  },
}
</script>
