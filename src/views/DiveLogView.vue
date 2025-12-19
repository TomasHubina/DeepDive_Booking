<template>
  <div class="dive-log-view">
    <div class="container">
      <div class="header-section">
        <h1>🌊 Môj potápačský denník</h1>
        <BaseButton @click="openAddForm">+ Pridať ponor</BaseButton>
      </div>
      
      <div v-if="!authStore.isLoggedIn" class="not-logged-in">
        <p>Pre zobrazenie denníka sa musíte prihlásiť.</p>
        <BaseButton @click="$router.push('/')">Späť na domov</BaseButton>
      </div>
      
      <div v-else>
        <div class="stats-section">
          <div class="stat-card">
            <div class="stat-icon">🤿</div>
            <div class="stat-content">
              <div class="stat-value">{{ totalDives }}</div>
              <div class="stat-label">Celkový počet ponorov</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">⏱️</div>
            <div class="stat-content">
              <div class="stat-value">{{ totalTime }} min</div>
              <div class="stat-label">Celkový čas pod vodou</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">⬇️</div>
            <div class="stat-content">
              <div class="stat-value">{{ maxDepthValue }}m</div>
              <div class="stat-label">Najväčšia hĺbka</div>
            </div>
          </div>

        <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-content">
              <div class="stat-value">{{ averageDepthValue }}m</div>
              <div class="stat-label">Priemerná hĺbka</div>
            </div>
          </div>
        </div>

        <div class="extended-stats">
          <div class="extended-stat-card">
            <h3>⏱️ Priemerný čas ponoru</h3>
            <p class="big-number">{{ averageDurationValue }} min</p>
          </div>
          
          <div class="extended-stat-card" v-if="lastDiveData">
            <h3>🕐 Posledný ponor</h3>
            <p class="location">{{ lastDiveData.location }}</p>
            <p class="date">{{ formatDate(lastDiveData.date) }}</p>
          </div>
          
          <div class="extended-stat-card">
            <h3>📅 Tento mesiac</h3>
            <p class="big-number">{{ divesThisMonthValue }} ponorov</p>
          </div>
        </div>

        <div v-if="totalDives > 0" class="chart-section">
          <h2>📈 Ponory za posledných 6 mesiacov</h2>
          <DiveBarChart :data="monthlyData" />
        </div>
        
        <!-- Top 5 miest -->
        <div v-if="topLocationsData.length > 0" class="locations-section">
          <h2>📍 Top 5 potápačských miest</h2>
          <div class="locations-list">
            <div 
              v-for="(location, index) in topLocationsData" 
              :key="index"
              class="location-item"
            >
              <div class="location-rank">{{ index + 1 }}</div>
              <div class="location-info">
                <div class="location-name">{{ location.location }}</div>
                <div class="location-bar">
                  <div 
                    class="location-bar-fill"
                    :style="{ width: getLocationBarWidth(location.count) + '%' }"
                  ></div>
                </div>
              </div>
              <div class="location-count">{{ location.count }} ponorov</div>
            </div>
          </div>
        </div>
        
        <div v-if="userDives.length === 0" class="empty-state">
          <h3>Zatiaľ nemáte žiadne zaznamenané ponory</h3>
          <p>Začnite si vytvárať svoj potápačský denník!</p>
          <BaseButton @click="openAddForm">Pridať prvý ponor</BaseButton>
        </div>
        
        <div v-else class="dives-section">
          <h2>Vaše ponory ({{ userDives.length }})</h2>
          
          <div class="dives-grid">
            <DiveLogCard 
              v-for="(dive, index) in userDives" 
              :key="dive.id"
              :dive="dive"
              :index="index"
              @edit="editDive"
              @delete="confirmDeleteDive"
            />
          </div>
        </div>
      </div>
    </div>
    
    <BaseModal 
      :is-open="isFormOpen" 
      :title="isEditMode ? 'Upraviť ponor' : 'Pridať nový ponor'"
      @close="closeForm"
    >
      <form @submit.prevent="submitForm" class="dive-form">
        <div class="form-group">
          <label for="date">Dátum ponoru *</label>
          <input 
            type="date" 
            id="date" 
            v-model="formData.date"
            :max="maxDate"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="location">Miesto ponoru *</label>
          <input 
            type="text" 
            id="location" 
            v-model="formData.location"
            placeholder="napr. Bodamské jazero, Chorvátsko"
            required
          />
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="depth">Hĺbka (m) *</label>
            <input 
              type="number" 
              id="depth" 
              v-model.number="formData.depth"
              min="0"
              step="0.1"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="duration">Trvanie (min) *</label>
            <input 
              type="number" 
              id="duration" 
              v-model.number="formData.duration"
              min="1"
              required
            />
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="temperature">Teplota vody (°C) *</label>
            <input 
              type="number" 
              id="temperature" 
              v-model.number="formData.temperature"
              step="0.1"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="visibility">Viditeľnosť (m) *</label>
            <input 
              type="number" 
              id="visibility" 
              v-model.number="formData.visibility"
              min="0"
              step="0.1"
              required
            />
          </div>
        </div>
        
        <div class="form-group">
          <label for="notes">Poznámky</label>
          <textarea 
            id="notes" 
            v-model="formData.notes"
            rows="4"
            placeholder="Zaujímavé pozorovania, zvieratá, podmienky..."
          ></textarea>
        </div>
        
        <div class="form-actions">
          <BaseButton type="submit">
            {{ isEditMode ? 'Uložiť zmeny' : 'Pridať ponor' }}
          </BaseButton>
          <BaseButton variant="outline" @click="closeForm">
            Zrušiť
          </BaseButton>
        </div>
      </form>
    </BaseModal>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'
