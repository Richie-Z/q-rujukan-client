<template>
  <div>
    <div class="lg:force-mobile">
      <v-img src="@/assets/images/header.png" alt=""></v-img>
      <div class="min-h-[75vh] m-5">
        <v-breadcrumbs :items="items" class="!mx-0 text-xs">
          <template #prepend>
            <v-icon size="small" icon="mdi-vuetify"></v-icon>
          </template>
        </v-breadcrumbs>

        <div class="bg-[#D7F3E7] min-h-full rounded px-5 py-10 mt-5 lg:mt-0">
          <div class="flex items-start justify-between">
            <div class="lg:!w-[80%]">
              <h1
                class="text-3xl mt-4 lg:mt-0 lg:text-4xl font-semibold lg:font-bold"
              >
                {{ data?.rumahSakit?.name }}
              </h1>
              <div class="mt-14">
                <div>
                  <v-text-field
                    label="Nama Pasien"
                    type="input"
                    v-model="data.pasien.name"
                    variant="outlined"
                    readonly
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    label="Deskripsi"
                    type="input"
                    v-model="data.diagnosa"
                    variant="outlined"
                    readonly
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    label="Rumah Sakit"
                    type="input"
                    v-model="data.rumahSakit.name"
                    variant="outlined"
                    readonly
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    label="Nama Dokter"
                    type="input"
                    v-model="data.doktor.name"
                    variant="outlined"
                    readonly
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    label="Spesialis Dokter"
                    type="input"
                    v-model="data.doktor.spesialis"
                    variant="outlined"
                    readonly
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    label="Tanggal"
                    type="input"
                    v-model="data.tgl"
                    variant="outlined"
                    readonly
                  ></v-text-field>
                </div>
              </div>
            </div>
            <img :src="data.qr" class="w-[30%] lg:w-[20%]" />
          </div>
        </div>
      </div>
      <router-link
        :to="{ name: 'home' }"
        class="absolute bottom-[2%] bg-none left-10 p-5 z-50"
      >
        &nbsp;
      </router-link>
      <v-img src="@/assets/images/footer.png" alt=""></v-img>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
const { params } = useRoute();

const data = ref();
(async () => {
  try {
    data.value = await axios
      .get(`http://127.0.0.1:4000/get_by_id_rujukan/${params.rujukan}`)
      .then(function (res) {
        return res.data;
      });
  } catch (error) {
    console.error(error);
  }
})();
const items = ref([
  {
    title: "Home",
    disabled: false,
    href: "/",
  },
  {
    title: "QRujukan",
    disabled: false,
    href: "../about",
  },
  {
    title: `Detail Rujukan ${params.rujukan}`,
    disabled: true,
    href: "rujukan",
  },
]);
</script>
