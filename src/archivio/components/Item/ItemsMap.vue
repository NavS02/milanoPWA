<script setup>
  import { ref } from "vue";
  import { MapboxMap } from '@studiometa/vue-mapbox-gl';

  // Define the ref for mapCenter and set Milan's coordinates
  const mapCenter = ref([9.1900, 45.4642]);
</script>

<template>
  <main id="main" class="main">
    <MapboxMap
      :style="{'height': '1150px'}"
      access-token="pk.eyJ1IjoibmF2czAyIiwiYSI6ImNsa2kxM2lybDA2Yncza21qb2YxeW5ndnIifQ.8ld3MBwHYeIBZjobdOE_5A"
      map-style="mapbox://styles/mapbox/streets-v11"
      :center="mapCenter" 
      :zoom=10
    />
  </main>
</template>
