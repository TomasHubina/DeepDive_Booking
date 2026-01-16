import { defineStore } from 'pinia'

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [
      {
        id: 1,
        name: 'Open Water Diver',
        description: 'Základný potápačský kurz pre začiatočníkov. Naučíte sa základy potápania a získate medzinárodnú certifikáciu.',
        duration: '3-4 dni',
        price: 350,
        level: 'beginner',
        image: '/DeepDive_Booking/images/courses/owd.png',
        maxStudents: 4,
        instructorId: 1
      },
      {
        id: 2,
        name: 'Advanced Open Water',
        description: 'Pokročilý kurz pre zdokonalenie potápačských zručností. Hlbšie ponory a navigácia pod vodou.',
        duration: '2 dni',
        price: 280,
        level: 'intermediate',
        image: '/DeepDive_Booking/images/courses/aowd.png',
        maxStudents: 4,
        instructorId: 2
      },
      {
        id: 3,
        name: 'Rescue Diver',
        description: 'Naučte sa predchádzať problémom a riešiť núdzové situácie pod vodou.',
        duration: '3 dni',
        price: 320,
        level: 'intermediate',
        image: '/DeepDive_Booking/images/courses/rescue.png',
        maxStudents: 6,
        instructorId: 1
      },
      {
        id: 4,
        name: 'Divemaster',
        description: 'Profesionálny kurz pre tých, ktorí chcú viesť potápačské skupiny.',
        duration: '2-3 týždne',
        price: 850,
        level: 'professional',
        image: '/DeepDive_Booking/images/courses/divemaster.png',
        maxStudents: 3,
        instructorId: 3
      },
      {
        id: 5,
        name: 'Nitrox Diver',
        description: 'Špeciálny kurz pre potápanie s obohatením vzduchovej zmesi o kyslík.',
        duration: '1 deň',
        price: 150,
        level: 'intermediate',
        image: '/DeepDive_Booking/images/courses/nitrox.png',
        maxStudents: 8,
        instructorId: 2
      },
      {
        id: 6,
        name: 'Deep Diver',
        description: 'Kurz pre hlboké ponory do 40 metrov. Bezpečnosť a plánovanie hlbokých ponorov.',
        duration: '2 dni',
        price: 250,
        level: 'advanced',
        image: '/DeepDive_Booking/images/courses/deep.png',
        maxStudents: 4,
        instructorId: 3
      }
    ],
    instructors: [
      {
        id: 1,
        name: 'Peter Novák',
        certification: 'SDI Master Instructor',
        experience: '15 rokov',
        specialization: 'Kurzy pre začiatočníkov, Wreck diving',
        image: '/DeepDive_Booking/images/instructors/instructor1.png',
        rating: 4.9,
        coursesCount: 250
      },
      {
        id: 2,
        name: 'Jana Kováčová',
        certification: 'SDI Instructor Trainer',
        experience: '12 rokov',
        specialization: 'Technické potápanie, Deep diving',
        image: '/DeepDive_Booking/images/instructors/instructor3.png',
        rating: 4.8,
        coursesCount: 180
      },
      {
        id: 3,
        name: 'Martin Horák',
        certification: 'SDI Course Director',
        experience: '20 rokov',
        specialization: 'Profesionálne kurzy, Rescue',
        image: '/DeepDive_Booking/images/instructors/instructor2.png',
        rating: 5.0,
        coursesCount: 320
      }
    ]
  }),
  
  getters: {
    getCourseById: (state) => (id) => {
      return state.courses.find(course => course.id === parseInt(id))
    },
    
    getCoursesByLevel: (state) => (level) => {
      if (!level || level === 'all') return state.courses
      return state.courses.filter(course => course.level === level)
    },
    
    getInstructorById: (state) => (id) => {
      return state.instructors.find(instructor => instructor.id === parseInt(id))
    },
    
    getCoursesByInstructor: (state) => (instructorId) => {
      return state.courses.filter(course => course.instructorId === parseInt(instructorId))
    }
  },
  
  actions: {
    searchCourses(searchTerm) {
      if (!searchTerm) return this.courses
      
      const term = searchTerm.toLowerCase()
      return this.courses.filter(course => 
        course.name.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term)
      )
    }
  }
})