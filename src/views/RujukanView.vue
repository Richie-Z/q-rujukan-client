<template>
  <div>
    <div class="lg:force-mobile">
      <v-img src="@/assets/images/header.png" alt=""></v-img>
      <div class="min-h-[75vh] m-5">
        <v-breadcrumbs :items="items" class="!mx-0">
          <template #prepend>
            <v-icon size="small" icon="mdi-vuetify"></v-icon>
          </template>
        </v-breadcrumbs>

        <div class="bg-[#D7F3E7] min-h-full rounded px-5 py-10">
          <div class="flex items-start">
            <div>
              <h1
                class="text-3xl mt-4 lg:mt-0 lg:text-4xl font-semibold lg:font-bold w-auto lg:w-[80%]"
              >
                Rumah Sakit Panti Jompo
              </h1>
              <div class="mt-10">
                <div>
                  <v-text-field
                    label="Nama Pasien"
                    type="input"
                    v-model="data.nama"
                    variant="outlined"
                    readonly
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    label="Nama Pasien"
                    type="input"
                    v-model="data.nama"
                    variant="outlined"
                    readonly
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    label="Nama Pasien"
                    type="input"
                    v-model="data.nama"
                    variant="outlined"
                    readonly
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    label="Nama Pasien"
                    type="input"
                    v-model="data.nama"
                    variant="outlined"
                    readonly
                  ></v-text-field>
                </div>
              </div>
            </div>
            <v-img
              src="@/assets/images/qrcode.png"
              class="w-[30%] lg:w-[20%]"
            ></v-img>
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

const { params } = useRoute();
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

const data = ref({ nama: "Richie" });
</script>
