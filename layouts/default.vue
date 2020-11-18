<template>
  <v-app>
    <Snackbar />
    <v-app-bar fixed app>
      <v-toolbar-title class="mr-4" v-text="title" />
      <v-btn nuxt text to="/">Inicio</v-btn>
      <v-btn nuxt text to="/favoritos">Favoritos</v-btn>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ year }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Snackbar from '~/components/Snackbar.vue'

export default {
  components: { Snackbar },
  data: () => ({
    title: 'Equipos',
  }),
  computed: {
    year() {
      return new Date().getFullYear()
    },
  },
}
</script>
