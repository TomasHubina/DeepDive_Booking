<template>
  <header class="navbar-header">
    <nav class="navbar">
      <div class="container">
        <div class="nav-brand">
          <h1>DeepDive</h1>
        </div>

        <button class="hamburger" @click="toggleMenu" :class="{ active: isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="nav-links" :class="{ active: isMenuOpen }">
            <button class="close-button" @click="closeMenu" v-if="isMenuOpen">
            <span></span>
            <span></span>
          </button>

          <RouterLink to="/" @click="closeMenu">Domov</RouterLink>
          <RouterLink to="/courses" @click="closeMenu">Kurzy</RouterLink>
          <RouterLink to="/instructors" @click="closeMenu">Inštruktori</RouterLink>
          <RouterLink to="/about" @click="closeMenu">O nás</RouterLink>
          <RouterLink v-if="authStore.isLoggedIn" to="/my-courses" @click="closeMenu">
            Moje kurzy
          </RouterLink>

          <RouterLink v-if="authStore.isLoggedIn" to="/dive-log" @click="closeMenu">
            Dive Log
          </RouterLink>
          
          <RouterLink v-if="!authStore.isLoggedIn" to="/reservation" @click="closeMenu">
            Rezervácia
          </RouterLink>
          
          <button v-if="!authStore.isLoggedIn" @click="openLoginModal" class="login-button">
            Prihlásiť sa
          </button>
          
          <button v-if="authStore.isLoggedIn" @click="handleLogout" class="logout-button">
            Odhlásiť sa ({{ authStore.currentUser.name }})
          </button>
        </div>
      </div>
    </nav>
    <LoginModal 
      :is-open="isLoginModalOpen" 
      @close="closeLoginModal"
      @login-success="handleLoginSuccess"
    />
  </header>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'
import LoginModal from './Login.vue'

export default {
  name: 'TheNavbar',

  components: {
    LoginModal
  },

  data() {
    return {
      isMenuOpen: false,
      isLoginModalOpen: false,
      authStore: null
    }
  },

  created() {
    this.authStore = useAuthStore()
    this.authStore.checkAuth()
  },
  
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    
    closeMenu() {
      this.isMenuOpen = false
    },

    openLoginModal() {
      this.isLoginModalOpen = true
      this.closeMenu()
    },
    
    closeLoginModal() {
      this.isLoginModalOpen = false
    },
    
    handleLoginSuccess() {
      this.$router.push('/my-courses')
    },
    
    handleLogout() {
      this.authStore.logout()
      this.closeMenu()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.navbar-header {
  background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar {
  padding: 1rem 0;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-brand h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.close-button span {
  position: absolute;
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 3px;
}

.close-button span:nth-child(1) {
  transform: rotate(45deg);
}

.close-button span:nth-child(2) {
  transform: rotate(-45deg);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.nav-links a:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.nav-links a.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  font-weight: 600;
}

.login-button,
.logout-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-button:hover,
.logout-button:hover {
  background: white;
  color: #0066cc;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
  
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    height: 100vh;
    background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
    flex-direction: column;
    gap: 0;
    padding-top: 5rem;
    transition: right 0.3s ease;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
  }

    .nav-links.active {
        right: 0;
    }
  
  .nav-links a, .login-button, .logout-button {
    width: 100%;
    padding: 1rem 2rem;
    border-radius: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-left: none;
    border-right: none;
    border-top: none;
    text-align: left;
  }

  .nav-links a:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: none;
  }
}

@media (min-width: 769px) {
  .close-button {
    display: none;
  }
}
</style>