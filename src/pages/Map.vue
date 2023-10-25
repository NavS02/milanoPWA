<template>
  <div class="text-left">
    <img src="/logoBig.jpg" alt="" style="width: 250px; margin-top: 5px" />
    <hr />
  </div>
  <div class="text-center">
    <button
      type="button"
      class="btn btn-light"
      style="margin-right: 40px"
      @click="setnewView('Map')"
    >
      Mappa
    </button>
    <button type="button" class="btn btn-light" @click="setnewView('Lista')">
      Lista
    </button>
    <div v-if="optionSelected === 'Lista'">
      <ListItems :itemsData="items" />
    </div>
  </div>
  <div id="map" v-if="optionSelected === 'Map'">
    <div class="mycarousel" style="margin-top: 20px">
      <carousel :items-to-show="1">
        <slide v-for="(item, index) in mydata.items" :key="index">
          <img :src="item.image" :id="item.piano" />
          {{ setNewPiano(item.piano) }}
        </slide>
      </carousel>
      <div class="text-center">
        <h2>{{ currentPiano }}</h2>
      </div>
      <br />
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
                  params: { item: item.JSON },
                }"
              >
                <div
                  class="card"
                  v-if="online == true"
                  :style="{
                    'background-image': 'url(' + item.icona + ')',
                    'background-position': 'center center',
                    'background-size': 'cover',
                  }"
                >
                  <div class="card-body"></div>
                </div>
                <div class="card" v-else>
                  <div class="card-body">
                    <div class="text-center">
                      {{ item.titolo.slice(0, 16)
                      }}{{ item.titolo.length > 19 ? "..." : "" }}
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
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
import ListItems from "./ListItems.vue";

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
const optionSelected = ref("Map");
const online = ref(true);
const data = ref(JSON.parse(localStorage.getItem("listOpere")));
const imagesToSave = [
  "/mappa_pianoterra.png",
  "/mappa_1piano.png",
  "/mappa_interrato.png",
];
function setnewView(option) {
  optionSelected.value = option;
  if (option == "Map") {
    setTimeout(function () {
      fetchImages();
    }, 1500);
  }
}
setNewPiano();
function setNewPiano(piano) {
  const activeSlides = document.querySelectorAll("li.carousel__slide--active");

  activeSlides.forEach((slide) => {
    const image = slide.querySelector("img");

    if (image) {
      if (currentPiano.value !== image.getAttribute("id")) {
        const imageId = image.getAttribute("id");
        currentPiano.value = imageId;
        fetchItems();
      }
    }
  });
}
async function fetchItems(piano) {
  try {
    let response = await directus.items("app").readByQuery({
      filter: {
        pubblicata: { _eq: true },
      },
      limit: -1,
    });
    items.value = response.data;
  } catch (error) {
    items.value = data.value;
    online.value = false;
  }
  localStorage.setItem("listOpere", JSON.stringify(items.value));

  try {
    let url = import.meta.env.VITE_API_BASE_URL;
    for (let index = 0; index < items.value.length; index++) {
      if (items.value[index].icona !== null) {
        items.value[index].icona = url + "/assets/" + items.value[index].icona;
      }
      items.value[index].JSON = JSON.stringify(items.value[index]);
    }
  } catch (error) {
    console.log(error);
  }
}

function saveImages() {
  const savedImages = {};

  for (const imageUrl of imagesToSave) {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = function () {
          const base64Image = reader.result;
          savedImages[imageUrl] = base64Image;

          if (Object.keys(savedImages).length === imagesToSave.length) {
            localStorage.setItem("savedImagesMap", JSON.stringify(savedImages));
          }
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error("Error fetching the image:", error);
      });
  }
}

function fetchImages() {
  const savedImages = JSON.parse(localStorage.getItem("savedImagesMap")) || {};

  const base64Image0 = savedImages["/mappa_pianoterra.png"];
  const base64Image1 = savedImages["/mappa_1piano.png"];
  const base64Image2 = savedImages["/mappa_interrato.png"];

  if (base64Image0) {
    let storage = document.getElementById("piano terra");
    storage.src = base64Image0;
  }
  if (base64Image1) {
    let storage = document.getElementById("primo piano");
    storage.src = base64Image0;
  }
  if (base64Image2) {
    let storage = document.getElementById("Interrato");
    storage.src = base64Image0;
  }
}

function onlineChanged(newValue, oldValue) {
  fetchImages();
}
onMounted(async () => {
  if (navigator.onLine == false) {
    online.value = navigator.onLine;
  }
  saveImages();
  fetchImages();
});
window.addEventListener("offline", () => {
  fetchImages();
});
</script>

<style scoped>
.mycarousel {
  margin-top: 30%;
}
img {
  width: 200px;
}
.card {
  border-radius: 0;
  height: 100px;
  margin-right: 0;
}
h2::first-letter {
  text-transform: uppercase;
}
</style>
