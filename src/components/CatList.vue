<script setup lang="ts">
    import { useSavedCats } from '@/stores/savedCats';
    import type { CatObject } from '@/types';

    defineProps<{
        catList: CatObject[]
        type: string
    }>()

    const savedCatsStore = useSavedCats();

    const onCatClick = (cat: CatObject, type: string): void => {
        let isAdded;

        switch (type) {
            case 'likes':
                isAdded = savedCatsStore.likedCats.find(item => item.id === cat.id);
                break;
            case 'dislikes':
                isAdded = savedCatsStore.dislikedCats.find(item => item.id === cat.id);
                break;
            case 'favorite':
                isAdded = savedCatsStore.favoriteCats.find(item => item.id === cat.id);
                break;
        }

        if(isAdded) {
            savedCatsStore.removeCatFromSaved(cat.id, type);
        } else {
            savedCatsStore.addCatToSaved(cat, type);
        }
    }
</script>

<template>
    <ul class="cats-list">
        <li
            v-for="cat in catList" 
            :key="cat.id"
            :class="['cats-list__item', type]"
            @click="onCatClick(cat, type)"
        >
            <img :src="cat.url" :alt="cat.id">
        </li>
    </ul>
</template>