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
    }
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