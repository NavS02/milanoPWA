<template>
  <div class="text-left">
    <img
      src="/MuseoDiocesano_CMYK.jpg"
      alt=""
      style="width: 250px; margin-top: 5px"
    />
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
      <carousel :items-to-show="1" @slide-end="setNewPiano()">
        <slide v-for="(item, index) in mydata.items" :key="index">
          
                  
          <img :src="item.image" :id="item.piano " />
        </slide>
      </carousel>
      <div class="text-center">
        <h2>{{ currentPiano }}</h2>
        <img
          v-if="!loaded"
          src="/loaderAnimation.webp"
          style="width: 100%"
          alt=""
        />
      </div>
      <br />
      <div class="container" v-if="loaded">
        <div class="row">
          <div
            class="col-lg-4 col-md-6 col-sm-12 col-4"
            v-for="(item, index) in items"
            :key="index"
          >
            <div v-if="currentPiano == item.piano" class="itemsCard">
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
            <div v-else id="nonCreated"></div>
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
    { image: "/mappa_interrato.png", piano: "ipogeo" },
  ],
});
const items = ref();
const imageurl = ref("/logoMilanoSmall.png");
const currentPiano = ref("");
const optionSelected = ref("Map");
const online = ref(true);
const data = ref(JSON.parse(localStorage.getItem("listOpere")));
const loaded = ref(false);
const imagesToSave = [
  "/mappa_pianoterra.png",
  "/mappa_1piano.png",
  "/mappa_interrato.png",
];
async function setnewView(option) {
  optionSelected.value = option;
  if (option == "Map") {
    await new Promise((resolve) => setTimeout(resolve, 500));
    fetchImages();

    setNewPiano("piano terra");
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
async function fetchItems() {
  try {
    loaded.value = false;

    items.value = data.value;


    for (let index = 0; index < items.value.length; index++) {
      items.value[index].JSON = JSON.stringify(items.value[index]);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (error) {
    console.error(error);
  } finally {
    loaded.value = true;
    removeNonCreatedElements();
  }
}
async function removeNonCreatedElements() {
  await new Promise((resolve) => setTimeout(resolve, 0));
  var elementosAEliminar = document.querySelectorAll("#nonCreated");
  elementosAEliminar.forEach(function (elemento) {
    var elementoPadre = elemento.parentNode;
    elementoPadre.remove();
  });
}

function fetchImages() {
  let myImages = JSON.parse(localStorage.getItem("myImages"));

  if (myImages) {
    myImages.forEach((element) => {
      let imageInCode = document.querySelector(`img[src="${element.source}"]`);
      if (imageInCode) {
        imageInCode.src = element.base64src;
      }
    });
  } else {
    console.log("No saved images.");
  }
}



function onlineChanged(newValue, oldValue) {
  fetchImages();
}
onMounted(async () => {
  if (navigator.onLine == false) {
    online.value = navigator.onLine;
  }
  await fetchItems();
  setNewPiano();
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
