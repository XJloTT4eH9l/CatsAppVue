import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import { VOTING_IMG, BREEDS } from '@/catApi';
import type { CatObject, BreedItemShort } from '@/types';

export const useApiRequests = defineStore('apiRequests', () => {
    const isLoading:Ref<boolean> = ref(false);
    const isError:Ref<boolean> = ref(false);

    const fetchHelper = async (url: string, params?: string, sort?: string): Promise<any> => {
        try {
            isLoading.value = true;
            let fetchUrl: string = url;

            if(params) {
                fetchUrl += `&${params}`;
            }

            const response = await fetch(fetchUrl);

            if(!response.ok) {
                throw new Error('Cant get data')
            } else {
                isError.value = false;
            }
            
            const responceJson =  await response.json();

            if(sort) {
                return sortBreeds(responceJson, sort);
            }

            return responceJson
        } catch (error) {
            isError.value = true;
            return null
        } finally {
            isLoading.value = false;
        }
    };

    const getVote = async (): Promise<CatObject[] | null> => {
        return await fetchHelper(VOTING_IMG);
    };

    const getBreeds = async (sort: string, params?: string, ): Promise<BreedItemShort[] | null> => {
        return await fetchHelper(BREEDS, params, sort);
    };

    const sortBreeds = (breeds: BreedItemShort[], direction: string): BreedItemShort[] => {
        return breeds.sort((a, b) => {
            const comparison = a.name.localeCompare(b.name);
            return direction === 'down' ? comparison : -comparison;
        });
    }

    return {
        isLoading,
        isError,
        getVote,
        getBreeds
    }
});