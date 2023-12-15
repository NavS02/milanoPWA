<template>
  <div class="text-center">
    <img src="/MuseoDiocesano_CMYK.jpg" alt="" style="width:350px;margin-top:15%"/>

    <img src="/logoMilano.png" alt="" style="width:300px;margin-top:15%"/>
    
    <img src="/logo-fondazionecariplo.webp" alt="" style="width:300px;"/>

    <hr>
    <img src="/logoAND.png" alt="" style="width:300px;"/>

  </div>
</template>
<script setup>
import { ref,onMounted } from "vue";

const nome = ref("");
const email = ref("");
const descrizione = ref("");

const submitForm = () => {
  nome.value = "";
  email.value = "";
  descrizione.value = "";
};
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

onMounted(async () => {
    fetchImages();

});
</script>
<style scoped></style>
