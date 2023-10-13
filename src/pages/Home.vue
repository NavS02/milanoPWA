<template>
  <div class="hello">
    <div style="text-align: center; margin-top: 10%">
      <img src="/logoMilanoSmall.png" alt="" style="width: 60%" />
      <h3>MUSEO DIOCESANO CARLO MARIA MARTINI</h3>
    </div>
    <router-link class="nav-link" :to="{ name: 'TouchScreen' }">
      <div class="card cardB2">
        <div class="car-body text-center">
          <br />
          VISUALIZZA LA MAPPA
        </div>
      </div>
    </router-link>
    <router-link class="nav-link" :to="{ name: 'ListItems' }">
      <div class="card cardB1">
        <div class="car-body text-center">
          <br />
          VISUALIZZA LE OPERE
        </div>
      </div>
    </router-link>

    <div class="install-button" @click="showInstallTutorial()">
      <font-awesome-icon icon="circle-info" />
    </div>

    <ul class="navigation">
      <li class="navigationItem"><a href="#">About</a></li>
      <li class="navigationItem"><a href="#">Contact us</a></li>
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
                @click="selectOS('ios')"
              >
                <i class="bi bi-apple"></i> Apple
              </button>
            </div>
            <div class="col-6">
              <button
                class="btn btn-primary btn-lg btn-block OS"
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
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Chiude
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAddToHomescreen } from "@owliehq/vue-addtohomescreen";
const isModalVisible = ref(false);

const showInstallButton = ref(false);
const OS = ref();

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
</script>

<style scoped>
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

  background-color: #007bff;
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
  color: #b10b1c;
  text-decoration: none;
}

.card {
  margin: 40px 10%;
  width: 80%;
  height: 100px;
}
.cardB1 {
  background-image: url("/card1.PNG");
  background-position: center;
  background-size: cover;
  color: white;
}
.cardB2 {
  background-image: url("/museoFoto.jpg");
  background-position: center;
  background-size: cover;
  color: white;
}
.navigation {
  margin-top: 40px;
}

.install-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 5px;
  margin: 20px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
