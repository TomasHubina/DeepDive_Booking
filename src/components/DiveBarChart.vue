<template>
  <div class="bar-chart">
    <div class="chart-container">
      <div class="chart-bars">
        <div 
          v-for="(month, index) in data" 
          :key="index"
          class="bar-wrapper"
        >
          <div 
            class="bar"
            :style="{ height: getBarHeight(month.count) + '%' }"
            :title="`${month.label}: ${month.count} ponorov`"
          >
            <span class="bar-value">{{ month.count }}</span>
          </div>
          <div class="bar-label">{{ month.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiveBarChart',
  
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  
  computed: {
    maxValue() {
      if (this.data.length === 0) return 0
      return Math.max(...this.data.map(d => d.count), 1) 
    }
  },
  
  methods: {
    getBarHeight(value) {
      if (this.maxValue === 0) return 0
      return (value / this.maxValue) * 100
    }
  }
}
</script>

<style scoped>
.bar-chart {
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chart-container {
  width: 100%;
  height: 300px;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 250px;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 2px solid #e0e0e0;
}

.bar-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 60px;
}

.bar {
  width: 100%;
  background: linear-gradient(180deg, #0066cc 0%, #004499 100%);
  border-radius: 8px 8px 0 0;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0.5rem;
}

.bar:hover {
  background: linear-gradient(180deg, #0077ee 0%, #0055bb 100%);
  transform: translateY(-5px);
}

.bar-value {
  color: white;
  font-weight: 700;
  font-size: 0.875rem;
}

.bar-label {
  font-size: 0.75rem;
  color: #666;
  text-align: center;
  transform: rotate(-45deg);
  transform-origin: center;
  width: 80px;
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .chart-container {
    height: 250px;
  }
  
  .chart-bars {
    height: 200px;
    gap: 0.5rem;
  }
  
  .bar-wrapper {
    min-width: 40px;
  }
  
  .bar-label {
    font-size: 0.65rem;
    width: 60px;
  }
}
</style>