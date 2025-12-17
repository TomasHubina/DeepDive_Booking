<template>
  <div class="instructor-card">
    <div class="instructor-image">
      <img :src="instructor.image" :alt="instructor.name"/>
    </div>
    
    <div class="instructor-content">
      <h3>{{ instructor.name }}</h3>
      <p class="certification">{{ instructor.certification }}</p>
      
      <div class="instructor-details">
        <div class="detail-item">
          <span class="label">Skúsenosti: </span>
          <span class="value">{{ instructor.experience }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Špecializácia: </span>
          <span class="value">{{ instructor.specialization }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Hodnotenie: </span>
          <span class="value rating">
            {{ instructor.rating }} ⭐
          </span>
        </div>
        <div class="detail-item">
          <span class="label">Ukončených kurzov: </span>
          <span class="value">{{ instructor.coursesCount }}+</span>
        </div>
      </div>
      
      <BaseButton 
        variant="outline" 
        @click="showInstructorCourses"
      >
        Zobraziť kurzy
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from './base/BaseButton.vue'

export default {
  name: 'InstructorCard',
  
  components: {
    BaseButton
  },
  
  props: {
    instructor: {
      type: Object,
      required: true
    }
  },
  
  data() {
    return {
    }
  },

  methods: {
    showInstructorCourses() {
      this.$emit('show-courses', this.instructor.id)
    }
  }
}
</script>

<style scoped>
.instructor-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.instructor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.instructor-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.instructor-image img {
  width: 150px !important;
  height: 150px !important;
  border-radius: 50% !important;
  object-fit: cover !important;
  border: 4px solid white !important;
  display: block !important;
}

.instructor-content {
  padding: 1.5rem;
}

.instructor-content h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.5rem;
  text-align: center;
}

.certification {
  text-align: center;
  color: #0066cc;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.instructor-details {
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.detail-item:last-child {
  border-bottom: none;
}

.label {
  color: #666;
  font-weight: 500;
}

.value {
  color: #333;
  font-weight: 600;
}

.rating {
  color: #ffa500;
}
</style>