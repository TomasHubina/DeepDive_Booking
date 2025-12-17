import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CoursesView from '../views/CoursesView.vue'
import CourseDetailView from '../views/CourseDetailView.vue'
import InstructorsView from '../views/InstructorsView.vue'
import ReservationView from '../views/ReservationView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/courses',
      name: 'courses',
      //component: () => import('../views/CoursesView.vue')
      component: CoursesView
    },
    {
      path: '/courses/:id',
      name: 'course-detail',
      //component: () => import('../views/CourseDetailView.vue')
      component: CourseDetailView
    },
    {
      path: '/instructors',
      name: 'instructors',
      //component: () => import('../views/InstructorsView.vue')
      component: InstructorsView
    },
    {
      path: '/reservation/:courseId?',
      name: 'reservation',
      //component: () => import('../views/ReservationView.vue')
      component: ReservationView
    },
    {
      path: '/about',
      name: 'about',
      //component: () => import('../views/AboutView.vue')
      component: AboutView
    }
  ]
})

export default router