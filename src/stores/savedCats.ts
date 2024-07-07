import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useUserLogs } from '@/stores/userLogs';
import type { catObject } from '@/types';
import type { Ref } from 'vue';

export const useSavedCats = defineStore('savedCats', () => {
    const likedCats: Ref<catObject[]> = ref([]);
    const dislikedCats: Ref<catObject[]> = ref([]);
    const favoriteCats: Ref<catObject[]> = ref([]);
    const userLogsStore = useUserLogs();

    const addCatToSaved = (cat: catObject, type: string): void => {
        switch (type) {
            case 'likes': 
                likedCats.value.push(cat);
                break;
            case 'dislikes':
                dislikedCats.value.push(cat);
                break;
            case 'favorite':
                favoriteCats.value.push(cat);
                break;
        }

        userLogsStore.addLog(cat.id, 'added', type);
    }

    const removeCatFromSaved = (id: string, type: string): void => {
        switch (type) {
            case 'likes': 
                likedCats.value = likedCats.value.filter(cat => cat.id !== id);
                break;
            case 'dislikes':
                dislikedCats.value = dislikedCats.value.filter(cat => cat.id !== id);
                break;
            case 'favorite':
                favoriteCats.value = favoriteCats.value.filter(cat => cat.id !== id);
                break;
        }

        userLogsStore.addLog(id, 'removed', type);
    }
    
    return {
        likedCats, 
        dislikedCats, 
        favoriteCats, 
        addCatToSaved, 
        removeCatFromSaved, 
    }
});
