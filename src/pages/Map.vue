<template>
  <div class="mycarousel">
    <carousel :items-to-show="1">
      <slide v-for="(item, index) in mydata.items" :key="index">
        <img :src="item.image" :id="item.piano" />
        {{ setNewPiano(item.piano) }}
      </slide>
    </carousel>
    <div class="text-center">
      <h2>{{ currentPiano }}</h2>
    </div>
    <br>
   <div class="container">
      <div class="row">
        <div
          class="col-lg-4 col-md-6 col-sm-12 col-4"
          v-for="(item, index) in items"
          :key="index"
        >
          <div v-if="currentPiano == item.piano">
              <router-link
                class="nav-link"
                :to="{
                  name: 'InfoItem',
                  params: { id: item.id },
                }"
              >
            <div
              class="card"
              :style="{
                'background-image': 'url(' + item.icona + ')',
                'background-position': 'center center',
                'background-size': 'cover',
              }"
            >
            
                <div class="card-body"></div>
            </div>
              </router-link>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { ref, onMounted, watch } from "vue";
import { directus } from "../API";

const mydata = ref({
  items: [
    { image: "/mappa_pianoterra.png", piano: "piano terra" },
    { image: "/mappa_1piano.png", piano: "primo piano" },
    { image: "/mappa_interrato.png", piano: "Interrato" },
  ],
});
const items = ref();
const imageurl = ref("/logoMilanoSmall.png");
const currentPiano = ref("");
setNewPiano();
function setNewPiano(piano) {
  const activeSlides = document.querySelectorAll("li.carousel__slide--active");

  activeSlides.forEach((slide) => {
    const image = slide.querySelector("img");

    if (image) {
      if (currentPiano.value !== image.getAttribute("id")) {
        const imageId = image.getAttribute("id");
        currentPiano.value = imageId;
        console.log(currentPiano.value);
        fetchItems();
      }
    }
  });
}
async function fetchItems(piano) {
  let response = await directus.items("app").readByQuery({
    filter: {
      pubblicata: { _eq: true },
    },
    limit: -1,
  });
  items.value = response.data;
  try {
    let url = import.meta.env.VITE_API_BASE_URL;
    for (let index = 0; index < items.value.length; index++) {
      if (items.value[index].icona !== null) {
        items.value[index].icona = url + "/assets/" + items.value[index].icona;
      }
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.mycarousel {
  margin-top: 30%;
}
img {
  width: 200px;
}
.card{
  border-radius: 0;
  height: 100px;
  margin-right:0;

}
h2::first-letter {
  text-transform: uppercase;
}

</style>
