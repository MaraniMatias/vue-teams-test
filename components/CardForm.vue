<template>
  <v-card :class="{ 'elevation-3': !transparent }" rounded>
    <v-toolbar v-if="!hideHeader" color="transparent" flat title>
      <v-toolbar-title><slot name="header" /></v-toolbar-title>
      <v-spacer />
      <slot name="header-right" />
    </v-toolbar>
    <v-form
      :id="id"
      ref="form"
      :enctype="enctype"
      lazy-validation
      :disabled="disabled"
      @submit.prevent="submit"
    >
      <v-container class="py-0 px-2" grid-list-md>
        <v-card-text :class="{ 'py-0': !hideHeader }">
          <slot :rules="rules" />
          <v-flex xs12 my-2><slot name="message" /></v-flex>
        </v-card-text>
      </v-container>
      <!--
      <v-card-actions
        class="pa-4"
        :class="{ grey: !transparent, 'lighten-3': !transparent }"
      >
      -->
      <v-divider />
      <v-card-actions class="pa-4">
        <slot name="actions-left" />
        <v-spacer />
        <slot name="actions" />
      </v-card-actions>
    </v-form>
    <slot name="footer" />
  </v-card>
</template>

<script>
import formRules from 'form-rules'

let pressEnter = false

export default {
  name: 'CardForm',
  props: {
    // eslint-disable-next-line
    enctype: { type: String }, // default: "application/x-www-form-urlencoded"
    id: { type: String, default: null },
    reset: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    hideHeader: { type: Boolean, default: false },
    transparent: { type: Boolean, default: false },
    preventEnter: { type: Boolean, default: false },
  },
  computed: {
    rules: () => formRules,
  },
  watch: {
    valid(newValue) {
      this.$emit('input', newValue)
    },
    reset: 'resetValidation',
  },
  mounted() {
    this.$nextTick(function () {
      this.$refs.form.resetValidation()
    })
    document.onkeydown = function (evt) {
      const keyCode = evt && evt.which ? evt.which : evt.keyCode
      pressEnter = keyCode === 13
    }
  },
  methods: {
    // validate() {
    //   if (this.$refs.form.validate()) { }
    // },
    // reset() {
    //   this.$refs.form.reset();
    // },
    async resetValidation() {
      await this.$refs.form.resetValidation()
      this.$emit('update:reset', false)
    },
    async submit() {
      if (!this.preventEnter || (this.preventEnter && !pressEnter)) {
        const valid = await this.$refs.form.validate()
        this.$emit('submit', valid)
      }
    },
  },
}
</script>
