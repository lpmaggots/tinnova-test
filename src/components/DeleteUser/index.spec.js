import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import DeleteUser from '@/components/DeleteUser/index.vue'
import usersMock from '@/data/users.json'

const localStorageMock = (() => {
  let store = {}
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString() },
    clear: () => { store = {} }
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('DeleteUser.vue', () => {
  const storeKey = '@users-tinnnova'

  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem(storeKey, JSON.stringify(usersMock))
  })

  const props = {
    index: 1,
    name: usersMock[1].name
  }

  it('recebe as props corretamente', () => {
    const wrapper = mount(DeleteUser, { props })
    expect(wrapper.props('index')).toBe(1)
    expect(wrapper.props('name')).toBe('Maria Antonieta')
  })

  it('abre o modal ao clicar no botão', async () => {
    const wrapper = mount(DeleteUser, { props })
    expect(wrapper.vm.showModal).toBe(false)

    await wrapper.find('button[title="Delete"]').trigger('click')
    expect(wrapper.vm.showModal).toBe(true)
  })

  it('fecha o modal ao chamar closeModal', () => {
    const wrapper = mount(DeleteUser, { props })
    wrapper.vm.showModal = true
    wrapper.vm.closeModal()
    expect(wrapper.vm.showModal).toBe(false)
  })

  it('handleDelete remove usuário do localStorage, emite evento e fecha modal', () => {
    const wrapper = mount(DeleteUser, { props })

    wrapper.vm.showModal = true
    wrapper.vm.handleDelete()

    const updatedUsers = JSON.parse(localStorage.getItem(storeKey))
    expect(updatedUsers).toEqual([
      usersMock[0],
      usersMock[2],
      usersMock[3]
    ])
    expect(wrapper.emitted('update-store')).toBeTruthy()
    expect(wrapper.emitted('update-store').length).toBe(1)
    expect(wrapper.vm.showModal).toBe(false)
  })
})
