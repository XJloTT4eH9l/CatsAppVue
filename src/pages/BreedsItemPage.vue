<script setup lang="ts">
    import { ref, onMounted, watchEffect } from 'vue';
    import { useRoute } from 'vue-router';
    import { useApiRequests } from '@/stores/apiRequests';
    import { storeToRefs } from 'pinia';
    import type { Ref } from 'vue';
    import type { BreedItem } from '@/types';

    import HeaderPanel from '@/components/HeaderPanel.vue';
    import BackButton from '@/components/BackButton.vue';
    import PageTitle from '@/components/PageTitle.vue';
    import Loader from '@/components/Loader.vue';
    import ErrorMessage from '@/components/ErrorMessage.vue';

    const apiRequests = useApiRequests();
    const { isLoading, isError } = storeToRefs(apiRequests);
    const { getBreedItem } = apiRequests;
    const route = useRoute();
    const id: Ref<string> = ref(route.params.id as string)
    const breedInfo: Ref<BreedItem | null> = ref(null);

    const getBreedItemInfo = (): void => {
        getBreedItem(id.value).then(res => {
            if(!res) return
            breedInfo.value = res;
        });
    };

    watchEffect(() => {
        const newPath = route.fullPath;
        const newId = newPath.substring(newPath.lastIndexOf('/') + 1);
        id.value = newId;

        getBreedItemInfo();
    });

    onMounted(() => {
        getBreedItemInfo();
    });
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
        <ErrorMessage
            v-if="isError"
            @reload="getBreedItemInfo" 
        />
    </section>
</template>

<style lang="scss">
    @import '../assets/variables.scss';

    .breed-item-info {
        position: relative;
        padding: 40px;
        border: 2px solid $pink_hover;
        border-radius: 20px;
        @media screen and (max-width: 650px) {
            padding: 25px;
        }
        &__img {
            height: 360px;
            width: 100%;
            border-radius: 20px;
            object-fit: cover;
            margin-bottom: 40px;
            @media screen and (max-width: 650px) {
                height: 260px;
            }
        }
        &__name {
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 0 20px;
            font-size: 36px;
            font-weight: 700;
            width: max-content;
            background-color: $white;
            z-index: 2;
            @media screen and (max-width: 650px) {
                font-size: 20px;
                top: -15px;
            }
        }
        &__description {
            margin-bottom: 20px;
            font-size: 20px;
            font-weight: 500;
            line-height: 28px;
            color: $gray;
            @media screen and (max-width: 650px) {
                font-size: 16px;
            }
        }
        &__info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            @media screen and (max-width: 650px) {
                grid-template-columns: 1fr;
            }
        }
        .info-item {
            font-size: 16px;
            line-height: 24px;
            color: $gray;
            &.temp {
                display: flex;
                flex-direction: column;
            }
            strong {
                display: inline-block;
                margin-right: 10px;
                color: $black;
                font-weight: 600;
            }
            &:not(:last-child) {
                margin-bottom: 10px;
            }
        }
    }
</style>