<template>
  <v-layout column mb-2 px-2>
    <v-layout v-if="team" justify-center fill-height mt-0>
      <v-flex xs12 lg7 xl5>
        <CardTeam :team="team" />
      </v-flex>
    </v-layout>
    <v-row v-else align="center" justify="center" class="my-12">
      <div class="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          fill="#DBE1EC"
          viewBox="0 0 48 48"
        >
          <path
            d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
          ></path>
        </svg>
        <h1>Equipo no encontrado</h1>
        <p class="description mt-4">
          <a @click="$router.back()">Volver</a>
        </p>
      </div>
    </v-row>
  </v-layout>
</template>

<script>
import CardTeam from '~/components/CardTeam'

export default {
  components: { CardTeam },
  asyncData({ params, store }) {
    const teamId = params.id
    if (teamId) {
      const team = store.getters.findById(parseInt(teamId, 10))
      return { team, component: '' }
    } else {
      return { team: null }
    }
  },
  data: () => ({}),
  computed: {},
  mounted() {},
  methods: {},
}
</script>
