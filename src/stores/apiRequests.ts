import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import { VOTING_IMG } from '@/catApi';
import type { CatObject } from '@/types';

export const useApiRequests = defineStore('apiRequests', () => {
    const isLoading:Ref<boolean> = ref(false);
    const isError:Ref<boolean> = ref(false);

    const fetchHelper = async (url: string): Promise<any | null> => {
        try {
            isLoading.value = true;
            const response = await fetch(url);

            if(!response.ok) {
                throw new Error('Cant get data')
            } else {
                isError.value = false;
            }

            return await response.json();
        } catch (error) {
            isError.value = true;
            return null
        } finally {
            isLoading.value = false;
        }
    }

    const getVote = async (): Promise<CatObject[] | null> => {
        return fetchHelper(VOTING_IMG);
    }

    return {
        isLoading,
        isError,
        getVote
    }
});