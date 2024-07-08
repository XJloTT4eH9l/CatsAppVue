<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { API_URL, API_KEY } from '@/catApi';
    import type { Ref } from 'vue';
    import type { breedItem } from '@/types';

    import HeaderPanel from '@/components/HeaderPanel.vue';
    import BackButton from '@/components/BackButton.vue';
    import PageTitle from '@/components/PageTitle.vue';
    import Loader from '@/components/Loader.vue';

    const route = useRoute();
    const id = route.params.id;
    const breedInfo: Ref<breedItem | null> = ref(null);
    const isLoading: Ref<boolean> = ref(false);

    const getBreedInfo = async () => {
        try {
            isLoading.value = true;
            const responce = await fetch(`${API_URL}breeds/${id}?api_key=${API_KEY}`);

            if(!responce.ok) {
                throw new Error('Cant get data')
            }

            const responceJson = await responce.json();
            breedInfo.value = responceJson;
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false;
        }
    }

    onMounted(() => {
        getBreedInfo()
    })
</script>

<template>
    <HeaderPanel />
    <section class="page-container">
        <div class="page-header">
            <BackButton />
            <PageTitle title="Breeds" />
            <div class="page-title">{{ id }}</div>
        </div>
        <Loader v-if="isLoading" />
        <template v-else-if="breedInfo">
            <img 
                :src="`https://cdn2.thecatapi.com/images/${breedInfo.reference_image_id}.jpg`" 
                :alt="breedInfo.name"
                class="breed__img"
            />
        </template>
    </section>
</template>

<style lang="scss">
    .breed__img {
        height: 360px;
        width: 100%;
        border-radius: 20px;
        object-fit: cover;
        margin-bottom: 20px;
    }
</style>