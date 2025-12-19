<template>
  <div id="app">
    <TheNavbar />

    <main>
      <RouterView />
    </main>

    <footer>
      <div class="container">
        <p>&copy; 2025 DeepDive. Všetky práva vyhradené.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import TheNavbar from './components/Navbar.vue'
export default {
  name: 'App',
  
  components: {
    TheNavbar
  }/*,

  data() {
    return {
      
    }
  },
  
  mounted() {
    console.log('DeepDive Booking aplikácia spustená')
  }*/
}
</script>

<style>
@import './assets/base.css';
@import './assets/main.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

header {
  background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
}

.logo {
  filter: brightness(0) invert(1);
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
  background: rgba(255, 255, 255, 0.1);
}

.nav-links a.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  font-weight: 600;
}

main {
  flex: 1;
  padding: 2rem 0;
}

footer {
  background: #333;
  color: white;
  padding: 2rem 0;
  margin-top: 4rem;
  text-align: center;
}

@media (max-width: 768px) {
  .navbar .container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>