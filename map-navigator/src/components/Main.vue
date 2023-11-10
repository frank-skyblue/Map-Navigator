<script setup lang="ts">
import {GoogleMap, Marker} from "vue3-google-map";
import {ref, onMounted} from "vue";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "API_KEY";
const center = ref({lat: 40.689247, lng: -74.044502});
const searchQuery = ref("");

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      center.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }
};

const searchLocation = (e: any) => {
  e.preventDefault();

  console.log(searchQuery.value);
}

</script>

<template>
  <div class="flex flex-col gap-3 flex-1 min-w-0">
    <div class="flex flex-wrap gap-2 justify-between">
      <button class="basis-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              @click="getCurrentLocation">
        Get Current Location
      </button>
      <form class="min-w-0 flex gap-1 justify-between" @submit="searchLocation">
        <input
            class="min-w-0 shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="search"
            placeholder="Search Locations..."
            v-model="searchQuery">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go
        </button>
      </form>
    </div>
    <GoogleMap :api-key="apiKey" style="flex-grow: 1; flex-shrink: 1; flex-basis: 0" :center="center" :zoom="15">
      <Marker :options="{ position: center }"/>
    </GoogleMap>
  </div>
  <div class="flex-1 lg:flex-grow-0 lg:basis-96">2</div>
</template>