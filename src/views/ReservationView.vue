<template>
  <div class="reservation-view">
    <div class="container">
      <h1>Rezervácia kurzu</h1>

      <div v-if="isAlreadyRegistered && !isSubmitting" class="already-registered">
        <div class="warning-icon">⚠️</div>
        <h2>Tento kurz už máte rezervovaný</h2>
        <p>Kurz <strong>{{ selectedCourse?.name }}</strong> ste si už zarezervovali.</p>
        <div class="warning-details">
          <p><strong>Počet účastníkov:</strong> {{ existingRegistration?.participants }}</p>
          <p v-if="existingRegistration?.preferredDate">
            <strong>Začiatok kurzu:</strong> {{ formatDate(existingRegistration.preferredDate) }}
          </p>
          <p><strong>Zaregistrované:</strong> {{ formatDate(existingRegistration?.registeredAt) }}</p>
        </div>
        <div class="warning-actions">
          <BaseButton @click="goToMyCourses">
            Zobraziť moje kurzy
          </BaseButton>
          <BaseButton variant="outline" @click="goToCourses">
            Vybrať iný kurz
          </BaseButton>
        </div>
      </div>

      <div v-else-if="!reservationSubmitted" class="reservation-form-container">
        <div v-if="selectedCourse" class="course-summary">
          <h2>Vybraný kurz</h2>
          <div class="course-info">
            <h3>{{ selectedCourse.name }}</h3>
            <p>{{ selectedCourse.description }}</p>
            <div class="course-details">
              <span><strong>Trvanie:</strong> {{ selectedCourse.duration }}</span>
              <span><strong>Cena:</strong> {{ selectedCourse.price }}€</span>
              <span><strong>Max. študentov:</strong> {{ selectedCourse.maxStudents }}</span>
            </div>
          </div>
        </div>
        
        <form @submit.prevent="submitReservation" class="reservation-form">
          <h2>Vaše údaje</h2>
          
          <div v-if="!selectedCourse" class="form-group">
            <label for="course-select">Vyberte kurz *</label>
            <select 
              id="course-select"
              v-model="formData.courseId"
              required
              @change="handleCourseChange"
            >
              <option value="">-- Vyberte kurz --</option>
              <option 
                v-for="course in availableCourses" 
                :key="course.id"
                :value="course.id"
              >
                {{ course.name }} ({{ course.price }}€)
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="student-name">Meno a priezvisko *</label>
            <input 
              id="student-name"
              type="text" 
              v-model="formData.studentName"
              required
              placeholder="Vaše meno a priezvisko"
            />
          </div>
          
          <div class="form-group">
            <label for="student-email">Email *</label>
            <input 
              id="student-email"
              type="email" 
              v-model="formData.studentEmail"
              required
              placeholder="vas@email.com"
            />
          </div>
          
          <div class="form-group">
            <label for="student-phone">Telefónne číslo *</label>
            <input 
              id="student-phone"
              type="tel" 
              v-model="formData.studentPhone"
              required
              placeholder="+421 XXX XXX XXX"
            />
          </div>
          
          <div class="form-group">
            <label for="preferred-date">Preferovaný dátum začiatku *</label>
            <input 
              id="preferred-date"
              type="date" 
              v-model="formData.preferredDate"
              required
              :min="minDate"
            />
          </div>
          
          <div class="form-group">
            <label for="participants">Počet účastníkov *</label>
            <input 
              id="participants"
              type="number" 
              v-model.number="formData.participants"
              required
              min="1"
              :max="selectedCourse?.maxStudents || 10"
            />
            <small v-if="selectedCourse">
              Maximum: {{ selectedCourse.maxStudents }} účastníkov
            </small>
          </div>
          
          <div class="form-group">
            <label for="notes">Poznámka (voliteľné)</label>
            <textarea 
              id="notes"
              v-model="formData.notes"
              rows="4"
              placeholder="Máte nejaké špeciálne požiadavky alebo otázky?"
            ></textarea>
          </div>
          
          <div v-if="selectedCourse" class="total-price">
            <strong>Celková cena:</strong>
            <span>{{ totalPrice }}€</span>
          </div>
          
          <div class="form-actions">
            <BaseButton type="submit" :disabled="!isFormValid">
              Odoslať rezerváciu
            </BaseButton>
            <BaseButton variant="outline" @click="cancelReservation">
              Zrušiť
            </BaseButton>
          </div>
        </form>
      </div>
      
      <div v-else class="confirmation">
        <div class="confirmation-icon">✓</div>
        <h2>Rezervácia bola úspešne odoslaná!</h2>
        <p>Ďakujeme za vašu rezerváciu. Na váš email sme odoslali potvrdenie.</p>
        <div class="confirmation-details">
          <h3>Detaily rezervácie:</h3>
          <p><strong>Kurz:</strong> {{ submittedReservation.courseName }}</p>
          <p><strong>Dátum:</strong> {{ formatDate(submittedReservation.preferredDate) }}</p>
          <p><strong>Počet účastníkov:</strong> {{ submittedReservation.participants }}</p>
          <p><strong>Celková cena:</strong> {{ submittedReservation.totalPrice }}€</p>
        </div>
        <div class="confirmation-actions">
          <BaseButton @click="goToCourses">
            Späť na kurzy
          </BaseButton>
          <BaseButton variant="outline" @click="makeAnotherReservation">
            Vytvoriť ďalšiu rezerváciu
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCoursesStore } from '@/stores/coursesStore'
import { useReservationStore } from '@/stores/reservationStore'
import BaseButton from '@/components/base/BaseButton.vue'
import { useAuthStore } from '@/stores/authStore'

