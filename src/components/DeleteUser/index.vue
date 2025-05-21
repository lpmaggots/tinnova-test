<script setup>
  import { ref } from 'vue'
  import Modal from '@/components/Modal/index.vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
  
  const storeKey = '@users-tinnnova'
  const showModal = ref(false)

  const props = defineProps({
    index: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  })
  const emit = defineEmits(['update-store'])

  const closeModal = () => {
    showModal.value = false
  }
  const openModal = () => {
    showModal.value = true
  }
  const handleDelete = () => {
    let parsed = []
    let usersStorage = localStorage.getItem(storeKey)
    parsed = JSON.parse(usersStorage) || []
    
    parsed.splice(props.index, 1)
    
    localStorage.setItem(storeKey, JSON.stringify(parsed))
    emit('update-store')
    closeModal()
  }
</script>

<template>
  <button
    title="Delete"
    class="btn-icon"
    @click="openModal"
  >
    <FontAwesomeIcon :icon="faTrashCan" />
  </button>

  <Modal v-if="showModal" @close="closeModal">
    <template #header>
      <h2>Apagar usuário</h2>
    </template>
    <p>
      Tem certeza que deseja deletar o usuário <b>{{ name }}</b>?
    </p>
    <div class="modal-footer">
      <button
        type="button"
        class="btn-primary btn-primary--outlined"
        @click="closeModal"
      >
        Cancelar
      </button>
      <button
        @click="handleDelete"
        type="submit"
        class="btn-error"
      >
        Deletar
      </button>
    </div>
  </Modal>
</template>