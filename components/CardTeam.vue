<template>
  <div>
    <v-hover v-slot:default="{ hover }">
      <v-card outlined :elevation="hover ? 1 : 0" class="my-4">
        <v-card-text>
          <v-layout>
            <Avatar size="128" :src="logo" />
            <v-card-title>
              <v-flex d-flex>
                <v-layout column fill-height>
                  <p class="headline mb-0" v-text="team.school" />
                  <span class="subtitle-1">
                    Abreviatura: {{ team.abbreviation }}
                  </span>
                  <p class="title mb-0">
                    <v-icon :color="team.color" size="24">mdi-paw</v-icon>
                    {{ team.mascot }}
                  </p>
                </v-layout>
              </v-flex>
            </v-card-title>
          </v-layout>
          <v-card-actions>
            <v-layout justify-end>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="sencudary"
                    icon
                    :loading="savingToFavorite"
                    @click="setAddOrRemoveToFavourite()"
                    v-on="on"
                  >
                    <v-icon v-if="isInFavourite">mdi-star</v-icon>
                    <v-icon v-else>mdi-star-outline</v-icon>
                  </v-btn>
                </template>
                {{ isInFavourite ? 'Sacar de ' : 'Agregar a ' }} favoritos
              </v-tooltip>
              <v-btn color="primary" text :to="perfilLink" class="mx-2">
                Ver Perfil
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import Avatar from '~/components/Avatar'
// import Rating from '~/components/Rating'
export default {
  components: { Avatar },
  props: {
    team: { type: Object, required: true },
  },
  data: () => ({
    perfil: {},
    savingToFavorite: false,
  }),
  computed: {
    logo() {
      return this.team.logos[0]
    },
    isInFavourite() {
      return true
    },
    perfilLink() {
      return '/team/' + this.team.id
    },
  },
  mounted() {
    console.log(this.team)
  },
  methods: {
    setAddOrRemoveToFavourite() {},
  },
}
</script>
