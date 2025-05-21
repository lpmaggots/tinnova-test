import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from '@/App.vue'
import usersMock from '@/data/users.json'

describe('App.vue', () => {
  it('renderiza a tabela com dados dos usuários', () => {
    const wrapper = mount(App)
    const rows = wrapper.findAll('tbody tr')

    rows.forEach((rowWrapper, index) => {
      const cols = rowWrapper.findAll('td')
      expect(cols[0].text()).toBe(usersMock[index].name)
      expect(cols[1].text()).toBe(usersMock[index].email)
      expect(cols[2].text().length).toBeGreaterThan(0)
      expect(cols[3].text().length).toBeGreaterThan(0)
    })
  })
})
