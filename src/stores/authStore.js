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
        this.user = {
          id: 1,
          email: email,
          name: email.split('@')[0],
          registeredCourses: [] 
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
    
    addCourseToUser(courseId) {
      if (this.user) {
        if (!this.user.registeredCourses.includes(courseId)) {
          this.user.registeredCourses.push(courseId)
          localStorage.setItem('user', JSON.stringify(this.user))
        }
      }
    },
    
    removeCourseFromUser(courseId) {
      if (this.user) {
        this.user.registeredCourses = this.user.registeredCourses.filter(id => id !== courseId)
        localStorage.setItem('user', JSON.stringify(this.user))
      }
    }
  }
})