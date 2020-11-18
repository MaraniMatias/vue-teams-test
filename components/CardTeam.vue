<template>
  <div>
    <v-hover v-slot:default="{ hover }">
      <v-card outlined :elevation="hover ? 1 : 0" class="my-4" width="512">
        <v-card-text class="pb-0">
          <v-layout>
            <Avatar size="128" :src="logo" />
            <v-flex d-flex class="ml-4">
              <v-layout column fill-height>
                <p class="headline mb-0" v-text="team.school" />
                <span class="subtitle-1" v-text="team.abbreviation" />
                <p class="title mb-0">
                  <v-icon :color="team.color" size="24">mdi-paw</v-icon>
                  {{ team.mascot }}
                </p>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout v-show="showComment" column>
            <p class="mb-0 font-weight-bold">Comentario personal:</p>
            <p class="mb-1" style="min-height: 24px" v-text="favoriteComment" />
          </v-layout>
        </v-card-text>

        <v-layout v-show="showDetails" column class="px-4">
          <p class="font-weight-bold">
            Abreviatura:
            <span class="ml-1 font-weight-regular" v-text="team.abbreviation" />
          </p>
          <p class="font-weight-bold">
            Conferencia:
            <span class="ml-1 font-weight-regular" v-text="team.conference" />
          </p>
          <p class="font-weight-bold">
            Division:
            <span class="ml-1 font-weight-regular" v-text="team.division" />
          </p>
          <p class="font-weight-bold">
            Color:
            <v-icon :color="team.color">mdi-checkbox-blank-circle</v-icon>
            <v-icon :color="team.alt_color">mdi-checkbox-blank-circle</v-icon>
          </p>
          <p class="mb-0 font-weight-bold">Nombres alternativos:</p>
          <p class="mb-1" v-text="team.alt_name_1" />
          <p class="mb-1" v-text="team.alt_name_2" />
          <p class="mb-1" v-text="team.alt_name_3" />
        </v-layout>

        <v-divider class="mx-4 mt-2"></v-divider>
        <v-card-actions>
          <p class="mb-0" v-text="'Cod: ' + team.id" />
          <v-layout justify-end>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="sencudary"
                  icon
                  @click="setAddOrRemoveToFavourite()"
                  v-on="on"
                >
                  <v-icon v-if="isFavourite">mdi-star</v-icon>
                  <v-icon v-else>mdi-star-outline</v-icon>
                </v-btn>
              </template>
              {{ isFavourite ? 'Sacar de ' : 'Agregar a ' }} favoritos
            </v-tooltip>
            <v-btn
              v-show="!showDetails"
              color="primary"
              text
              :to="perfilLink"
              class="mx-2"
            >
              Ver Perfil
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-hover>
    <v-dialog v-model="showModalAddComment" max-width="400">
      <CardForm :reset="showModalAddComment" @submit="saveFavoriteTeam">
        <template v-slot:header>Agregue un comentario</template>
        <template v-slot:default="{ rules }">
          <v-flex xs12 mt-2>
            <v-textarea
              v-model.lazy="favoriteComment"
              auto-grow
              counter="500"
              label="Escriba un comentario o nota."
              outlined
              :rules="[rules.max(500), rules.required()]"
            />
          </v-flex>
        </template>
        <template v-slot:actions>
          <v-btn text @click="close()">Cancelar</v-btn>
          <v-btn color="primary" type="submit">Agregar</v-btn>
        </template>
      </CardForm>
    </v-dialog>
  </div>
</template>

<script>
/// <reference path="./../types/index.js" />

import Avatar from '~/components/Avatar'

export default {
  components: { Avatar },
  props: {
    /** @type {{ new (): Team }} */
    team: { type: Object, required: true },
    showComment: { type: Boolean, default: false },
    showDetails: { type: Boolean, default: false },
  },
  data: () => ({
    isFavourite: false,
    favoriteComment: '',
    showModalAddComment: false,
  }),
  computed: {
    logo() {
      return this.team.logos?.[0]
    },
    favoriteKey() {
      return 'team-' + this.team.id
    },
    perfilLink() {
      return '/team/' + this.team.id
    },
  },
  mounted() {
    this.isFavourite = localStorage.getItem(this.favoriteKey) !== null
  },
  methods: {
    setAddOrRemoveToFavourite() {
      if (this.isFavourite) {
        localStorage.removeItem(this.favoriteKey)
        this.isFavourite = false
      } else {
        this.showModalAddComment = true
      }
    },
    saveFavoriteTeam(formValid) {
      if (!formValid) return false
      localStorage.setItem(this.favoriteKey, this.favoriteComment)
      this.$notify({ type: 'success', text: 'Equipo agregado a favoritos' })
      this.isFavourite = true
      this.close()
    },
    close() {
      this.favoriteComment = ''
      this.showModalAddComment = false
    },
  },
}
</script>
