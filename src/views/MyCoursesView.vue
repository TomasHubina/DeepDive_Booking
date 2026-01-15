<template>
  <div class="my-courses-view">
    <div class="container">
      <h1>Moje kurzy</h1>
      
      <div v-if="!authStore.isLoggedIn" class="not-logged-in">
        <p>Pre zobrazenie svojich kurzov sa musíte prihlásiť.</p>
        <BaseButton @click="$router.push('/')">Späť na domov</BaseButton>
      </div>
      
      <div v-else>
        <div class="user-info">
          <h2>Vitajte, {{ authStore.user?.name }}!</h2>
          <p class="user-email">{{ authStore.user?.email }}</p>
        </div>
        
        <div v-if="registeredCourses.length === 0" class="empty-state">
          <h3>Zatiaľ nemáte žiadne zaregistrované kurzy</h3>
          <p>Prezrite si našu ponuku kurzov a zaregistrujte sa!</p>
          <BaseButton @click="$router.push('/courses')">Zobraziť kurzy</BaseButton>
        </div>
        
        <div v-else class="courses-section">
          <h3>Registrované kurzy ({{ registeredCourses.length }})</h3>
          
          <div class="courses-grid">
            <div 
              v-for="(courseData) in registeredCourses"  
              :key="courseData.course.id"
              class="course-card-wrapper"
            > 
              <CourseCard :course="courseData.course" />
              
              <div class="registration-info">
                <div class="info-row">
                  <span class="icon">👥</span>
                  <span><strong>Počet účastníkov:</strong> {{ courseData.participants }}</span>
                </div>
                <div class="info-row">
                  <span class="icon">💰</span>
                  <span><strong>Celková cena:</strong> {{ courseData.totalPrice }}€</span>
                </div>
              <div v-if="courseData.preferredDate" class="info-row">
                <span class="icon">🗓️</span>
                <span><strong>Začiatok kurzu:</strong> {{ formatDate(courseData.preferredDate) }}</span>
              </div>
                <div class="info-row">
                  <span class="icon">📅</span>
                  <span><strong>Registrovaný:</strong> {{ formatDate(courseData.registeredAt) }}</span>
                </div>
              </div>
              
              <div class="course-actions">
                <BaseButton 
                  variant="outline" 
                  @click="viewCourseDetail(courseData.course.id)"
                >
                  Zobraziť detail
                </BaseButton>
                <BaseButton 
                  variant="danger" 
                  @click="cancelCourse(courseData.course.id)"
                >
                  Zrušiť kurz
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'
import { useCoursesStore } from '@/stores/coursesStore'
import { useRegistrationStore } from '@/stores/registrationStore'
import CourseCard from '@/components/CourseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'

export default {
  name: 'MyCoursesView',
  
  components: {
    CourseCard,
    BaseButton
  },
  
  data() {
    return {
      authStore: null,
      coursesStore: null,
      registrationStore: null
    }
  },

  computed: {
    registeredCourses() {
      
      if (!this.authStore?.user) return []
      
      const registrations = this.registrationStore.getRegistrationsByUser(this.authStore.user.id)
      
      const coursesWithDetails = registrations
        .map(registration => {
          const course = this.coursesStore.getCourseById(registration.courseId)
          if (!course) return null
          
          return {
            course: course,
            participants: registration.participants,
            totalPrice: course.price * registration.participants,
            preferredDate: registration.preferredDate,
            registeredAt: registration.registeredAt
          }
        })
        .filter(item => item !== null)
      
      return coursesWithDetails
    }
  },

  created() {
    this.authStore = useAuthStore()
    this.coursesStore = useCoursesStore()
    this.registrationStore = useRegistrationStore()
    
    this.authStore.checkAuth()
  },
  
  methods: {
    viewCourseDetail(courseId) {
      this.$router.push({ name: 'course-detail', params: { id: courseId } })
    },
    
    cancelCourse(courseId) {
      if (confirm('Naozaj chcete zrušiť tento kurz?')) {
        this.registrationStore.removeRegistration(this.authStore.user.id, courseId) 
      }
    },

      formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('sk-SK', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })

    }
  }
}
</script>

<style scoped>
.my-courses-view {
  min-height: 70vh;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
}

.user-info {
  background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 3rem;
  text-align: center;
}

.user-info h2 {
  margin-bottom: 0.5rem;
}

.user-email {
  opacity: 0.9;
  font-size: 1.125rem;
}

.not-logged-in,
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.not-logged-in p,
.empty-state p {
  margin-bottom: 2rem;
  color: #666;
  font-size: 1.125rem;
}

.empty-state h3 {
  color: #333;
  margin-bottom: 1rem;
}

.courses-section h3 {
  color: #333;
  margin-bottom: 2rem;
  font-size: 1.75rem;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.course-card-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.registration-info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #333;
  font-size: 0.95rem;
}

.info-row .icon {
  font-size: 1.25rem;
}

.info-row strong {
  color: #0066cc;
}

.course-actions {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
  }
  
  .course-actions {
    flex-direction: column;
  }
}
</style>