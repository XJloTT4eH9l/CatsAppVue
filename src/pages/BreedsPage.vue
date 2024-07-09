<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    import HeaderPanel from '@/components/HeaderPanel.vue';
    import BackButton from '@/components/BackButton.vue';
    import PageTitle from '@/components/PageTitle.vue';
    import BreedItem from '@/components/BreedItem.vue';
    import Select from '@/components/Select.vue';
    import Loader from '@/components/Loader.vue';

    import { BREEDS } from '@/catApi';
    import type { BreedItemShort } from '@/types';
    import type { Ref } from 'vue';

    const breedsList: Ref<BreedItemShort[]> = ref([]);
    const isLoading: Ref<boolean> = ref(false);
    const limitOptions: string[] = ['All', '5', '10', '15', '20'];
    const sorting: Ref<string> = ref('down');

    const onLimitChanged = (option: string): void => {
        if(option === 'All') {
            getBreeds();
            return
        }

        const searchParams = new URLSearchParams({ limit: option });
        getBreeds(searchParams.toString());
    }

    const sortBreeds = (breeds: BreedItemShort[], direction: string): BreedItemShort[] => {
        return breeds.sort((a, b) => {
            const comparison = a.name.localeCompare(b.name);
            return direction === 'down' ? comparison : -comparison;
        });
    }

    const sortingHandler = (sortOption: string): void => {
        sorting.value = sortOption;
        if(sorting.value === 'down') {
            sortBreeds(breedsList.value, 'down');
        } else {
            sortBreeds(breedsList.value, 'up');
        }
    }

    const getBreeds = async (params?: string): Promise<void> => {
        try {
            isLoading.value = true;
            let url = BREEDS;

            if(params) {    
                url += `&${params}`;
            }

            const responce = await fetch(url);

            if(!responce.ok) {
                throw new Error('Cant get data')
            }

            const responceJson = await responce.json();

            if(sorting.value === 'down') {
                breedsList.value = sortBreeds(responceJson, 'down');
            } else {
                breedsList.value = sortBreeds(responceJson, 'up');
            }
        } catch (error) {
            console.log(error);
        } finally {
            isLoading.value = false;
        }
    }

    onMounted(() => {
        getBreeds()
    })
</script>

<template>
    <HeaderPanel />
    <section class="page-container">
        <div class="page-header page-header--breeds">
            <div class="page-header__left">
                <BackButton />
                <PageTitle />
            </div>
            <div class="page-header__right">
                <Select 
                    name="Limit"
                    :selectOptions="limitOptions"
                    @handleChange=onLimitChanged
                />
                <button 
                    class="sorting-btn up" 
                    :class="sorting === 'up' && 'active'"
                    @click="sortingHandler('up')" 
                />
                <button 
                    class="sorting-btn down" 
                    :class="sorting === 'down' && 'active'"
                    @click="sortingHandler('down')" 
                />
            </div>
        </div>
        <Loader v-if="isLoading"/>
        <div class="cats-list" v-else-if="breedsList.length > 0">
            <BreedItem 
                v-for="item in breedsList"
                :key="item.id"
                :item="item"
            />
        </div>
    </section>
</template>