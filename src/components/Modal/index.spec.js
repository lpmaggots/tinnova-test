import { mount } from '@vue/test-utils'
import Modal from '@/components/Modal/index.vue'
import { describe, it, expect } from 'vitest'

describe('Modal.vue', () => {
  it('emite "close" ao clicar no overlay (self)', async () => {
    const wrapper = mount(Modal, {
      props: { show: true }
    })
    await wrapper.find('.modal-overlay').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emite "close" ao clicar no botão de fechar', async () => {
    const wrapper = mount(Modal, {
      props: { show: true }
    })
    await wrapper.find('button.close-btn').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('renderiza conteúdo padrão do slot', () => {
    const wrapper = mount(Modal, {
      props: { show: true },
      slots: {
        default: '<p>Corpo do modal</p>'
      }
    })
    expect(wrapper.html()).toContain('Corpo do modal')
  })

  it('renderiza conteúdo do slot "header"', () => {
    const wrapper = mount(Modal, {
      props: { show: true },
      slots: {
        header: '<h2>Header personalizado</h2>'
      }
    })
    expect(wrapper.html()).toContain('Header personalizado')
  })

  it('renderiza conteúdo do slot "footer"', () => {
    const wrapper = mount(Modal, {
      props: { show: true },
      slots: {
        footer: '<button>Salvar</button>'
      }
    })
    expect(wrapper.html()).toContain('Salvar')
  })
})
