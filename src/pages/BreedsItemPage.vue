<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useApiRequests } from '@/stores/apiRequests';
    import type { Ref } from 'vue';
    import type { BreedItem } from '@/types';

    import HeaderPanel from '@/components/HeaderPanel.vue';
    import BackButton from '@/components/BackButton.vue';
    import PageTitle from '@/components/PageTitle.vue';
    import Loader from '@/components/Loader.vue';

    import '../assets/variables.scss';
    import '../assets/breed-item-page.scss';

    const apiRequests = useApiRequests();
    const route = useRoute();
    const id = route.params.id as string;
    const breedInfo: Ref<BreedItem | null> = ref(null);

    onMounted(() => {
        apiRequests.getBreedItem(id).then(res => {
            if(!res) return
            breedInfo.value = res;
        });
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
        <Loader v-if="apiRequests.isLoading" />
        <template v-else-if="breedInfo">
            <img 
                v-if="breedInfo.reference_image_id"
                :src="`https://cdn2.thecatapi.com/images/${breedInfo.reference_image_id}.jpg`" 
                :alt="breedInfo.name"
                class="breed-item-info__img"
            />
            <img v-else src="../assets/img/cat-placeholder.png" class="breed-item-info__img" :alt="breedInfo.name">
            <div class="breed-item-info">
                <div class="breed-item-info__name">{{ breedInfo.name }}</div>
                <div class="breed-item-info__description">{{ breedInfo.description }}</div>
                <div class="breed-item-info__info">
                    <div class="left">
                        <div class="info-item temp">
                            <strong>Temperament:</strong>
                            <span>{{ breedInfo.temperament }}</span>
                        </div>
                    </div>
                    <div class="right">
                        <div class="info-item"><strong>Origin:</strong>{{ breedInfo.origin }}</div>
                        <div class="info-item"><strong>Weight:</strong>{{ breedInfo.weight.metric }} kg</div>
                        <div class="info-item"><strong>Life span:</strong>{{ breedInfo.life_span }} years</div>
                    </div>
                </div>
            </div>
        </template>
    </section>
</template>