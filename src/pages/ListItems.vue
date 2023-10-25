<template>
  <br />
  <div class="container">
    <div class="accordion" id="accordionExample">
      <div
        v-for="(piano, pianoIndex) in piani"
        :key="pianoIndex"
        class="accordion-item"
      >
        <h2 class="accordion-header" :id="'heading' + pianoIndex">
          <button
            class="accordion-button collapsed"
            type="button"
            :data-bs-toggle="'collapse'"
            :data-bs-target="'#collapse' + pianoIndex"
            aria-expanded="false"
            :aria-controls="'collapse' + pianoIndex"
          >
            {{ piano.piano }}
          </button>
        </h2>
        <div
          :class="['accordion-collapse', 'collapse']"
          :id="'collapse' + pianoIndex"
          :aria-labelledby="'heading' + pianoIndex"
          :data-bs-parent="'#accordionExample'"
        >
          <div class="accordion-body" style="margin: -10px !important">
            <div
              v-for="(sala, salaIndex) in piano.sale"
              :key="salaIndex"
              class="accordion"
            >
              <div class="accordion-item">
                <h2
                  :class="['accordion-header']"
                  :id="'heading' + pianoIndex + salaIndex"
                >
                  <button
                    class="accordion-button"
                    type="button"
                    :data-bs-toggle="'collapse'"
                    :data-bs-target="'#collapse' + pianoIndex + salaIndex"
                    :aria-expanded="false"
                    :aria-controls="'collapse' + pianoIndex + salaIndex"
                  >
                    {{ sala }}
                  </button>
                </h2>
                <div
                  :class="['accordion-collapse', 'collapse']"
                  :id="'collapse' + pianoIndex + salaIndex"
                  :aria-labelledby="'heading' + pianoIndex + salaIndex"
                  :data-bs-parent="'#collapse' + pianoIndex"
                >
                  <div class="accordion-body" style="margin: -10px !important">
                    <div v-for="(item, index) in items" :key="index">
                      <div v-if="cleanString(sala) === cleanString(item.sala)">
                        <router-link
                          class="nav-link"
                          :to="{
                            name: 'InfoItem',
                            params: { item: item.JSON },
                          }"
                        >
                          <div class="card custom-card">
                            <div
                              class="card-body"
                              style="margin: -10px !important"
                            >
                              <div class="row">
                                <div class="col-5">
                                  <div class="custom-div text-center">
                                    <img
                                      :src="item.icona"
                                      alt=""
                                      srcset=""
                                      style="object-fit: contain"
                                    />
                                  </div>
                                </div>
                                <div class="text-right col-7">
                                  {{ item.titolo }}
                                  <br />
                                  <br />
                                  <span
                                    style="
                                      font-style: italic;
                                      font-size: 10px;
                                      float: right;
                                    "
                                    >{{ item.autore }}</span
                                  >
                                </div>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch, computed, onMounted } from "vue";
import { directus } from "../API";

function cleanString(input) {
  return input.replace(/\s/g, "").toLowerCase();
}
const props = defineProps({
  itemsData: { type: Array, default: null },
});
const { itemsData } = toRefs(props);

const piani = ref([
  {
    piano: "Piano Terra",
    sale: [
      "Corridoio centrale ",
      "Sala dell’Arciconfraternita ",
      "Sala Fontana ",
      "Crociera ",
    ],
  },
  {
    piano: "Primo Piano",
    sale: [
      "Scalone ",
      "Corridoio centrale ",
      "Corridoio laterale sinistro ",
      "Corridoio laterale destro ",
      "Sala fondi oro ",
      "Sala Marcenaro ",
    ],
  },
  {
    piano: "Ipogeo",
    sale: [],
  },
]);
const items = ref(itemsData);
const imageurl = ref("/logoMilanoSmall.png");

</script>
<style scoped>
.custom-div {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.custom-div img {
  max-width: 100px;
  max-height: 100px;
}
.custom-card {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.custom-title {
  font-size: 12px;
  text-align: right;
}
</style>
