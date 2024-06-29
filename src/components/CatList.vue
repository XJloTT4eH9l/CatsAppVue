<script setup lang="ts">
    import { useSavedCats } from '@/stores/savedCats';
    import type { catObject } from '@/types';

    defineProps<{
        catList: catObject[]
        type: string
    }>()

    const savedCatsStore = useSavedCats();
</script>

<template>
    <ul class="cats-list">
        <li
            v-for="cat in catList" 
            :key="cat.id"
            :class="['cats-list__item', type]"
            @click="savedCatsStore.removeCatFromSaved(cat.id, type)"
        >
            <img :src="cat.url" :alt="cat.id">
        </li>
    </ul>
</template>