<template>
  <v-app>
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
export default {
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
