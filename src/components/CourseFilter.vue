<template>
  <div class="course-filter">
    <div class="filter-group">
      <label for="level-filter">Úroveň:</label>
      <select 
        id="level-filter" 
        v-model="selectedLevel" 
        @change="handleLevelChange"
      >
        <option value="all">Všetky úrovne</option>
        <option value="beginner">Začiatočník</option>
        <option value="intermediate">Mierne pokročilý</option>
        <option value="advanced">Pokročilý</option>
        <option value="professional">Profesionál</option>
      </select>
    </div>
    
    <div class="filter-group">
      <label for="search-filter">Vyhľadávanie:</label>
      <input 
        id="search-filter"
        type="text" 
        v-model="searchTerm" 
        @input="handleSearchChange"
        placeholder="Názov kurzu alebo popis..."
      />
    </div>
    
    <BaseButton 
      variant="secondary" 
      @click="resetFilters"
    >
      Resetovať
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from './base/BaseButton.vue'

export default {
  name: 'CourseFilter',
  
  components: {
    BaseButton
  },
  
  data() {
    return {
      selectedLevel: 'all',
      searchTerm: ''
    }
  },
  
  methods: {
    handleLevelChange() {
      this.$emit('level-change', this.selectedLevel)
    },
    
    handleSearchChange() {
      this.$emit('search-change', this.searchTerm)
    },
    
    resetFilters() {
      this.selectedLevel = 'all'
      this.searchTerm = ''
      this.$emit('level-change', 'all')
      this.$emit('search-change', '')
    }
  }
}
</script>

<style scoped>
.course-filter {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1.5rem;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 200px;
}

label {
  font-weight: 600;
  color: #333;
  font-size: 0.875rem;
}

select,
input {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

select:focus,
input:focus {
  outline: none;
  border-color: #0066cc;
}

input {
  width: 100%;
}

@media (max-width: 768px) {
  .course-filter {
    flex-direction: column;
  }
  
  .filter-group {
    width: 100%;
  }
}
</style>