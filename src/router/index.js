import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import HomeView from '../views/HomeView.vue'
import CoursesView from '../views/CoursesView.vue'
import CourseDetailView from '../views/CourseDetailView.vue'
import InstructorsView from '../views/InstructorsView.vue'
import ReservationView from '../views/ReservationView.vue'
import AboutView from '../views/AboutView.vue'
import MyCoursesView from '../views/MyCoursesView.vue'

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
      component: CoursesView
    },
    {
      path: '/courses/:id',
      name: 'course-detail',
      component: CourseDetailView
    },
    {
      path: '/instructors',
      name: 'instructors',
      component: InstructorsView
    },
    {
      path: '/reservation/:courseId?',
      name: 'reservation',
      component: ReservationView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/my-courses',
      name: 'my-courses',
      component: MyCoursesView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router