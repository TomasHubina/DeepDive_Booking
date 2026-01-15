import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),
  
  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated
  },
  
  actions: {
    login(email, password) {
      if (email && password) {
        let savedUsers = localStorage.getItem('users')
        let users = savedUsers ? JSON.parse(savedUsers) : []
        
        let existingUser = users.find(u => u.email === email)
        
        if (existingUser) {
          this.user = existingUser
        } else {
          this.user = {
            id: Date.now(),
            email: email,
            name: email.split('@')[0]
          }
          users.push(this.user)
          localStorage.setItem('users', JSON.stringify(users))
        }
        
        this.isAuthenticated = true
        localStorage.setItem('user', JSON.stringify(this.user))

        return true
      }
      return false
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('user')
    },
    
    checkAuth() {
      const userData = localStorage.getItem('user')
      if (userData) {
        this.user = JSON.parse(userData)
        this.isAuthenticated = true
      }
    },
  }
})