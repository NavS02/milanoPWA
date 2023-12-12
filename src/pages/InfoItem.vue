<template>
  <main style="width: 100%; overflow-x: hidden">
    <div class="text-left">
      <img src="/MuseoDiocesano_CMYK.jpg" alt="" style="width: 250px; margin-top: 5px" />
      <hr />
    </div>
    <div class="text-center" style="">
      <img
        :src="icona"
        alt=""
        srcset=""
        class="icona"
        @click="toggleImageSize"
        :class="{ 'expanded-image': isExpanded }"
      />
    </div>
    <br />
    <div v-if="item">
      <div v-show="isExpanded" class="overlay">
        <div class="image-container">
          <img :src="icona" alt="" class="expanded-image" />
          <button type="button" class="btn" style="background-color:#00458d;color:white;margin:10px" @click="toggleImageSize">
            Chiudi
          </button>
        </div>
      </div>
      <h4 style="font-style: italic; ">{{ autore }}</h4>
      <h4>{{ titolo }} - {{ data }}</h4>
      <hr />
      <ul>
        <li><strong>Materia: </strong>{{ materia }}</li>
        <li><strong>Collezione: </strong>{{ collezione }}</li>

        <li>
          <strong>Provenienza: </strong>{{provenienza}}
        </li>
      </ul>
      <hr />
      <div v-html="descrizione"></div>
    </div>
  </main>
</template>

<script setup>
import { ref, toRefs, watch, computed, onMounted } from "vue";
import { directus } from "../API";

const props = defineProps({
  item: { type: String, default: null },
});
const isExpanded = ref(false);
const myItem = ref();
const { item } = toRefs(props);
const photo = ref("");

const id = ref();
const autore = ref();
const titolo = ref();
const data = ref();
const materia = ref();
const collezione = ref();
const piano = ref();
const sala = ref();
const parete = ref();
const specifiche = ref();
const descrizione = ref();
const icona = ref();
const provenienza=ref()
async function fetchItems() {
  myItem.value = JSON.parse(item.value);
  if (
    typeof myItem.value === "object" &&
    myItem.value !== null &&
    myItem.value.hasOwnProperty("id")
  ) {
    id.value = myItem.value.id;
    titolo.value = myItem.value.titolo;
    autore.value = myItem.value.autore;
    data.value = myItem.value.data;
    materia.value = myItem.value.materia;
    collezione.value = myItem.value.collezione;
    provenienza.value = myItem.value.provenienza;

    piano.value = myItem.value.piano;
    sala.value = myItem.value.sala;
    parete.value = myItem.value.parete;
    specifiche.value = myItem.value.specifiche;
    descrizione.value = myItem.value.descrizione;
    icona.value = myItem.value.icona;

    try {
    } catch (error) {
      console.log(error)
    }
  } else {
    console.log("myItem is not valid");
  }
}
onMounted(async () => {
  await fetchItems();
});
function toggleImageSize() {
  isExpanded.value = !isExpanded.value;
}
</script>
<style scoped>
.icona {
  max-width: 250px;
  max-height: 250px;
}

.expanded-image {
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.3s;
  cursor: pointer;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.overlay img {
  max-width: 100%;
  max-height: 100%;
}
.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.btn-danger {
  margin-top: 10px;
}
</style>
