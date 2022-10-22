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
              v-model="searchValue"
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
            v-model="tglAwal"
            class=""
          ></v-text-field>
          <v-text-field
            label="Tanggal Akhir"
            variant="outlined"
            v-model="tglAkhir"
            type="date"
          ></v-text-field>
        </div>

        <div v-for="(d, index) in data" :key="index">
          <router-link :to="{ name: 'rujukan', params: { rujukan: d.id } }">
            <v-card width="100%" class="my-7 !bg-[#D7F3E7] rounded-lg">
              <template #title
                ><p class="text-2xl">{{ d.rumahSakit.name }}</p>
              </template>

              <template #subtitle> Spesialis {{ d.doktor.spesialis }}</template>

              <template #text
                ><div class="flex justify-between">
                  <p>{{ d.doktor.name }}</p>
                  <span v-if="d.status == 1" class="text-green-500">Aktif</span>
                  <span v-else class="text-red-500">Tidak Aktif</span>
                </div>
              </template>
            </v-card>
          </router-link>
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
import Fuse from "fuse.js";
import { ref, watch, computed, Ref, WritableComputedRef } from "vue";
import axios from "axios";
interface Data {
  id: number;
  tgl: string;
  status: number;
  rumahSakit: { name: string };
  doktor: { name: string; spesialis: string };
}

let isFilterActive = ref(false);
const openCloseFilter = () => {
  isFilterActive.value = !isFilterActive.value;
};

const closeFilterBx = async () => {
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

const ogData: Ref = ref();

(async () => {
  try {
    ogData.value = await axios
      .get("http://127.0.0.1:4000/get_all_rujukan")
      .then(function (res) {
        return res.data;
      });
  } catch (error) {
    console.error(error);
  }
})();

let searchData: Ref<Data[]> | Ref<null> = ref(null);
const data: WritableComputedRef<Data[]> = computed({
  get() {
    if (searchData.value === null) {
      return ogData.value;
    }
    return searchData.value;
  },
  set(newValue: Data[]) {
    searchData.value = newValue;
  },
});

const searchValue = ref("");
const tglAwal = ref("");
const tglAkhir = ref("");
watch(searchValue, (newSearch: string) => {
  tglAwal.value = "";
  tglAkhir.value = "";
  if (newSearch === "") {
    data.value = ogData.value;
    return;
  }
  try {
    const options = {
      threshold: 0.3,
      keys: ["doktor.name", "doktor.spesialis", "rumahSakit.name"],
    };
    const fuse = new Fuse(ogData.value, options);

    const result = fuse.search(newSearch);
    console.log(result);
    data.value = result.map(({ item }) => ({
      id: item.id,
      tgl: item.tgl,
      rumahSakit: { name: item.rumahSakit.name },
      status: item.status,
      doktor: { name: item.doktor.name, spesialis: item.doktor.spesialis },
    }));
  } catch (error) {
    console.error(error);
  }
});

const updateData = async () => {
  data.value = ogData.value.filter((item) => {
    let tgl = new Date(item.tgl).getTime();
    return (
      tgl >= new Date(tglAwal.value).getTime() &&
      tgl <= new Date(tglAkhir.value).getTime()
    );
  });
};
watch(tglAkhir, async () => {
  if (tglAwal.value !== "") {
    await updateData();
  }
});
watch(tglAwal, async () => {
  if (tglAkhir.value !== "") {
    await updateData();
  }
});
</script>
