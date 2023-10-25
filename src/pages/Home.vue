<template>
  <div>
    <div style="text-align: center; margin-top: 10%">
      <img src="/logoMilanoSmall.png" alt="" style="width: 50%" id="storage1" />
      <br />
      <br />
      <img
        src="/MuseoDiocesano_CMYK.jpg"
        alt=""
        style="width: 85%"
        srcset=""
        id="storage2"
      />
    </div>
    <router-link class="nav-link" :to="{ name: 'Map' }">
      <div class="card" style="position: relative">
        <img
          src="/imageedit_21_3799431085.jpg"
          alt=""
          id="storage4"
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
        />
        <div
          class="card-footer text-center"
          style="
            font-weight: bold;
            font-size: 20px;
            text-align: right;
            background-color: #d3d3d3dc;
            margin-top: 90px;
            border-style: hidden;
            position: relative;
            z-index: 1;
          "
        >
          <p
            style="
              margin: 0;
              margin-top: -8px;
              margin-bottom: -8px;
              color: #00458d;
            "
          >
            MAPPA
          </p>
        </div>
      </div>
    </router-link>
    <router-link class="nav-link" :to="{ name: 'ListOpere' }">
      <div class="card">
        <div class="car-body" style="position: relative">
          <img
            src="/Capture.jpg"
            alt=""
            id="storage3"
            style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            "
          />
          <div
            class="card-footer text-center"
            style="
              font-weight: bold;
              font-size: 20px;
              text-align: right;
              background-color: #d3d3d3dc;
              margin-top: 90px;
              border-style: hidden;
              position: relative;
              z-index: 1;
            "
          >
            <p
              style="
                margin: 0;
                margin-top: -8px;
                margin-bottom: -8px;
                color: #00458d;
              "
            >
              OPERE
            </p>
          </div>
        </div>
      </div>
    </router-link>

    <div class="install-button" @click="showInstallTutorial()">
      <font-awesome-icon icon="circle-info" />
    </div>

    <ul class="navigation">
      <li class="navigationItem">
        <router-link class="nav-link" :to="{ name: 'Contact' }">
          <a href="#">Informazione</a>
        </router-link>
      </li>
      <li class="navigationItem">
        <router-link class="nav-link" :to="{ name: 'About' }">
          <a href="#">Crediti</a></router-link
        >
      </li>
    </ul>
  </div>

  <div class="modal" v-if="isModalVisible" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Installazione</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <h1>Seleziona il dispositivo utilizzato:</h1>
          <div class="row">
            <div class="col-6">
              <button
                class="btn btn-primary btn-lg btn-block OS"
                style="background-color: #00458d"
                @click="selectOS('ios')"
              >
                <i class="bi bi-apple"></i> Apple
              </button>
            </div>
            <div class="col-6">
              <button
                class="btn btn-primary btn-lg btn-block OS"
                style="background-color: #00458d"
                @click="selectOS('android')"
              >
                <i class="bi bi-android"></i> Android
              </button>
            </div>
          </div>
          <div class="installationguide" v-if="OS == 'ios'">
            <h1>Apple</h1>
            <ol type="1">
              <li>Accedi su <strong>Safari</strong></li>
              <li>Clicca sul pulsante di condivisione che trovi su Safari</li>
              <li>Clicca su <strong>"Aggiungi alla schermata Home"</strong></li>
              <li>
                Verifica che il nome visualizzato vada bene. In caso contrario
                modificalo e clicca su <strong>"Aggiungi"</strong>.
              </li>
            </ol>
          </div>
          <div class="installationguide" v-if="OS == 'android'">
            <h1>Android</h1>
            <ol type="1">
              <li>
                Cerca l'icona
                <strong>"Aggiungi a schermata principale" </strong>
              </li>
              <li>Clicca su <strong>"Aggiungi"</strong></li>
              <li>Personalizza il Nome (opzionale)</li>
              <li>Accedi all'App</li>
            </ol>
          </div>
        </div>
        <div
          class="modal-footer"
          style="
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          "
        >
          <div style="text-align: left !important">
            Versione 1.0 ({{ online ? "online" : "offline" }})
          </div>
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Chiudi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
const online = ref(true);
const isModalVisible = ref(false);

const showInstallButton = ref(false);
const OS = ref();
const imagesToSave = [
  "/logoMilanoSmall.png",
  "/MuseoDiocesano_CMYK.jpg",
  "/Capture.jpg",
  "/imageedit_21_3799431085.jpg",
];
watch(online, onlineChanged);
function selectOS(selection) {
  OS.value = selection;
}
function showInstallTutorial() {
  isModalVisible.value = true;
}

function closeModal() {
  isModalVisible.value = false;
  OS.value = null;
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
            localStorage.setItem("savedImages", JSON.stringify(savedImages));
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
  const savedImages = JSON.parse(localStorage.getItem("savedImages")) || {};
  let index = 1;
  for (const imageUrl of imagesToSave) {
    const base64Image = savedImages[imageUrl];
    if (base64Image) {
      let storage = document.getElementById("storage" + index);
      storage.src = base64Image;
    }
    index++;
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
});
window.addEventListener("offline", () => {
  fetchImages();
  online.value = false;
  alert(
    "Sei offline, verrà visualizzata una versione offline dell'applicazione"
  );
});
window.addEventListener("online", () => {
  online.value = true;
  location.reload();
});
</script>

<style scoped>
@import url("https://fonts.cdnfonts.com/css/humanst521-bt");
.OS {
  font-size: 16px;
  margin-bottom: 10px;
}
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  margin-top: 10%;
}

.install-button {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 18px;
  background-color: #00458d;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
h3 {
  margin: 40px 0 0;
}

.navigation {
  list-style-type: none;
  padding: 0;
  text-align: center;
}
.navigationItem {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #00458d;
  text-decoration: none;
}

.card {
  margin: 40px 7%;
  width: 85%;
  height: 120px;
}
.cardB1 {
  background-image: url("/Capture.jpg");
  background-position: center;
  background-size: cover;
  color: white;
}
.cardB2 {
  background-image: url("/imageedit_21_3799431085.jpg");
  background-position: center;
  background-size: cover;
  color: black;
}
.navigation {
  margin-top: 40px;
}

.install-button {
  background-color: #00458d;
  color: white;
  border: none;
  padding: 2px 6px;
  margin: 20px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
