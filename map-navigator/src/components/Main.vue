<script setup lang="ts">
import {GoogleMap, Marker} from "vue3-google-map";
import {onMounted, ref} from "vue";

const DEFAULT_CENTER = {lat: 40.689247, lng: -74.044502};
const apiKey = "AIzaSyCy7FWpnxSMWzNscku--4aFIgshPCFgaVI";
const center = ref({lat: DEFAULT_CENTER.lat, lng: DEFAULT_CENTER.lng});
let searchCoords = {lat: DEFAULT_CENTER.lat, lng: DEFAULT_CENTER.lng};
const searchInput = ref();

let autocomplete: google.maps.places.Autocomplete;
const options = {
  fields: ["formatted_address", "geometry", "name"],
  strictBounds: false,
};
onMounted(() => {
  autocomplete = new google.maps.places.Autocomplete(searchInput.value, options);
  google.maps.event.addListener(autocomplete, "place_changed", () => {
    const place = autocomplete.getPlace();
    searchCoords = {
      lat: place.geometry?.location?.lat() ?? DEFAULT_CENTER.lat,
      lng: place.geometry?.location?.lng() ?? DEFAULT_CENTER.lng
    };
  });
});

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
  center.value = {
    lat: searchCoords.lat,
    lng: searchCoords.lng,
  };
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
            ref="searchInput"
            class="min-w-0 shadow appearance-none border border-blue-900 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="search"
            placeholder="Search Locations...">
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