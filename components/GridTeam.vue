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
    <v-row v-if="loading" justify="center">
      <v-flex xs12 class="text-center my-12">
        <v-progress-circular
          width="2"
          indeterminate
          active
          color="grey darken-1"
        />
        <p class="mt-6">Buscando...</p>
      </v-flex>
    </v-row>
    <v-row v-else justify="center">
      <v-col v-for="team in items" :key="team.id" cols="auto" class="pb-0 mb-0">
        <CardTeam :team="team" :show-comment="favorite" />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
/// <reference path="./../types/index.js" />
import CardTeam from './../components/CardTeam'

export default {
  components: { CardTeam },
  props: {
    /** @type {{ Array<Team> }} */
    items: { type: Array, required: true, default: () => [] },
    page: { type: Number, default: 0 },
    itemsPrePage: { type: Number, default: 9 },
    totalItems: { type: Number, default: 0 },
    loading: { type: Boolean, default: false },
    favorite: { type: Boolean, default: false },
  },
  data: () => ({
    query: null,
    orderKey: '',
    orderKeyList: [
      { key: 'id', text: 'Código' },
      { key: 'mascot', text: 'Mascota' },
      { key: 'school', text: 'Escuela' },
      { key: 'color', text: 'Color' },
    ],
  }),
  computed: {
    showPageInfo() {
      return `Pag.: ${this.page + 1} - Equipo: ${this.totalItems}`
    },
    disableBeforeBtn() {
      return this.loading || this.page === 0
    },
    disableNextBtn() {
      return (
        this.loading ||
        this.page * this.itemsPrePage * 2 >= this.totalItems ||
        this.itemsPrePage > this.totalItems
      )
    },
  },
  watch: {
    query() {
      this.$emit('search', this.query)
    },
    orderKey() {
      this.$emit('order', this.orderKey)
    },
  },
  created() {},
  methods: {
    beforePage() {
      this.$emit('before')
    },
    nextPage() {
      this.$emit('next')
    },
  },
}
</script>