import { useRegistrationStore } from '@/stores/registrationStore'

export default {
  name: 'ReservationView',
  
  components: {
    BaseButton
  },
  
  data() {
    return {
      authStore: null,
      coursesStore: null,
      reservationStore: null,
      registrationStore: null,
      reservationSubmitted: false,
      submittedReservation: null,
      isSubmitting: false,
      formData: {
        courseId: null,
        studentName: '',
        studentEmail: '',
        studentPhone: '',
        preferredDate: '',
        participants: 1,
        notes: ''
      }
    }
  },
  
  computed: {
    availableCourses() {
      return this.coursesStore?.courses || []
    },
    
    selectedCourse() {
      if (!this.formData.courseId) return null
      return this.coursesStore?.getCourseById(this.formData.courseId)
    },

    isAlreadyRegistered() {
      if (!this.authStore?.isLoggedIn || !this.formData.courseId) {
        return false
      }
      
      return this.registrationStore.isUserRegistered(
        this.authStore.user.id,
        this.formData.courseId
      )
    },
    
    existingRegistration() {
      if (!this.isAlreadyRegistered) return null
      
      return this.registrationStore.getRegistrationDetails(
        this.authStore.user.id,
        this.formData.courseId
      )
    },
    
    totalPrice() {
      if (!this.selectedCourse) return 0
      return this.selectedCourse.price * this.formData.participants
    },
    
    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },
    
    isFormValid() {
      return this.formData.courseId &&
             this.formData.studentName.trim() !== '' &&
             this.formData.studentEmail.trim() !== '' &&
             this.formData.studentPhone.trim() !== '' &&
             this.formData.preferredDate !== '' &&
             this.formData.participants > 0
    }
  },

  created() {
     this.authStore = useAuthStore()
    this.coursesStore = useCoursesStore()
    this.reservationStore = useReservationStore()
    this.registrationStore = useRegistrationStore()
    
    this.authStore.checkAuth()

    const courseId = this.$route.params.courseId
    if (courseId) {
      this.formData.courseId = parseInt(courseId)
    }

    if (this.authStore.isLoggedIn && this.authStore.user) {
      this.formData.studentName = this.authStore.user.name || ''
      this.formData.studentEmail = this.authStore.user.email || ''
    }
  },
  
  methods: {
    handleCourseChange() {
      if (this.selectedCourse && this.formData.participants > this.selectedCourse.maxStudents) {
        this.formData.participants = this.selectedCourse.maxStudents
      }
    },

      validateForm() {
      if (!this.isFormValid) {
        alert('Prosím vyplňte všetky povinné polia.')
        return false
      }
      
      if (this.selectedCourse && this.formData.participants > this.selectedCourse.maxStudents) {
        alert(`Maximálny počet účastníkov je ${this.selectedCourse.maxStudents}.`)
        return false
      }
      
      return true
    },
    
    submitReservation() {

      if (!this.validateForm()) return

      this.isSubmitting = true

      try {
        this.reservationStore.updateReservationField('courseId', this.formData.courseId)
        this.reservationStore.updateReservationField('studentName', this.formData.studentName)
        this.reservationStore.updateReservationField('studentEmail', this.formData.studentEmail)
        this.reservationStore.updateReservationField('studentPhone', this.formData.studentPhone)
        this.reservationStore.updateReservationField('preferredDate', this.formData.preferredDate)
        this.reservationStore.updateReservationField('participants', this.formData.participants)
        this.reservationStore.updateReservationField('notes', this.formData.notes)
        
        const reservation = this.reservationStore.submitReservation()
        this.submittedReservation = reservation

     if (this.authStore.isLoggedIn && this.selectedCourse) {
          this.registrationStore.addRegistration(
            this.authStore.user.id,
            this.selectedCourse.id,
            this.formData.participants, 
            this.formData.preferredDate   
          )
        }
        
        this.reservationSubmitted = true

        window.scrollTo({ top: 0, behavior: 'smooth' })
        
      } catch (error) {
        console.error('❌ ERROR:', error)
        alert('Nastala chyba pri odosielaní rezervácie.')
        this.isSubmitting = false
      }
    },

    cancelReservation() {
      this.$router.push('/courses')
    },
    
    makeAnotherReservation() {
      this.reservationSubmitted = false
      this.submittedReservation = null
      this.isSubmitting = false
      this.formData = {
        courseId: null,
        studentName: '',
        studentEmail: '',
        studentPhone: '',
        preferredDate: '',
        participants: 1,
        notes: ''
      }
    },
    
    goToCourses() {
      this.$router.push('/courses')
    },

    goToMyCourses() {
      this.$router.push('/my-courses')
    },
    
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('sk-SK', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
  }}

