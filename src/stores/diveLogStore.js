import { defineStore } from 'pinia'

export const useDiveLogStore = defineStore('diveLog', {
  state: () => ({
    dives: []
  }),
  
  getters: {
    allDives: (state) => state.dives,
    
    getDiveById: (state) => (id) => {
      return state.dives.find(dive => dive.id === id)
    },
    
    getDivesByUser: (state) => (userId) => {
      return state.dives
        .filter(dive => dive.userId === userId)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    },
    
    totalDives: (state) => (userId) => {
      return state.dives.filter(dive => dive.userId === userId).length
    },
    
    totalDiveTime: (state) => (userId) => {
      return state.dives
        .filter(dive => dive.userId === userId)
        .reduce((total, dive) => total + dive.duration, 0)
    },
    
    maxDepth: (state) => (userId) => {
      const userDives = state.dives.filter(dive => dive.userId === userId)
      if (userDives.length === 0) return 0
      return Math.max(...userDives.map(dive => dive.depth))
    },

  averageDepth: (state) => (userId) => {
      const userDives = state.dives.filter(dive => dive.userId === userId)
      if (userDives.length === 0) return 0
      const total = userDives.reduce((sum, dive) => sum + dive.depth, 0)
      return Math.round((total / userDives.length) * 10) / 10
    },
    
    averageDuration: (state) => (userId) => {
      const userDives = state.dives.filter(dive => dive.userId === userId)
      if (userDives.length === 0) return 0
      const total = userDives.reduce((sum, dive) => sum + dive.duration, 0)
      return Math.round(total / userDives.length)
    },
    
    lastDive: (state) => (userId) => {
      const userDives = state.dives
        .filter(dive => dive.userId === userId)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
      return userDives[0] || null
    },
    
    divesThisMonth: (state) => (userId) => {
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      return state.dives.filter(dive => 
        dive.userId === userId && new Date(dive.date) >= startOfMonth
      ).length
    },

    divesPerMonth: (state) => (userId) => {
      const months = []
      const now = new Date()
      
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const monthName = date.toLocaleDateString('sk-SK', { month: 'short' })
        const year = date.getFullYear()
        
        const count = state.dives.filter(dive => {
          const diveDate = new Date(dive.date)
          return dive.userId === userId &&
                 diveDate.getMonth() === date.getMonth() &&
                 diveDate.getFullYear() === date.getFullYear()
        }).length
        
        months.push({
          label: `${monthName} ${year}`,
          count: count
        })
      }
      
      return months
    },

    topLocations: (state) => (userId) => {
      const userDives = state.dives.filter(dive => dive.userId === userId)
      const locationCounts = {}
      
      userDives.forEach(dive => {
        locationCounts[dive.location] = (locationCounts[dive.location] || 0) + 1
      })
      
      return Object.entries(locationCounts)
        .map(([location, count]) => ({ location, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
    },
    },
  
  actions: {
    loadDives() {
      const savedDives = localStorage.getItem('diveLogs')
      if (savedDives) {
        this.dives = JSON.parse(savedDives)
      }
    },
    
    saveDives() {
      localStorage.setItem('diveLogs', JSON.stringify(this.dives))
    },
    
    addDive(diveData) {
      const newDive = {
        id: Date.now(),
        ...diveData,
        createdAt: new Date().toISOString()
      }
      this.dives.push(newDive)
      this.saveDives()
      return newDive
    },
    
    updateDive(id, diveData) {
      const index = this.dives.findIndex(dive => dive.id === id)
      if (index !== -1) {
        this.dives[index] = {
          ...this.dives[index],
          ...diveData,
          updatedAt: new Date().toISOString()
        }
        this.saveDives()
        return this.dives[index]
      }
      return null
    },
    
    deleteDive(id) {
      const index = this.dives.findIndex(dive => dive.id === id)
      if (index !== -1) {
        this.dives.splice(index, 1)
        this.saveDives()
        return true
      }
      return false
    }
  }
})