<template>
  <div class="course-card">
    <div class="course-image">
      <img :src="courseImage" :alt="course.name" @error="handleImageError" />
      <span :class="['level-badge', `level-badge--${course.level}`]">
        {{ levelText }}
      </span>
    </div>
    
    <div class="course-content">
      <h3>{{ course.name }}</h3>
      <p class="course-description">{{ course.description }}</p>
      
      <div class="course-info">
        <div class="info-item">
          <span class="icon">⏱️</span>
          <span>{{ course.duration }}</span>
        </div>
        <div class="info-item">
          <span class="icon">👥</span>
          <span>Max {{ course.maxStudents }} študentov</span>
        </div>
      </div>
      
      <div class="course-footer">
        <div class="price">{{ course.price }}€</div>
        <BaseButton @click="handleViewDetails">
          Detail kurzu
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from './base/BaseButton.vue'

export default {
  name: 'CourseCard',
  
  components: {
    BaseButton
  },
  
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  
  data() {
    return {
      imageError: false
    }
  },
  
  computed: {
    levelText() {
      const levels = {
        beginner: 'Začiatočník',
        intermediate: 'Mierne pokročilý',
        advanced: 'Pokročilý',
        professional: 'Profesionál'
      }
      return levels[this.course.level] || this.course.level
    },
    
    courseImage() {
      if (this.imageError || !this.course.image) {
        return null
      }
      return this.course.image
    }
  },
  
  methods: {
    handleViewDetails() {
      this.$router.push({ name: 'course-detail', params: { id: this.course.id } })
    },
    
    handleImageError(event) {
      console.warn(`Obrázok sa nepodarilo načítať: ${this.course.image}`)
      this.imageError = true
    }
  }
}
</script>

<style scoped>
.course-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.course-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.course-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.level-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  backdrop-filter: blur(10px);
}

.level-badge--beginner {
  background: rgba(40, 167, 69, 0.9);
}

.level-badge--intermediate {
  background: rgba(255, 193, 7, 0.9);
}

.level-badge--advanced {
  background: rgba(255, 87, 34, 0.9);
}

.level-badge--professional {
  background: rgba(156, 39, 176, 0.9);
}

.course-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.course-content h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.5rem;
}

.course-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
}

.course-info {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.875rem;
}

.icon {
  font-size: 1.25rem;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0066cc;
}
</style>