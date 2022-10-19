<template>
  <div class="">
    <div
      class="absolute z-10 left-[81%] lg:left-[17.5rem] top-[32.8%] lg:top-[13rem] bg-white"
    >
      <router-link :to="{ name: 'about' }">
        <button class="bg-[#DBF7EB] text-black rounded-full px-4 py-4">
          <v-icon icon="mdi-qrcode"></v-icon>
        </button>
      </router-link>
      <p class="mt-3 lg:mx-1 bg-white text-xs tracking-wider">QRujukan</p>
    </div>
    <div class="lg:force-mobile -z-10">
      <v-img src="@/assets/images/ss1.png"></v-img>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style></style>
