<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useApiRequests } from '@/stores/apiRequests';

    import HeaderPanel from '@/components/HeaderPanel.vue';
    import BackButton from '@/components/BackButton.vue';
    import PageTitle from '@/components/PageTitle.vue';
    import BreedItem from '@/components/BreedItem.vue';
    import Select from '@/components/Select.vue';
    import Loader from '@/components/Loader.vue';

    import type { BreedItemShort } from '@/types';
    import type { Ref } from 'vue';

    const apiRequests = useApiRequests();
    const breedsList: Ref<BreedItemShort[]> = ref([]);
    const sorting: Ref<string> = ref('down');
    const limitOptions: string[] = ['All', '5', '10', '15', '20'];

    const getBreedsHandler = (params?: string): void => {
        apiRequests.getBreeds(sorting.value, params).then(res => {
            if(!res) return
            breedsList.value = res;
        });
    }

    const onLimitChanged = (option: string): void => {
        if(option === 'All') {
            getBreedsHandler();
            return
        }

        const searchParams = new URLSearchParams({ limit: option });
        getBreedsHandler(searchParams.toString());
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
        <Loader v-if="apiRequests.isLoading" />
        <div class="cats-list" v-else-if="breedsList.length > 0">
            <BreedItem 
                v-for="item in breedsList"
                :key="item.id"
                :item="item"
            />
        </div>
    </section>
</template>