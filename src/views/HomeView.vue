<template>
  <div class="home-view">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Vitajte v DeepDive</h1>
          <p class="hero-subtitle">
            Objavte podmorský svet s našimi profesionálnymi potápačskými kurzami
          </p>
          <div class="hero-actions">
            <BaseButton @click="navigateToCourses">
              Prehliadnuť kurzy
            </BaseButton>
            <BaseButton @click="navigateToInstructors">
              Naši inštruktori
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2>Prečo si vybrať nás?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🏆</div>
            <h3>Certifikovaní inštruktori</h3>
            <p>Všetci naši inštruktori majú medzinárodné certifikáty SDI</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🌊</div>
            <h3>Moderné vybavenie</h3>
            <p>Používame najnovšie a najkvalitnejšie potápačské vybavenie</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">👥</div>
            <h3>Malé skupiny</h3>
            <p>Maximum 4-8 študentov na kurz pre individuálny prístup</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📚</div>
            <h3>Komplexné kurzy</h3>
            <p>Od začiatočníkov až po profesionálne kurzy</p>
          </div>
        </div>
      </div>
    </section>

    <section class="popular-courses">
      <div class="container">
        <h2>Najpopulárnejšie kurzy</h2>
        <div class="courses-grid">
          <CourseCard 
            v-for="course in popularCourses" 
            :key="course.id"
            :course="course"
          />
        </div>
        <div class="text-center">
          <BaseButton variant="outline" @click="navigateToCourses">
            Zobraziť všetky kurzy
          </BaseButton>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">{{ totalCourses }}</div>
            <div class="stat-label">Rôznych kurzov</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ totalInstructors }}</div>
            <div class="stat-label">Certifikovaných inštruktorov</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">750+</div>
            <div class="stat-label">Spokojných študentov</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">15+</div>
            <div class="stat-label">Rokov skúseností</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useCoursesStore } from '@/stores/coursesStore'
import CourseCard from '@/components/CourseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'

export default {
  name: 'HomeView',
  
  components: {
    CourseCard,
    BaseButton
  },
  
  data() {
    return {
      coursesStore: null
    }
  },
  
  computed: {
    popularCourses() {
      return this.coursesStore?.courses.slice(0, 3) || []
    },
    
    totalCourses() {
      return this.coursesStore?.courses.length || 0
    },
    
    totalInstructors() {
      return this.coursesStore?.instructors.length || 0
    }
  },
  
  created() {
    this.coursesStore = useCoursesStore()
  },
  
  methods: {
    navigateToCourses() {
      this.$router.push('/courses')
    },
    
    navigateToInstructors() {
      this.$router.push('/instructors')
    }
  }
}
</script>

<style scoped>
.home-view {
  background: #f5f5f5;
}

.hero {
  background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* Features Section */
.features {
  padding: 4rem 0;
  background: white;
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  background: #f8f9fa;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #0066cc;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.popular-courses {
  padding: 4rem 0;
}

.popular-courses h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.text-center {
  text-align: center;
  margin-top: 2rem;
}

.stats {
  padding: 4rem 0;
  background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  text-align: center;
  padding: 2rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.125rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-actions {
    flex-direction: column;
  }
  
  .features h2,
  .popular-courses h2 {
    font-size: 2rem;
  }
}
</style>