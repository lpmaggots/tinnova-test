<script setup>
  import { ref } from 'vue'
  import Modal from '@/components/Modal/index.vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faEdit } from '@fortawesome/free-regular-svg-icons'
  import { faSpinner } from '@fortawesome/free-solid-svg-icons'

  const storeKey = '@users-tinnnova'
  const showModal = ref(false)
  let isLoading = ref(false)

  const emit = defineEmits(['update-store'])
  const props = defineProps({
    index: {
      type: Number
    },
    editMode: {
      type: Boolean,
      default: false
    }
  })

  const openModal = () => {
    if(props.editMode) {
      getUser()
    }
    showModal.value = true
  }
  const closeModal = () => {
    showModal.value = false
    clearForm()
  }

  const cpfMask = {  mask: '000.000.000-00' }
  const phoneMask = { mask: '(00) 00000-0000' }

  const form = ref({
    name: '',
    email: '',
    cpf: '',
    phone: ''
  })

  const errors = ref({
    name: '',
    email: '',
    cpf: '',
    phone: ''
  })

  const validateForm = () => {
    let isValid = true
    errors.value = { name: '', email: '', cpf: '', phone: '' }
    if (!form.value.name.trim()) {
      errors.value.name = 'Nome é obrigatório'
      isValid = false
    }
    if(!form.value.email.includes('@')) {
      errors.value.email = 'Email inválido'
      isValid = false
    }
    const cpfClean = form.value.cpf.replace(/\D/g, '')
    if(cpfClean.length !== 11) {
      errors.value.cpf = 'CPF deve conter 11 números'
      isValid = false
    }
    const phoneClean = form.value.phone.replace(/\D/g, '')
    if(phoneClean.length < 10) {
      errors.value.phone = 'Telefone inválido'
      isValid = false
    }
    return isValid
  }

  const handleSubmit = () => {
    if(validateForm()) {
      isLoading = true
      let parsed = []
      let usersStorage = localStorage.getItem(storeKey)
      parsed = JSON.parse(usersStorage)

      if(!props.editMode) {
        parsed.push({ ...form.value })
      }else {
        parsed[props.index] = { ...form.value }
      }
      
      localStorage.setItem(storeKey, JSON.stringify(parsed))
      setTimeout(() => {
        isLoading = false
        emit('update-store')
        closeModal()
      }, 1000)
    }
  }

  const getUser = () => {
    const stored = localStorage.getItem(storeKey)
    let parsed = []

    if(stored) {
      try{
        parsed = JSON.parse(stored)
      }catch (e) {
        console.warn('Erro ao parsear store', e)
        return
      }
    }

    if(props.index !== null && parsed[props.index]) {
      const selectedUser = parsed[props.index]
      form.value = { ...selectedUser }
    }else {
      console.warn('Usuário não encontrado ou índice inválido.')
    }
  }

  const clearForm = () => {
    form.value = {
      name: '',
      email: '',
      cpf: '',
      phone: ''
    }
    errors.value = {
      name: '',
      email: '',
      cpf: '',
      phone: ''
    }
  }
</script>

<template>
  <div>
    <button
      v-if="!props.editMode"
      class="btn-primary mb-3"
      @click="openModal"
    >
      Novo cadastro
    </button>
    <button
      v-else
      title="Edit"
      class="btn-icon"
      @click="openModal"
    >
      <FontAwesomeIcon :icon="faEdit" />
    </button>
  </div>
  <Modal v-if="showModal" @close="closeModal">
    <template #header>
      <h2>{{ props.editMode ? 'Editar' : 'Cadastrar' }}</h2>
    </template>

    <form @submit.prevent="handleSubmit">
      <label>
        Nome completo (sem abreviações)
        <input
          v-model="form.name"
          type="text"
          placeholder="John Doe"
        />
        <small class="error" v-if="errors.name">{{ errors.name }}</small>
      </label>

      <label>
        E-mail
        <input
          v-model="form.email"
          type="email"
          placeholder="email@gmail.com"
        />
        <small class="error" v-if="errors.email">{{ errors.email }}</small>
      </label>

      <label>
        CPF
        <input
          v-model="form.cpf"
          v-imask="cpfMask"
          type="text"
          :maxlength="14"
          placeholder="413.871.851-60"
        />
        <small class="error" v-if="errors.cpf">{{ errors.cpf }}</small>
      </label>

      <label>
        Telefone
        <input
          v-model="form.phone"
          v-imask="phoneMask"
          type="tel"
          placeholder="(42) 99999-9999"
        />
        <small class="error" v-if="errors.phone">{{ errors.phone }}</small>
      </label>

      <div class="modal-footer">
        <button
          type="button"
          class="btn-primary btn-primary--outlined"
          @click="closeModal"
        >
          Cancelar
        </button>
        <button
          type="submit"
          :class="isLoading ? 'btn-primary btn-primary--loading' : 'btn-primary'"
        >
          <FontAwesomeIcon v-if="isLoading" :icon="faSpinner" />
          {{ props.editMode ? 'Salvar usuário' : 'Cadastrar' }}
        </button>
      </div>
    </form>
  </Modal>
</template>