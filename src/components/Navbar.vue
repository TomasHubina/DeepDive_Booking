<template>
  <header class="navbar-header">
    <nav class="navbar">
      <div class="container">
        <div class="nav-brand">
          <!--<img alt="Diving logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />-->
          <h1>DeepDive Booking</h1>
        </div>

        <div class="nav-links">
          <RouterLink to="/">Domov</RouterLink>
          <RouterLink to="/courses">Kurzy</RouterLink>
          <RouterLink to="/instructors">Inštruktori</RouterLink>
          <RouterLink to="/reservation">Rezervácia</RouterLink>
          <RouterLink to="/about">O nás</RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TheNavbar'
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
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.nav-links a.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  font-weight: 600;
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
    width: 100%;
  }
  
  .nav-links a {
    width: 100%;
  }
}
</style>