<script setup>
import Menubar from 'primevue/menubar'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { resetQuestionaire } from './utils/questionaireController'
import { isPasswordCorrect } from './utils/PasswordFetcher'
import PasswordValidator from './components/app/PasswordValidator.vue'
// import { fetchTextileDetails } from './utils/clothingAwarenessStasticsFetcher'

const router = useRouter()
const go = (path) => router.push(path)


const navItems = [
  {
    label: 'Home',
    command: () => go('/'),
  },
  {
    label: 'Food Guidance',
    items: [
      {
        label: 'Kitchen-raid Recipes',
        command: () => go('/food/recipes'),
      },
      {
        label: 'Food Disposal',
        command: () => go('/food/disposal'),
      },
    ],
  },
  {
    label: 'Clothing Guidance',
    items: [
      {
        label: 'Awareness',
        command: () => go('/clothing/awareness'),
      },
      {
        label: 'Before You Buy',
        command: () => {
          go('/clothing/questionaire');
          resetQuestionaire();
        },
      },
      {
        label: 'Textile Decode',
        command: () => go('/clothing/textiledecode'),
      },
    ],
  },
  {
    label: 'Household Guidance',
    items: [
      {
        label: 'Waste Hotspot Audit',
        command: () => go('/household/audit')
      },
      {
        label: 'Product Journey Reveal',
        command: () => go('/household/journey')
      }
    ]
  }
]


onMounted(() => {
  // Skip password validation on mounted
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    isPasswordCorrect.value = true;
  }
});
</script>

<template>
  <PasswordValidator v-if="!isPasswordCorrect" />
  <div class="d-flex flex-column min-vh-100" v-else-if="isPasswordCorrect">
    <Menubar :model="navItems" class="app-menubar">
      <template #start>
        <img src="@/assets/Icon_reduse.png" alt="RedUse Logo" class="nav-logo" />
        <span class="logo-text">
          <span class="brand-red">Red</span>
          <span class="brand-use">Use</span>
        </span>
      </template>
    </Menubar>

    <main class="flex-grow-1 main-content">
      <div class="content-layer">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style scoped>
.main-content {
  position: relative;
  /*background-color: #e0f8f2;*/
  background-image: linear-gradient(to bottom, #e0f8f2, transparent 0%);
  background-image: linear-gradient(to bottom, #e0f8f2 50%, transparent 100%);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}


.content-layer {
  position: relative;
  z-index: 1;
}

.nav-logo {
  height: 1.5em;
  width: auto;
}

.logo-text {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2f2f31;
  font-family: 'Nunito', sans-serif;
  white-space: nowrap;
  letter-spacing: -0.2px;
  /* spacing for logos */
  margin-left: 0.5rem;
}

/* Color for "Red" */
.brand-red {
  color: #2f2f31;
  font-weight: 700;
}

/* Color for "Use" */
.brand-use {
  color: #009387;
  font-weight: 550;
  /* comment out if no need */
  font-family: 'Covered By Your Grace';
  /* comment out if no need */
  font-size: 28px;
  /* comment out if no need */
}
</style>

<style>
.app-menubar.p-menubar {
  position: sticky;
  /* make the navbar stick to the top (remove if no need) */
  top: 0;
  /* make the navbar stick to the top (remove if no need) */
  z-index: 1000;
  /* make the navbar stick to the top (remove if no need) */
  background: white;
  border: none;
  border-radius: 0;
  padding: 0.5rem 1.25rem;
  overflow: visible;
}

.app-menubar .p-menubar-item {
  overflow: visible;
}

/* All item links: base state */
.app-menubar .p-menubar-item-label {
  color: #2f2f31;
  font-family: sans-serif;
}

.app-menubar .p-menubar-item-link {
  color: #2f2f31;
  border-radius: 5rem;
  transition: background-color 0.25s ease-out, color 0.25s ease-out;
  gap: 0.4rem;
}

.app-menubar .p-menubar-item :hover {
  color: #2f2f31;
}

.app-menubar .p-menubar-submenu {
  position: absolute;
  z-index: 9999;
  overflow: visible;
}

.app-menubar .p-menubar-submenu .p-menubar-item-link {
  color: grey;
}

/* Mobile hamburger button: push to the far right */
.app-menubar .p-menubar-start {
  flex: 1 1 auto;
}

.app-menubar .p-menubar-button {
  order: 99;
  margin-left: auto;
  color: #2f2f31;
  background: transparent;
  border: none;
}

.app-menubar .p-menubar-button:hover {
  background: rgba(255, 255, 255, 0.18);
}

/* Mobile panel */
.app-menubar .p-menubar-mobile .p-menubar-root-list {
  background: darkgreen;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
}
</style>