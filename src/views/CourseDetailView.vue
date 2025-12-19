<template>
  <div class="course-detail-view">
    <div class="container">
      <div v-if="course" class="course-detail">
        <div class="course-header">
          <img :src="course.image" :alt="course.name" />
          <div class="course-header-content">
            <span :class="['level-badge', `level-badge--${course.level}`]">
              {{ levelText }}
            </span>
            <h1>{{ course.name }}</h1>
            <p class="course-description">{{ course.description }}</p>
          </div>
        </div>
        
        <div class="course-body">
          <div class="course-info-section">
            <h2>Informácie o kurze</h2>
            <div class="info-grid">
              <div class="info-item">
                <strong>Trvanie:</strong>
                <span class="info-value" >{{ course.duration }}</span>
              </div>
              <div class="info-item">
                <strong>Maximálny počet študentov:</strong>
                <span class="info-value">{{ course.maxStudents }}</span>
              </div>
              <div class="info-item">
                <strong>Úroveň:</strong>
                <span class="info-value">{{ levelText }}</span>
              </div>
              <div class="info-item">
                <strong>Cena:</strong>
                <span class="price">{{ course.price }}€</span>
              </div>
            </div>
          </div>
          
          <div v-if="instructor" class="instructor-section">
            <h2>Váš inštruktor</h2>
            <InstructorCard :instructor="instructor" @show-courses="showInstructorCourses"/>
          </div>
          
          <div class="action-section">
            <BaseButton @click="bookCourse">
              Rezervovať kurz
            </BaseButton>
            <BaseButton variant="outline" @click="goBack">
              Späť na kurzy
            </BaseButton>
          </div>
        </div>
      </div>
      
      <div v-else class="not-found">
        <h2>Kurz nebol nájdený</h2>
        <BaseButton @click="goBack">
          Späť na kurzy
        </BaseButton>
      </div>
    </div>
    <BaseModal 
      :is-open="isModalOpen" 
      :title="modalTitle"
      @close="closeModal"
    >
      <div v-if="selectedInstructorCourses.length > 0" class="modal-courses">
        <div 
          v-for="course in selectedInstructorCourses" 
          :key="course.id"
          class="modal-course-item"
        >
          <h4>{{ course.name }}</h4>
          <p>{{ course.description }}</p>
          <div class="course-meta">
            <span>{{ course.duration }}</span>
            <span class="price">{{ course.price }}€</span>
          </div>
          <BaseButton 
            variant="outline" 
            @click="goToCourse(course.id)"
          >
            Zobraziť detail
          </BaseButton>
        </div>
      </div>
      <div v-else>
        <p>Tento inštruktor momentálne nevyučuje žiadne kurzy.</p>
      </div>
    </BaseModal>
  </div>
</template>

<script>
import { useCoursesStore } from '@/stores/coursesStore'
import { useReservationStore } from '@/stores/reservationStore'
import InstructorCard from '@/components/InstructorCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseModal from '@/components/base/BaseModal.vue'

export default {
  name: 'CourseDetailView',
  
  components: {
    InstructorCard,
    BaseButton,
    BaseModal
  },
  
  data() {
    return {
      coursesStore: null,
      reservationStore: null,
      isModalOpen: false,
      selectedInstructorId: null
    }
  },
  
  computed: {
    course() {
      return this.coursesStore?.getCourseById(this.$route.params.id)
    },
    
    instructor() {
      if (!this.course) return null
      return this.coursesStore?.getInstructorById(this.course.instructorId)
    },

    selectedInstructor() {
      if (!this.selectedInstructorId) return null
      return this.coursesStore?.getInstructorById(this.selectedInstructorId)
    },

    selectedInstructorCourses() {
      if (!this.selectedInstructorId) return []
      return this.coursesStore?.getCoursesByInstructor(this.selectedInstructorId) || []
    },
    
    modalTitle() {
      return this.instructor 
        ? `Kurzy - ${this.instructor.name}` 
        : 'Kurzy inštruktora'
    },
    
    levelText() {
      if (!this.course) return ''
      const levels = {
        beginner: 'Začiatočník',
        intermediate: 'Mierne pokročilý',
        advanced: 'Pokročilý',
        professional: 'Profesionál'
      }
      return levels[this.course.level] || this.course.level
    }
  },
  
  created() {
    this.coursesStore = useCoursesStore()
    this.reservationStore = useReservationStore()
  },
  
  methods: {
    showInstructorCourses(instructorId) {
      this.selectedInstructorId = instructorId
      this.isModalOpen = true
    },
    
    closeModal() {
      this.isModalOpen = false
      setTimeout(() => {
        this.selectedInstructorId = null
      }, 300)
    },
    
    goToCourse(courseId) {
      this.closeModal()
      this.$router.push({ name: 'course-detail', params: { id: courseId } })
    },

    bookCourse() {
      this.reservationStore.setCurrentReservation(this.course.id)
      this.$router.push({ name: 'reservation', params: { courseId: this.course.id } })
    },
    
    goBack() {
      this.$router.push('/courses')
    }
  }
}
</script>

<style scoped>
.course-detail-view {
  min-height: 70vh;
}

.course-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.course-header img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.course-header-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.level-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
  width: fit-content;
}

.level-badge--beginner {
  background: #28a745;
}

.level-badge--intermediate {
  background: #ffc107;
}

.level-badge--advanced {
  background: #ff5722;
}

.level-badge--professional {
  background: #9c27b0;
}

.course-header-content h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.course-description {
  font-size: 1.125rem;
  color: #666;
  line-height: 1.8;
}

.info-value {
  color: #333;
  font-weight: 600;
}

.course-body {
  display: grid;
  gap: 2rem;
}

.course-info-section,
.instructor-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.75rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.info-item strong {
  color: #666;
}

.price {
  color: #0066cc;
  font-weight: 700;
  font-size: 1.25rem;
}

.action-section {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.not-found h2 {
  margin-bottom: 2rem;
  color: #666;
}

.modal-courses {
  display: grid;
  gap: 1.5rem;
}

.modal-course-item {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #0066cc;
}

.modal-course-item h4 {
  color: #0066cc;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.modal-course-item p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}

.course-meta .price {
  color: #0066cc;
  font-weight: 700;
  font-size: 1.25rem;
}

@media (max-width: 968px) {
  .course-header {
    grid-template-columns: 1fr;
  }
  
  .action-section {
    flex-direction: column;
  }
}
</style>