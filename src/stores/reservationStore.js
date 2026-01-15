import { defineStore } from 'pinia'
import { useCoursesStore } from './coursesStore'

export const useReservationStore = defineStore('reservation', {
  state: () => ({
    reservations: [],
    currentReservation: {
      courseId: null,
      studentName: '',
      studentEmail: '',
      studentPhone: '',
      preferredDate: '',
      participants: 1,
      notes: ''
    }
  }),
  
  getters: {
    reservationCount: (state) => state.reservations.length,
    
    getReservationById: (state) => (id) => {
      return state.reservations.find(res => res.id === id)
    },
  },
  
  actions: {
    setCurrentReservation(courseId) {
      this.currentReservation.courseId = courseId
    },
    
    updateReservationField(field, value) {
      this.currentReservation[field] = value
    },
    
    submitReservation() {
      const coursesStore = useCoursesStore()
      const course = coursesStore.getCourseById(this.currentReservation.courseId)
      
      if (!course) {
        throw new Error('Kurz nebol najdený')
      }
      
      const reservation = {
        id: Date.now(),
        ...this.currentReservation,
        courseName: course.name,
        coursePrice: course.price,
        totalPrice: course.price * this.currentReservation.participants,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      
      this.reservations.push(reservation)
      this.resetCurrentReservation()
      
      return reservation
    },
    
    resetCurrentReservation() {
      this.currentReservation = {
        courseId: null,
        studentName: '',
        studentEmail: '',
        studentPhone: '',
        preferredDate: '',
        participants: 1,
        notes: ''
      }
    },
  }
})