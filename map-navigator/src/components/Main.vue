<script setup lang="ts">
import {ref} from "vue";
import {type Ref} from "vue";
import {type LocationType} from "@/components/Types";

import Map from "./Map.vue";
import MapList from "./MapList.vue";

let id = 0;

const locations: Ref<LocationType[]> = ref([]);
const totalLocations = ref(0);

const addLocation = (coords: {lat: number, lng: number}, name: string) => {
  if (locations.value.some((location) => location.name === name)) {
    return;
  }
  locations.value.push({
    id: id++,
    coords: coords,
    name: name
  });
  totalLocations.value++;
};

const removeLocation = (id: number) => {
  locations.value = locations.value.filter((location) => location.id !== id);
  totalLocations.value--;
};

</script>

<template>
  <Map :locations="locations" @addLocation="addLocation"/>
  <MapList :locations="locations" :totalLocations="totalLocations" @removeLocation="removeLocation"/>
</template>