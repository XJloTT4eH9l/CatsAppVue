<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import type { breedItemShort } from '@/types';

    defineProps<{
        item: breedItemShort
    }>()
</script>

<template>
    <RouterLink 
        :to="{ name: 'BreedsItemPage', params: {id: item.id} }" 
        class="cats-list__item breed"
    >
        <img 
            v-if="item.image"
            :alt="item.name"
            :width="item.image.width"
            :height="item.image.height"
            :src="item.image.url"
            class="cats-list__item-img"
        >
        <img 
            v-else 
            :alt="item.name" 
            src="../assets/img/cat-placeholder.png" 
            class="cats-list__item-img"
        />
        <span class="cats-list__item-name">{{ item.name }}</span>
    </RouterLink>
</template>