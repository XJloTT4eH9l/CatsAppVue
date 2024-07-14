<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useApiRequests } from '@/stores/apiRequests';
    import { storeToRefs } from 'pinia';
    import type { BreedItemShort, SelectItem } from '@/types';
    import type { Ref } from 'vue';

    import HeaderPanel from '@/components/HeaderPanel.vue';
    import BackButton from '@/components/BackButton.vue';
    import PageTitle from '@/components/PageTitle.vue';
    import BreedItem from '@/components/BreedItem.vue';
    import Select from '@/components/Select.vue';
    import Loader from '@/components/Loader.vue';
    import ErrorMessage from '@/components/ErrorMessage.vue';

    const apiRequests = useApiRequests();
    const { isLoading, isError } = storeToRefs(apiRequests);
    const { getBreeds } = apiRequests;
    const breedsList: Ref<BreedItemShort[]> = ref([]);
    const sorting: Ref<string> = ref('down');
    const limit: Ref<string> = ref('All');

    const limitOptions: SelectItem[] = [
        { name: 'Limit: All', value:'' },
        { name: 'Limit: 5', value:'5' },
        { name: 'Limit: 10', value:'10' },
        { name: 'Limit: 15', value:'15' },
        { name: 'Limit: 20', value:'20' },
    ];

    const getBreedsHandler = (): void => {
        const searchParams = new URLSearchParams({ limit: limit.value  });
        getBreeds(sorting.value, searchParams.toString()).then(res => {
            if(!res) return
            breedsList.value = res;
        });
    }

    const onLimitChanged = (option: string): void => {
        limit.value = option;
        getBreedsHandler();
    }

    const sortingHandler = (sortOption: string): void => {
        sorting.value = sortOption;
        getBreedsHandler();
    }

    onMounted(() => {
        getBreedsHandler();
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
        <Loader v-if="isLoading" />
        <div class="cats-list" v-else-if="breedsList.length > 0">
            <BreedItem 
                v-for="item in breedsList"
                :key="item.id"
                :item="item"
            />
        </div>
        <ErrorMessage
            v-if="isError"
            @reload="getBreedsHandler" 
        />
    </section>
</template>