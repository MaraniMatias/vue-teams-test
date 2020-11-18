<template>
  <v-avatar :size="size" tile>
    <v-icon v-if="loading" :size="size">mdi-shield-sync-outline</v-icon>
    <v-icon v-else-if="avatarError || !src" :size="size">
      mdi-shield-remove-outline
    </v-icon>
    <img v-else :src="base64img" />
  </v-avatar>
</template>

<script>
export default {
  components: {},
  props: {
    size: { type: String, default: '32' },
    src: { type: String, default: '' },
  },
  data: () => ({
    avatarError: true,
    loading: false,
    base64img: null,
  }),
  computed: {},
  watch: {
    src: 'loadImg',
  },
  mounted() {
    this.loadImg()
  },
  methods: {
    async loadImg() {
      try {
        // Default logo 'https://collegefootballdata.com/Logo.png'
        this.loading = true
        this.avatarError = true
        const { data: imgFile } = await this.$http.get(this.src, {
          responseType: 'arraybuffer',
        })
        this.base64img =
          'data:image/jpeg;base64,' +
          Buffer.from(imgFile, 'binary').toString('base64')
        this.avatarError = false
      } catch (err) {
        this.avatarError = true
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