import { useDiveLogStore } from '@/stores/diveLogStore'
import DiveLogCard from '@/components/DiveLogCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import DiveBarChart from '@/components/DiveBarChart.vue'

export default {
  name: 'DiveLogView',
  
  components: {
    DiveLogCard,
    BaseButton,
    BaseModal,
    DiveBarChart
  },
  
  data() {
    return {
      authStore: null,
      diveLogStore: null,
      isFormOpen: false,
      isEditMode: false,
      editingDiveId: null,
      formData: {
        date: '',
        location: '',
        depth: '',
        duration: '',
        temperature: '',
        visibility: '',
        notes: ''
      }
    }
  },
  
  computed: {
    userDives() {
      if (!this.authStore.currentUser) return []
      return this.diveLogStore.getDivesByUser(this.authStore.currentUser.id)
    },
    
    totalDives() {
      if (!this.authStore.currentUser) return 0
      return this.diveLogStore.totalDives(this.authStore.currentUser.id)
    },
    
    totalTime() {
      if (!this.authStore.currentUser) return 0
      return this.diveLogStore.totalDiveTime(this.authStore.currentUser.id)
    },
    
    maxDepthValue() {
      if (!this.authStore.currentUser) return 0
      return this.diveLogStore.maxDepth(this.authStore.currentUser.id)
    },

    averageDepthValue() {
      if (!this.authStore.currentUser) return 0
      return this.diveLogStore.averageDepth(this.authStore.currentUser.id)
    },
    
    averageDurationValue() {
      if (!this.authStore.currentUser) return 0
      return this.diveLogStore.averageDuration(this.authStore.currentUser.id)
    },
    
    lastDiveData() {
      if (!this.authStore.currentUser) return null
      return this.diveLogStore.lastDive(this.authStore.currentUser.id)
    },
    
    divesThisMonthValue() {
      if (!this.authStore.currentUser) return 0
      return this.diveLogStore.divesThisMonth(this.authStore.currentUser.id)
    },

    monthlyData() {
      if (!this.authStore.currentUser) return []
      return this.diveLogStore.divesPerMonth(this.authStore.currentUser.id)
    },
    
    topLocationsData() {
      if (!this.authStore.currentUser) return []
      return this.diveLogStore.topLocations(this.authStore.currentUser.id)
    },
    
    maxDate() {
      return new Date().toISOString().split('T')[0]
    }
  },
  
  created() {
    this.authStore = useAuthStore()
    this.diveLogStore = useDiveLogStore()
    this.diveLogStore.loadDives()
    
    if (!this.authStore.isLoggedIn) {
      this.$router.push('/')
    }
  },
  
  methods: {

    formatTime(minutes) {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      if (hours > 0) {
        return `${hours}h ${mins}min`
      }
      return `${mins} min`
    },
    
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('sk-SK', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    },
    
    getLocationBarWidth(count) {
      if (this.topLocationsData.length === 0) return 0
      const maxCount = this.topLocationsData[0].count
      return (count / maxCount) * 100
    },

    openAddForm() {
      this.isEditMode = false
      this.editingDiveId = null
      this.resetForm()
      this.isFormOpen = true
    },
    
    editDive(diveId) {
      this.isEditMode = true
      this.editingDiveId = diveId
      
      const dive = this.diveLogStore.getDiveById(diveId)
      if (dive) {
        this.formData = {
          date: dive.date,
          location: dive.location,
          depth: dive.depth,
          duration: dive.duration,
          temperature: dive.temperature,
          visibility: dive.visibility,
          notes: dive.notes || ''
        }
      }
      
      this.isFormOpen = true
    },
    
    closeForm() {
      this.isFormOpen = false
      this.resetForm()
    },
    
    resetForm() {
      this.formData = {
        date: '',
        location: '',
        depth: '',
        duration: '',
        temperature: '',
        visibility: '',
        notes: ''
      }
    },
    
    submitForm() {
      const diveData = {
        ...this.formData,
        userId: this.authStore.currentUser.id
      }
      
      if (this.isEditMode) {
        this.diveLogStore.updateDive(this.editingDiveId, diveData)
      } else {
        this.diveLogStore.addDive(diveData)
      }
      
      this.closeForm()
    },
    
    confirmDeleteDive(diveId) {
      if (confirm('Naozaj chcete vymazať tento ponor?')) {
        this.diveLogStore.deleteDive(diveId)
      }
    }
  }
}
</script>

