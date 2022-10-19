<template>
  <div>
    <div class="lg:force-mobile">
      <v-img src="@/assets/images/header.png" alt=""></v-img>
      <div class="min-h-[75vh] m-5">
        <v-breadcrumbs :items="items">
          <template #prepend>
            <v-icon size="small" icon="mdi-vuetify"></v-icon>
          </template>
        </v-breadcrumbs>

        <div class="flex justify-between my-5 items-end">
          <div class="w-[90%] flex">
            <input
              type="text"
              class="rounded-full shadow-lg w-[95%] lg:w-full px-5 py-2"
              placeholder="Search Rujukan..."
            />
            <button class="-ml-10 text-purple-700">
              <v-icon icon="mdi-magnify"></v-icon>
            </button>
          </div>
          <div class="w-auto">
            <button
              @click="openCloseFilter"
              class="rounded-full shadow-xl p-2 lg:p-4 hover:bg-purple-700 text-purple-700 hover:text-white"
              ref="filterBtn"
            >
              <v-icon icon="mdi-filter"></v-icon>
            </button>
          </div>
        </div>
        <div
          v-if="isFilterActive"
          class="bg-[#f7f7f7] rounded shadow-lg px-6 py-4 absolute w-[90%] z-50"
          v-click-outside="closeFilterBx"
        >
          <v-text-field
            label="Tanggal Awal"
            type="date"
            variant="outlined"
            class=""
          ></v-text-field>
          <v-text-field
            label="Tanggal Akhir"
            variant="outlined"
            type="date"
          ></v-text-field>
        </div>

        <div v-for="(d, index) in data" :key="index">
          <router-link :to="{ name: 'rujukan', params: { rujukan: index } }">
            <v-card width="100%" class="my-7 !bg-[#D7F3E7] rounded-lg">
              <template #title
                ><p class="text-2xl">{{ d.rumahSakit.name }}</p>
              </template>

              <template #subtitle> Spesialis {{ d.doktor.spesialis }}</template>

              <template #text
                ><div class="flex justify-between">
                  <p>{{ d.doktor.name }}</p>
                  <span v-if="d.status" class="text-green-500">Aktif</span>
                  <span v-else class="text-red-500">Tidak Aktif</span>
                </div>
              </template>
            </v-card>
          </router-link>
        </div>
      </div>
      <v-img src="@/assets/images/footer.png" alt=""></v-img>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
let isFilterActive = ref(false);
const openCloseFilter = () => {
  isFilterActive.value = !isFilterActive.value;
};

const closeFilterBx = () => {
  isFilterActive.value = false;
};
const items = ref([
  {
    title: "Home",
    disabled: false,
    href: "/",
  },
  {
    title: "QRujukan",
    disabled: true,
    href: "about",
  },
]);

const data = ref([
  {
    rumahSakit: { name: "Rumah Sakit Panti Nugroho" },
    status: true,
    doktor: { name: "dr.Valentino Sas Henry, Sp.THT", spesialis: "THT" },
  },
  {
    rumahSakit: { name: "Rumah Sakit Panti Rapih" },
    status: false,
    doktor: {
      name: "dr.Sumitta Nauli, Sp.OT",
      spesialis: "Orthopedi dan Traumatologi",
    },
  },
  {
    rumahSakit: { name: "Rumah Sakit Panti Rapih" },
    status: false,
    doktor: { name: "dr.Immanuel Richie, Sp.THT", spesialis: "THT" },
  },
]);
</script>
