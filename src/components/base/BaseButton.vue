<template>
  <button 
    :class="['base-button', `base-button--${variant}`, { 'base-button--disabled': disabled }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'danger', 'outline'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style scoped>
.base-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.base-button--primary {
  background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
  color: white;
}

.base-button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.4);
}

.base-button--secondary {
  background: #6c757d;
  color: white;
}

.base-button--secondary:hover {
  background: #5a6268;
}

.base-button--success {
  background: #28a745;
  color: white;
}

.base-button--success:hover {
  background: #218838;
}

.base-button--danger {
  background: #dc3545;
  color: white;
}

.base-button--danger:hover {
  background: #c82333;
}

.base-button--outline {
  background: transparent;
  border: 2px solid #0066cc;
  color: #0066cc;
}

.base-button--outline:hover {
  background: #0066cc;
  color: white;
}

.base-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.base-button--disabled:hover {
  transform: none;
  box-shadow: none;
}

.btn--danger {
  background: #dc3545;
  color: white;
  border: 2px solid #dc3545;
}

.btn--danger:hover {
  background: #c82333;
  border-color: #c82333;
}
</style>