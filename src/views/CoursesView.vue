<template>
  <div class="courses-view">
    <div class="container">
      <h1>Naše potápačské kurzy</h1>
      <p class="subtitle">Vyberte si kurz podľa vašej úrovne a záujmu</p>
      
      <CourseFilter 
        @level-change="handleLevelChange"
        @search-change="handleSearchChange"
      />
      
      <div v-if="filteredCourses.length > 0" class="courses-grid">
        <CourseCard 
          v-for="course in filteredCourses" 
          :key="course.id"
          :course="course"
        />
      </div>
      
      <div v-else class="no-results">
        <p>Nenašli sa žiadne kurzy podľa zadaných kritérií.</p>
        <BaseButton variant="secondary" @click="resetFilters">
          Resetovať filter
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import { useCoursesStore } from '@/stores/coursesStore'
import CourseCard from '@/components/CourseCard.vue'
import CourseFilter from '@/components/CourseFilter.vue'
import BaseButton from '@/components/base/BaseButton.vue'

export default {
  name: 'CoursesView',
  
  components: {
    CourseCard,
    CourseFilter,
    BaseButton
  },
  
  data() {
    return {
      coursesStore: null,
      selectedLevel: 'all',
      searchTerm: ''
    }
  },
  
  computed: {
    filteredCourses() {
      let courses = this.coursesStore?.courses || []
      
      if (this.selectedLevel && this.selectedLevel !== 'all') {
        courses = courses.filter(course => course.level === this.selectedLevel)
      }
      
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase()
        courses = courses.filter(course => 
          course.name.toLowerCase().includes(term) ||
          course.description.toLowerCase().includes(term)
        )
      }
      
      return courses
    }
  },
  
  created() {
    this.coursesStore = useCoursesStore()
  },
  
  methods: {
    handleLevelChange(level) {
      this.selectedLevel = level
    },
    
    handleSearchChange(searchTerm) {
      this.searchTerm = searchTerm
    },
    
    resetFilters() {
      this.selectedLevel = 'all'
      this.searchTerm = ''
    }
  }
}
</script>

<style scoped>
.courses-view {
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
  margin-bottom: 2rem;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.no-results p {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
  }
}
</style>