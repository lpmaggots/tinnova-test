<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
  defineProps(['show'])

  const emit = defineEmits(['close'])
  const close = () => emit('close')
</script>

<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <header class="modal-header">
        <slot name="header">
          <h2>Modal</h2>
        </slot>
        <button class="close-btn" @click="close">
          <FontAwesomeIcon :icon="faCircleXmark" />
        </button>
      </header>
      <main class="modal-body">
        <slot />
      </main>
      <footer class="modal-footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>