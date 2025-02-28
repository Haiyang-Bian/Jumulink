<script setup lang="ts">
import H from '../components/ui-components/SideBar/SideBar.vue';
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <H></H>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
