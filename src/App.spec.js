import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import DataTable from '@/components/DataTable/index.vue'

describe('App.vue', () => {
  it('renderiza o componente DataTable', () => {
    const wrapper = mount(App)
    const dataTable = wrapper.findComponent(DataTable)
    expect(dataTable.exists()).toBe(true)
  })
})