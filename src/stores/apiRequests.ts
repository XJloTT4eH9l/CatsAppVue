import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import { VOTING_IMG, BREEDS, BREEDS_ITEM, BREED_SEARCH } from '@/catApi';
import type { CatObject, BreedItemShort, BreedItem } from '@/types';

export const useApiRequests = defineStore('apiRequests', () => {
    const isLoading:Ref<boolean> = ref(false);
    const isError:Ref<boolean> = ref(false);
    const isSearchLoading:Ref<boolean> = ref(false);
    const isSearchError:Ref<boolean> = ref(false);

    const fetchHelper = async (url: string, params?: string, sort?: string, isSearch?: boolean): Promise<any> => {
        try {
            if(isSearch) {
                isSearchError.value = false;
                isSearchLoading.value = true;
            } else {
                isError.value = false;
                isLoading.value = true;
            }

            let fetchUrl: string = url;

            if(params) {
                fetchUrl += `&${params}`;
            }

            const response = await fetch(fetchUrl);

            if(!response.ok) {
                throw new Error('Cant get data')
            } else {
                if(isSearch) {
                    isSearchError.value = false;
                } else {
                    isError.value = false;
                }
            }
            
            const responceJson =  await response.json();

            if(sort) {
                return sortBreeds(responceJson, sort);
            }
            
            return responceJson
        } catch (error) {
            if(isSearch) {
                isSearchError.value = true;
            } else {
                isError.value = true;
            }
            return null
        } finally {
            isLoading.value = false;
            isSearchLoading.value = false;
        }
    };

    const sortBreeds = (breeds: BreedItemShort[], direction: string): BreedItemShort[] => {
        return breeds.sort((a, b) => {
            const comparison = a.name.localeCompare(b.name);
            return direction === 'down' ? comparison : -comparison;
        });
    };

    const getVote = async (): Promise<CatObject[] | null> => {
        return await fetchHelper(VOTING_IMG);
    };

    const getBreeds = async (sort: string, params: string): Promise<BreedItemShort[] | null> => {
        return await fetchHelper(BREEDS, params, sort);
    };

    const getBreedItem = async (id: string): Promise<BreedItem | null> => {
        return await fetchHelper(BREEDS_ITEM.replace('id', id));
    };

    const getGalleryItems = async (params: string): Promise<CatObject[] | null> => {
        return await fetchHelper(VOTING_IMG, params);
    };

    const searchBreeds = async (params: string): Promise<BreedItemShort[] | null> => {
        return await fetchHelper(BREED_SEARCH, params, undefined, true);
    }

    return {
        isLoading,
        isError,
        isSearchLoading,
        isSearchError,
        getVote,
        getBreeds,
        getBreedItem,
        getGalleryItems,
        searchBreeds
    }
});