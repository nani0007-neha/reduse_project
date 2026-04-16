<script setup>

</script>

<template>
  <div class="app-wrapper d-flex flex-row flex-md-column min-vh-100">
    <nav class="nav-sidebar flex-shrink-0 bg_main">
      <div class="row align-items-center justify-content-center">
          <div class="d-flex align-items-center justify-content-center gap-2">
            <img src="@/assets/Icon_reduse.png" alt="RedUse Logo" class="nav_logo" />
            <span class="font_main" style="font-size: 150%; text-align: center;">RedUse</span>
          </div>
      </div>
      <ul class="w-100 d-flex flex-column flex-md-row p-2 m-0" style="align-items: center;">
        <li class="m-2 col-12 col-md-auto" style="text-align: center;">
          <router-link to="/" class="nav_item_custom text-black d-block p-2 button_sub">Awareness</router-link>
        </li>
        <li class="m-2 col-12 col-md-auto" style="text-align: center;">
          <router-link to="/food" class="nav_item_custom d-block p-2 button_sub">Food
            Guidance</router-link>
        </li>
      </ul>
    </nav>

    <main class="flex-grow-1 basic main-content">
      <div class="content-layer">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style scoped>
.main-content {
  position: relative;
  background-image: url('./assets/BackgroundBlurred.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.content-layer {
  position: relative;
  z-index: 1;
}

.nav_item_custom {
  text-decoration: none;
  color: black;
  transition: background-color 0.3s ease-out, color 0.3s ease-out;
}

.nav_item_custom:hover {
  background-color: white;
}

.nav_item_custom.router-link-active {
  background-color: white;
}


ul {
  list-style: none;
}

.nav_logo {
  height: 2em; 
  width: auto;
  display: block;
}


/* Movile nav bar */
.nav-sidebar {
  width: 120px;
  min-height: 100vh;
}

/* Desktop nav bar */
@media (min-width: 800px) {
  .nav-sidebar {
    width: 100%;
    min-height: auto;
  }

  .nav-item-custom {
    width: 100%;
  }

}
</style>
