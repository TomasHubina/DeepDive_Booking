<template>
  <div class="dive-log-card">
    <div class="dive-header">
      <div class="dive-number">Ponor #{{ index + 1 }}</div>
      <div class="dive-date">{{ formatDate(dive.date) }}</div>
    </div>
    
    <div class="dive-location">
      <span class="location-icon">📍</span>
      <h3>{{ dive.location }}</h3>
    </div>
    
    <div class="dive-stats">
      <div class="stat-item">
        <span class="stat-icon">⬇️</span>
        <div class="stat-content">
          <span class="stat-label">Hĺbka</span>
          <span class="stat-value">{{ dive.depth }}m</span>
        </div>
      </div>
      
      <div class="stat-item">
        <span class="stat-icon">⏱️</span>
        <div class="stat-content">
          <span class="stat-label">Čas</span>
          <span class="stat-value">{{ dive.duration }} min</span>
        </div>
      </div>
      
      <div class="stat-item">
        <span class="stat-icon">🌡️</span>
        <div class="stat-content">
          <span class="stat-label">Teplota</span>
          <span class="stat-value">{{ dive.temperature }}°C</span>
        </div>
      </div>
      
      <div class="stat-item">
        <span class="stat-icon">👁️</span>
        <div class="stat-content">
          <span class="stat-label">Viditeľnosť</span>
          <span class="stat-value">{{ dive.visibility }}m</span>
        </div>
      </div>
    </div>
    
    <div v-if="dive.notes" class="dive-notes">
      <strong>Poznámky:</strong>
      <p>{{ dive.notes }}</p>
    </div>
    
    <div class="dive-actions">
      <BaseButton variant="outline" @click="$emit('edit', dive.id)">
        Upraviť
      </BaseButton>
      <BaseButton variant="danger" @click="$emit('delete', dive.id)">
        Vymazať
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from './base/BaseButton.vue'

export default {
  name: 'DiveLogCard',
  
  components: {
    BaseButton
  },
  
  props: {
    dive: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  
  methods: {
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
.dive-log-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dive-log-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.dive-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.dive-number {
  font-weight: 700;
  color: #0066cc;
  font-size: 1.125rem;
}

.dive-date {
  color: #666;
  font-size: 0.875rem;
}

.dive-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.location-icon {
  font-size: 1.5rem;
}

.dive-location h3 {
  color: #333;
  font-size: 1.25rem;
  margin: 0;
}

.dive-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.75rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: #333;
}

.dive-notes {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.dive-notes strong {
  color: #333;
  display: block;
  margin-bottom: 0.5rem;
}

.dive-notes p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.dive-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .dive-stats {
    grid-template-columns: 1fr;
  }
  
  .dive-actions {
    flex-direction: column;
  }
}
</style>