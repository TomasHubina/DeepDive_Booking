<template>
  <div class="about-view">
    <div class="container">
      <section class="about-hero">
        <h1>O nás</h1>
        <p class="lead">
          DeepDive je popredná potápačská škola s viac ako 15-ročnou históriou
        </p>
      </section>

      <section class="about-content">
        <div class="content-block">
          <h2>Naša misia</h2>
          <p>
            Našou misiou je sprístupniť krásu podmorského sveta každému, kto má záujem objaviť 
            nepoznané hlbiny. Veríme, že potápanie nie je len o športe, ale aj o rešpekte 
            k prírode a neustálom vzdelávaní.
          </p>
        </div>

        <div class="content-block">
          <h2>Naše hodnoty</h2>
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">🛡️</div>
              <h3>Bezpečnosť</h3>
              <p>Bezpečnosť našich študentov je vždy na prvom mieste</p>
            </div>
            <div class="value-card">
              <div class="value-icon">🎓</div>
              <h3>Kvalita výuky</h3>
              <p>Používame najmodernejšie výukové metódy a vybavenie</p>
            </div>
            <div class="value-card">
              <div class="value-icon">🌊</div>
              <h3>Ochrana prírody</h3>
              <p>Učíme zodpovednosti voči morskému prostrediu</p>
            </div>
            <div class="value-card">
              <div class="value-icon">🤝</div>
              <h3>Individuálny prístup</h3>
              <p>Každý študent dostáva personalizovanú starostlivosť</p>
            </div>
          </div>
        </div>

        <div class="content-block">
          <h2>Prečo si vybrať nás?</h2>
          <ul class="features-list">
            <li>✓ Medzinárodne certifikovaní inštruktori PADI a SSI</li>
            <li>✓ Moderné a pravidelne servisované vybavenie</li>
            <li>✓ Malé skupiny pre individuálny prístup</li>
            <li>✓ Flexibilný rozvrh kurzov</li>
            <li>✓ Certifikáty uznávané na celom svete</li>
            <li>✓ Pokračujúca podpora aj po absolvovaní kurzu</li>
            <li>✓ Prístup k exkluzívnym potápačským lokalitám</li>
            <li>✓ Konkurenčné ceny bez skrytých poplatkov</li>
          </ul>
        </div>

        <div class="content-block">
          <h2>Naša história</h2>
          <p>
            DeepDive bola založená v roku 2010 skupinou nadšencov, ktorí chceli 
            zdieľať svoju vášeň pre podmorský svet s ostatnými. Za tie roky sme vyškolili 
            viac ako 750 potápačov rôznych úrovní a stali sme sa jednou z najrešpektovanejších 
            potápačských škôl v regióne.
          </p>
          <p>
            Naše centrum je vybavené modernou technikou a poskytujeme kurzy od začiatočníckych 
            až po profesionálne úrovne. Spolupracujeme s medzinárodnými organizáciami ako 
            PADI a SSI, čo zaručuje najvyššiu kvalitu výuky.
          </p>
        </div>

        <div class="content-block stats-block">
          <h2>Naše čísla</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">750+</div>
              <div class="stat-label">Absolventi kurzov</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">15+</div>
              <div class="stat-label">Rokov skúseností</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ totalCourses }}</div>
              <div class="stat-label">Druhov kurzov</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ totalInstructors }}</div>
              <div class="stat-label">Certifikovaných inštruktorov</div>
            </div>
          </div>
        </div>

        <div class="content-block cta-block">
          <h2>Pripravený začať?</h2>
          <p>Objav s nami krásu podmorského sveta!</p>
          <div class="cta-actions">
            <BaseButton @click="goToCourses">
              Prehliadnuť kurzy
            </BaseButton>
            <BaseButton variant="outline" @click="goToInstructors">
              Naši inštruktori
            </BaseButton>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { useCoursesStore } from '@/stores/coursesStore'
import BaseButton from '@/components/base/BaseButton.vue'

export default {
  name: 'AboutView',
  
  components: {
    BaseButton
  },
  
  data() {
    return {
      coursesStore: null
    }
  },
  
  computed: {
    totalCourses() {
      return this.coursesStore?.courses.length || 0
    },
    
    totalInstructors() {
      return this.coursesStore?.instructors.length || 0
    }
  },
  
  created() {
    this.coursesStore = useCoursesStore()
  },
  
  methods: {
    goToCourses() {
      this.$router.push('/courses')
    },
    
    goToInstructors() {
      this.$router.push('/instructors')
    }
  }
}
</script>

<style scoped>
.about-view {
  min-height: 70vh;
}

/* Hero Section */
.about-hero {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 3rem;
}

.about-hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.lead {
  font-size: 1.25rem;
  opacity: 0.9;
}

/* Content */
.about-content {
  display: grid;
  gap: 3rem;
}

.content-block {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content-block h2 {
  color: #0066cc;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.content-block p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 1rem;
}

/* Values Grid */
.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.value-card {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.value-card h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.value-card p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

/* Features List */
.features-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.features-list li {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  color: #333;
  font-weight: 500;
}

/* Stats Block */
.stats-block {
  background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
  color: white;
}

.stats-block h2 {
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

/* CTA Block */
.cta-block {
  text-align: center;
  background: #f8f9fa;
  border: 2px solid #0066cc;
}

.cta-block h2 {
  margin-bottom: 1rem;
}

.cta-block p {
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

@media (max-width: 768px) {
  .about-hero h1 {
    font-size: 2rem;
  }
  
  .content-block h2 {
    font-size: 1.5rem;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .features-list {
    grid-template-columns: 1fr;
  }
  
  .cta-actions {
    flex-direction: column;
  }
}
</style>