import { mount, shallowMount } from '@vue/test-utils'
import Avatar from '@/components/Avatar.vue'
import vuetify from 'vuetify'
import Vue from 'vue'
import axios from 'axios'

const srcAvatarImg = 'https://avatars1.githubusercontent.com/u/7859628?s=60&v=4'

describe('Avatar', () => {
  Vue.use(vuetify)

  test('Es una instancia de Vue', () => {
    const wrapper = mount(Avatar)
    expect(wrapper.vm).toBeTruthy()
  })

  test('Es loading muestra icono', () => {
    const wrapper = mount(Avatar, {
      propsData: {
        src: '',
      },
      data: () => ({
        loading: true,
      }),
    })
    const icon = wrapper.findComponent({ name: 'v-icon' })
    expect(icon.exists()).toBe(true)
    expect(icon.isVisible()).toBe(true)
    expect(icon.html()).toContain('mdi-shield-sync-outline')
  })

  test('Es src nil muestra icono', () => {
    const wrapper = mount(Avatar, {
      propsData: {
        src: '',
      },
      data: () => ({
        avatarError: false,
      }),
    })
    const icon = wrapper.findComponent({ name: 'v-icon' })
    expect(icon.exists()).toBe(true)
    expect(icon.isVisible()).toBe(true)
    expect(icon.html()).toContain('mdi-shield-remove-outline')
  })

  test('Muestra una imagen', () => {
    const wrapper = mount(Avatar, {
      propsData: {
        src: srcAvatarImg,
      },
      data: () => ({
        loading: false,
        avatarError: false,
      }),
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.isVisible()).toBe(true)
  })

  test('No mostrar la imagen', () => {
    const wrapper = mount(Avatar, {
      propsData: {
        src: '',
      },
      data: () => ({
        avatarError: false,
      }),
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(false)
  })

  test('Cargar la imagen', async (done) => {
    const wrapper = shallowMount(Avatar, {
      mocks: {
        $http: axios,
      },
      propsData: {
        src: srcAvatarImg,
      },
      data: () => ({
        avatarError: false,
      }),
    })
    expect(wrapper.vm.base64img).toBe(null)
    await wrapper.vm.loadImg()

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.avatarError).toBe(false)
      expect(typeof wrapper.vm.base64img).toBe('string')
      done()
    })
  })
})
