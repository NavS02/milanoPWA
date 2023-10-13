<template>
  <div id="map" style="height: 90vh; width: 100%; margin-top: 1%"></div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { directus } from "../API";

export default {
  async mounted() {
    const map = L.map("map").setView([45.4642, 9.19], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "NavS",
    }).addTo(map);

    try {
      const response = await directus.items("touch").readByQuery({
        filter: {
          pubblicata: { _eq: true },
        },
        limit: -1,
      });

      const data = response.data;
      data.forEach((item) => {
        const marker = L.marker([
          item.mappa.coordinates[1],
          item.mappa.coordinates[0],
        ]).addTo(map);

        const popupContent = `
          ${item.titolo}<br>
          
          
          
        `;

        marker.bindPopup(popupContent);
      });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
