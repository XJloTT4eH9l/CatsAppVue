import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import type { userActionType } from '@/types';

export const useUserLogs = defineStore('userLogs', () => {
    const userLogs: Ref<userActionType[]> = ref([]);

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

    const addLog = (id: string, status: string, type: string): void => {
        const userLog: userActionType = {
            id,
            status,
            type,
            time: getCurrentTime()
        }

        userLogs.value.push(userLog);
    }

    return { 
        userLogs, 
        getLikesLogs, 
        getDislikesLogs, 
        getFavoriteLogs, 
        addLog 
    }
});