import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { catObject, userActionType } from '@/types';

export const useSavedCats = defineStore('savedCats', () => {
    const likedCats = ref<catObject[]>([]);
    const dislikedCats = ref<catObject[]>([]);
    const favoriteCats = ref<catObject[]>([]);
    const userLogs = ref<userActionType[]>([]);

    const addCatToSaved = (cat: catObject, type: string) => {
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

        const userAction: userActionType = {
            id: cat.id,
            status: 'added',
            type,
            time: getCurrentTime()
        }

        userLogs.value.push(userAction);
    }

    const removeCatFromSaved = (id: string, type: string) => {
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

        const userAction: userActionType = {
            id,
            status: 'removed',
            type,
            time: getCurrentTime()
        }

        userLogs.value.push(userAction);
    }

    const getLikesLogs = computed<userActionType[]>(() => userLogs.value.filter(log => log.type === 'likes'));
    const getDislikesLogs = computed<userActionType[]>(() => userLogs.value.filter(log => log.type === 'dislikes'));
    const getFavoriteLogs = computed<userActionType[]>(() => userLogs.value.filter(log => log.type === 'favorite'));

    const getCurrentTime = (): string => {
        const now = new Date();
        let hours: string | number = now.getHours();
        let minutes: string | number = now.getMinutes();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutes}`;
    }

    return {
        likedCats, 
        dislikedCats, 
        favoriteCats, 
        addCatToSaved, 
        removeCatFromSaved, 
        userLogs,
        getLikesLogs,
        getDislikesLogs,
        getFavoriteLogs
    }
});
