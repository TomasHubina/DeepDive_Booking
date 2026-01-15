import { defineStore } from 'pinia'

export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    registrations: []
  }),
  
  getters: {
    getRegistrationsByUser: (state) => (userId) => {
      return state.registrations.filter(reg => reg.userId === userId)
    },
    
    getUserCourseIds: (state) => (userId) => {
      return state.registrations
        .filter(reg => reg.userId === userId)
        .map(reg => reg.courseId)
    },

    getRegistrationDetails: (state) => (userId, courseId) => {
      return state.registrations.find(
        reg => reg.userId === userId && reg.courseId === courseId
      )
    },
    
    isUserRegistered: (state) => (userId, courseId) => {
      return state.registrations.some(
        reg => reg.userId === userId && reg.courseId === courseId
      )
    }
  },

  actions: {
    loadRegistrations() {
      const saved = localStorage.getItem('course_registrations')
      if (saved) {
        this.registrations = JSON.parse(saved)
      }
    },
    
    saveRegistrations() {
      localStorage.setItem('course_registrations', JSON.stringify(this.registrations))
    },

    addRegistration(userId, courseId, participants = 1, preferredDate = null) {
      if (this.isUserRegistered(userId, courseId)) {
        return
      }
      
      const registration = {
        id: Date.now(),
        userId: userId,
        courseId: courseId,
        participants: participants,
        preferredDate: preferredDate,
        registeredAt: new Date().toISOString()
      }
      
      this.registrations.push(registration)
      this.saveRegistrations()
    },

    removeRegistration(userId, courseId) {
      this.registrations = this.registrations.filter(
        reg => !(reg.userId === userId && reg.courseId === courseId)
      )
      this.saveRegistrations()
    }
  }
})