import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { catObject } from '@/types';

export const useSavedCats = defineStore('savedCats', () => {
    const likedCats = ref<catObject[]>([]);
    const dislikedCats = ref<catObject[]>([]);
    const favoriteCats = ref<catObject[]>([]);

    const addCatToSaved = (cat: catObject, type: string) => {
        switch (type) {
            case 'likes': 
                likedCats.value.push(cat);
                break
            case 'dislikes':
                dislikedCats.value.push(cat);
                break
            case 'favorite':
                favoriteCats.value.push(cat);
                break
        }
    }

    const removeCatFromSaved = (id: string, type: string) => {
        switch (type) {
            case 'likes': 
                likedCats.value = likedCats.value.filter(cat => cat.id !== id);
                break
            case 'dislikes':
                dislikedCats.value = dislikedCats.value.filter(cat => cat.id !== id);
                break
            case 'favorite':
                favoriteCats.value = favoriteCats.value.filter(cat => cat.id !== id);
                break
        }
    }

    return {
        likedCats, dislikedCats, favoriteCats, addCatToSaved, removeCatFromSaved
    }
})
