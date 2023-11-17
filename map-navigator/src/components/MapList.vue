<script setup lang="ts">
import Paginate from "vuejs-paginate-next";

import {type PropType, ref} from "vue";
import {type LocationType} from "@/components/Types";
import MapListItem from "./MapListItem.vue";

const props = defineProps({
  locations: {
    type: Array as PropType<LocationType[]>,
    required: true,
  },
  totalLocations: {
    type: Number,
    required: true,
  },
});

const start = ref(0);
const end = ref(10);

const setCurrentPage = (page: number) => {
  start.value = (page - 1) * 10;
  end.value = start.value + 10;
};

</script>

<template>
  <div class="flex items-center flex-col flex-1 lg:flex-grow-0 lg:basis-96 text-center">
    <h2 class="text-2xl mb-3">Searched Locations</h2>
    <div class="flex-1 flex flex-col gap-1.5 w-full p-3">
      <MapListItem v-for="location in locations.slice(start, end)"
                   :key="location.id"
                   :location="location"
                    @removeLocation="$emit('removeLocation', location.id)"
      />
    </div>
    <paginate
        :page-count="Math.floor(totalLocations / 11) + 1"
        :page-range="3"
        :margin-pages="2"
        :click-handler="setCurrentPage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
    >
    </paginate>
  </div>
</template>

<style lang="css">
  .pagination {
    width: 100%;
    max-width: 24rem;
    display: flex;
    justify-content: space-between;
  }

  .page-item {
    width: 40px;
    height: 30px;
    border: 1px solid black;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .page-item:hover {
    background-color: #e2e8f0;
  }

  .page-item.active {
    background-color: #cbd5e0;
  }
</style>