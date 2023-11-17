<script setup lang="ts">
import {type PropType} from "vue";
import {type LocationType} from "@/components/Types";

const props = defineProps({
  location: {
    type: Object as PropType<LocationType>,
    required: true,
  },
});

const emit = defineEmits(["removeLocation"]);

</script>

<template>
  <div class="w-full border-2 rounded px-2 py-1">
    <div class="flex justify-between items-center">
      <h3 class="text-xl">{{location.name}}</h3>
      <button class="text-red-500" @click="$emit('removeLocation')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    <div class="flex justify-between items-center">
      <p class="text-sm">{{location.coords.lat.toFixed(6)}}, {{location.coords.lng}}</p>
    </div>
  </div>
</template>