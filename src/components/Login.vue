<template>
  <BaseModal :is-open="isOpen" title="Prihlásenie" @close="closeModal">
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          placeholder="vas@email.com"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="password">Heslo</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          placeholder="Vaše heslo"
          required
        />
      </div>
      
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <div class="form-actions">
        <BaseButton type="submit">Prihlásiť sa</BaseButton>
        <BaseButton variant="outline" @click="closeModal">Zrušiť</BaseButton>
      </div>
      
      <p class="demo-info">
        💡 Demo režim: Použite akýkoľvek email a heslo
      </p>
    </form>
  </BaseModal>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'
import BaseModal from './base/BaseModal.vue'
import BaseButton from './base/BaseButton.vue'

export default {
  name: 'LoginModal',
  
  components: {
    BaseModal,
    BaseButton
  },
  
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      authStore: null
    }
  },
  
  created() {
    this.authStore = useAuthStore()
  },
  
  methods: {
    handleLogin() {
      this.errorMessage = ''
      
      const success = this.authStore.login(this.email, this.password)
      
      if (success) {
        this.$emit('login-success')
        this.closeModal()
      } else {
        this.errorMessage = 'Chyba pri prihlasovaní'
      }
    },
    
    closeModal() {
      this.email = ''
      this.password = ''
      this.errorMessage = ''
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
}

.form-group input {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #0066cc;
}

.error-message {
  padding: 0.75rem;
  background: #ffebee;
  color: #c62828;
  border-radius: 8px;
  font-size: 0.875rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.demo-info {
  text-align: center;
  color: #666;
  font-size: 0.875rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  margin: 0;
}
</style>