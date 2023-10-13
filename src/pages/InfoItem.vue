<template>
  <main style="width: 100%; overflow-x: hidden">
    <div class="text-center" style="margin-top: 20px">
      <img :src="photo" alt="" srcset="" class="icona" />
    </div>
    <br />
    <div v-if="item">
      <div class="text-center">
        <h5>{{ item.titolo }}</h5>
        <span style="font-style: italic; font-size: 10px">{{
          item.autore
        }}</span>
      </div>
      <hr>
      <div
        v-html="item.descrizione"
        style="padding: 10px; word-wrap: break-word; white-space: normal;"
      ></div>
      
    </div>
  </main>
</template>
<script setup>
import { ref, toRefs, watch, computed, onMounted } from "vue";
import { directus } from "../API";

const props = defineProps({
  id: { type: Number, default: null },
});
const { id } = toRefs(props);
const photo = ref("/logoMilanoSmall.png");
const item = ref();
async function fetchItems() {
  let response = await directus.items("app").readByQuery({
    filter: {
      id: { _eq: id.value },
    },
    limit: -1,
  });
  item.value = response.data[0];
  try {
    let url = import.meta.env.VITE_API_BASE_URL;
    item.value.icona = url + "/assets/" + item.value.icona;
    photo.value = item.value.icona;
  } catch (error) {
    console.log(error);
  }
}
onMounted(async () => {
  await fetchItems();
});
</script>
<style scoped>
.icona {
  max-width: 250px;
  max-height: 250px;
}
</style>
