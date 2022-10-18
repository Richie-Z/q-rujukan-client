<template>
  <div class="">
    <div class="fixed z-10 left-[17.9rem] top-[15.5rem]">
      <router-link :to="{ name: 'about' }">
        <button class="bg-[#DBF7EB] text-black rounded-full px-4 py-4">
          <v-icon icon="mdi-qrcode"></v-icon>
        </button>
      </router-link>
      <p class="mx-1 bg-white text-xs">QRujukan</p>
    </div>
    <div class="lg:force-mobile -z-10">
      <v-img src="@/assets/images/ss1.png"></v-img>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style></style>