</script>

<style scoped>
.reservation-view {
  min-height: 70vh;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 3rem;
}

.already-registered {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  background: white;
  padding: 3rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 3px solid #ffc107;
}

.warning-icon {
  width: 80px;
  height: 80px;
  background: #ffc107;
  color: white;
  font-size: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
}

.already-registered h2 {
  color: #ff9800;
  margin-bottom: 1rem;
}

.already-registered > p {
  color: #666;
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.warning-details {
  text-align: left;
  background: #fff8e1;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  border-left: 4px solid #ffc107;
}

.warning-details p {
  color: #666;
  margin-bottom: 0.5rem;
}

.warning-details p:last-child {
  margin-bottom: 0;
}

.warning-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.reservation-form-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.course-summary {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.course-summary h2 {
  color: #0066cc;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.course-info h3 {
  color: #333;
  margin-bottom: 1rem;
}

.course-info p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.course-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.course-details span {
  color: #666;
}

.reservation-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.reservation-form h2 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0066cc;
}

.form-group small {
  display: block;
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.875rem;
}

.total-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.total-price span {
  color: #0066cc;
  font-weight: 700;
  font-size: 1.5rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
}

.confirmation {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  background: white;
  padding: 3rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.confirmation-icon {
  width: 80px;
  height: 80px;
  background: #28a745;
  color: white;
  font-size: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
}

.confirmation h2 {
  color: #28a745;
  margin-bottom: 1rem;
}

.confirmation > p {
  color: #666;
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.confirmation-details {
  text-align: left;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.confirmation-details h3 {
  color: #333;
  margin-bottom: 1rem;
}

.confirmation-details p {
  color: #666;
  margin-bottom: 0.5rem;
}

.confirmation-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

@media (max-width: 968px) {
  .reservation-form-container {
    grid-template-columns: 1fr;
  }
  
  .course-summary {
    position: static;
  }
  
  .form-actions,
  .confirmation-actions {
    flex-direction: column;
  }
}
</style>