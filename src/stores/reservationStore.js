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
    
    totalRevenue: (state) => {
      const coursesStore = useCoursesStore()
      return state.reservations.reduce((total, reservation) => {
        const course = coursesStore.getCourseById(reservation.courseId)
        return total + (course?.price || 0) * reservation.participants
      }, 0)
    }
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
    
    cancelReservation(id) {
      const index = this.reservations.findIndex(res => res.id === id)
      if (index !== -1) {
        this.reservations[index].status = 'cancelled'
      }
    },
    
    deleteReservation(id) {
      const index = this.reservations.findIndex(res => res.id === id)
      if (index !== -1) {
        this.reservations.splice(index, 1)
      }
    }
  }
})