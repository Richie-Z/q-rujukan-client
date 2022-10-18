<template>
  <div>
    <div class="lg:force-mobile">
      <v-img src="@/assets/images/header.png" alt=""></v-img>
      <div class="min-h-screen m-5">
        <v-breadcrumbs :items="items">
          <template v-slot:prepend>
            <v-icon size="small" icon="mdi-vuetify"></v-icon>
          </template>
        </v-breadcrumbs>

        <v-card width="400">
          <template v-slot:title> This is a title </template>

          <template v-slot:subtitle> This is a subtitle </template>

          <template v-slot:text> This is content </template>
        </v-card>
      </div>
      <v-img src="@/assets/images/footer.png" alt=""></v-img>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const items = ref([
  {
    title: "Home",
    disabled: false,
    href: "/",
  },
  {
    title: "Link 1",
    disabled: false,
    href: "breadcrumbs_link_1",
  },
]);
</script>
