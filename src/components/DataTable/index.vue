<script setup>
  import { ref, computed, onMounted } from 'vue'
  import RegisterUser from '@/components/RegisterUser/index.vue'
  import DeleteUser from '@/components/DeleteUser/index.vue'
  import users from '@/data/users.json'

  const storeKey = '@users-tinnnova'
  const usersStorage = ref([])

  const formatCpf = (cpf) => {
    if (!cpf) return '';
    return String(cpf).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
  }

  const formatPhone = (phone) => {
    if(!phone) return ''

    const digits = String(phone).replace(/\D/g, '')
    if(digits.length === 11) {
      return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
    }else if (digits.length === 10) {
      return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
    }else {
      return phone;
    }
  }

  onMounted(() => {
    getStore()
  })

  const list = computed(() => usersStorage.value)

  const getStore = () => {
    const stored = localStorage.getItem(storeKey)
    let parsed = []

    if(stored) {
      try{
        parsed = JSON.parse(stored)
      }catch (e) {
        console.warn('Erro ao parsear store, resetando:', e)
        parsed = []
      }
    }
    
    if(!parsed.length) {
      parsed = users
      localStorage.setItem(storeKey, JSON.stringify(users))
    }
    usersStorage.value = parsed
  }
</script>

<template>
  <RegisterUser @update-store="getStore()" />
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>CPF</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in list" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ formatCpf(user.cpf) }}</td>
          <td>{{ formatPhone(user.phone) }}</td>
          <td>
            <div class="actions">
              <RegisterUser
                @update-store="getStore()"
                :index="index"
                edit-mode
              />
              <DeleteUser
                @update-store="getStore()"
                :index="index"
                :name="user.name"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>