<style scoped>
.dive-log-view {
  min-height: 70vh;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin: 0;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  /*background: linear-gradient(135deg, #0066cc 0%, #004499 100%);*/ background: white; 
  /*color: white;*/ color: #333;
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card.primary {
  background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
  color: white;
}

.stat-icon {
  font-size: 3rem;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.9;
}

.stat-card:not(.primary) .stat-value {
  color: #0066cc;
}

.stat-card:not(.primary) .stat-label {
  color: #666;
}

.extended-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.extended-stat-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
}

.extended-stat-card h3 {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
}

.big-number {
  font-size: 2rem;
  font-weight: 700;
  color: #0066cc;
  margin: 0;
}

.location {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.date {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
}

.chart-section,
.locations-section {
  margin-bottom: 3rem;
}

.chart-section h2,
.locations-section h2 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
}

.locations-list {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.location-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.location-item:last-child {
  border-bottom: none;
}

.location-rank {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.location-info {
  flex: 1;
}

.location-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.location-bar {
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.location-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #0066cc 0%, #004499 100%);
  transition: width 0.5s ease;
}

.location-count {
  font-weight: 700;
  color: #0066cc;
  white-space: nowrap;
}

.not-logged-in,
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.empty-state h3 {
  color: #333;
  margin-bottom: 1rem;
}

.empty-state p {
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.125rem;
}

.dives-section h2 {
  color: #333;
  margin-bottom: 2rem;
  font-size: 1.75rem;
}

.dives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.dive-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0066cc;
}

.form-group textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  h1 {
    font-size: 2rem;
    text-align: center;
  }
  
  .stats-section {
    grid-template-columns: 1fr;
  }
  
  .dives-grid {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>