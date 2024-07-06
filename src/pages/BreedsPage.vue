<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    import HeaderPanel from '@/components/HeaderPanel.vue';
    import BackButton from '@/components/BackButton.vue';
    import PageTitle from '@/components/PageTitle.vue';
    import BreedItem from '@/components/BreedItem.vue';
    import Loader from '@/components/Loader.vue';

    import { BREEDS } from '@/catApi';
    import type { breedItemShort } from '@/types';
    import type { Ref } from 'vue';

    const breedsList: Ref<breedItemShort[]> = ref([]);
    const isLoading: Ref<boolean> = ref(false);

    const getBreeds = async () => {
        try {
            isLoading.value = true;
            const responce = await fetch(BREEDS);

            if(!responce.ok) {
                throw new Error('Cant get data')
            }

            const responceJson = await responce.json();

            breedsList.value = responceJson;
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
        <div class="page-header">
            <BackButton />
            <PageTitle />
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