<template>
  <div class="instructors-view">
    <div class="container">
      <h1>Naši certifikovaní inštruktori</h1>
      <p class="subtitle">Zoznámte sa s našim skúseným tímom profesionálnych potápačských inštruktorov</p>
      
      <div class="instructors-grid">
        <InstructorCard 
          v-for="instructor in instructors" 
          :key="instructor.id"
          :instructor="instructor"
          @show-courses="showInstructorCourses"
        />
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
import InstructorCard from '@/components/InstructorCard.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseButton from '@/components/base/BaseButton.vue'

export default {
  name: 'InstructorsView',
  
  components: {
    InstructorCard,
    BaseModal,
    BaseButton
  },
  
  data() {
    return {
      coursesStore: null,
      isModalOpen: false,
      selectedInstructorId: null
    }
  },
  
  computed: {
    instructors() {
      return this.coursesStore?.instructors || []
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
      return this.selectedInstructor 
        ? `Kurzy - ${this.selectedInstructor.name}` 
        : 'Kurzy inštruktora'
    }
  },
  
  created() {
    this.coursesStore = useCoursesStore()
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
    }
  }
}
</script>

<style scoped>
.instructors-view {
  min-height: 70vh;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.subtitle {
  text-align: center;
  font-size: 1.125rem;
  color: #666;
  margin-bottom: 3rem;
}

.instructors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

/* Modal Styles */
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

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  
  .instructors-grid {
    grid-template-columns: 1fr;
  }
}
</style>