<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useApiRequests } from '@/stores/apiRequests';
    import type { CatObject, SelectItem } from '@/types';
    import type { Ref } from 'vue';

    import HeaderPanel from '../components/HeaderPanel.vue';
    import BackButton from '../components/BackButton.vue';
    import PageTitle from '../components/PageTitle.vue';
    import Select from '@/components/Select.vue';
    import CatList from '@/components/CatList.vue';
    import Loader from '@/components/Loader.vue';

    const orderOptions: SelectItem[] = [
        { name: 'Random', value: 'RANDOM' },
        { name: 'Asc', value: 'ASC' },
        { name: 'Desc', value: 'DESC' },
    ];
    const typeOptions: SelectItem[] = [
        { name: 'All', value: 'jpg,png,gif' },
        { name: 'Static', value: 'jpg,png,' },
        { name: 'Animated', value: 'gif' },
    ];
    const limitOptions: SelectItem[] = [
        { name: 'Limit: All', value:'25' },
        { name: 'Limit: 5', value:'5' },
        { name: 'Limit: 10', value:'10' },
        { name: 'Limit: 15', value:'15' },
        { name: 'Limit: 20', value:'20' },
    ];

    const apiRequests = useApiRequests();
    const galleryItems: Ref<CatObject[]> = ref([]);
    const order: Ref<string> = ref(orderOptions[0].value);
    const type: Ref<string> = ref(typeOptions[0].value);
    const limit: Ref<string> = ref(limitOptions[0].value);

    const getImages = (): void => {
        const searchParams = new URLSearchParams({ order: order.value, mime_types: type.value, limit: limit.value  });
        apiRequests.getGalleryItems(searchParams.toString()).then(res => {
            if(!res) return
            galleryItems.value = res;
        });
    }

    const onOrderChange = (option: string): void => {
        order.value = option;
        getImages();
    };
    const onTypeChange = (option: string): void => {
        type.value = option;
        getImages();
    };
    const onLimitChange = (option: string): void => {
        limit.value = option;
        getImages();
    };

    onMounted(() => {
        getImages();
    });
</script>

<template>
    <HeaderPanel />
    <section class="page-container">
        <div class="page-header">
            <BackButton />
            <PageTitle />
        </div>
        <div class="filters">
            <div class="filters__top">
                <Select 
                    :selectOptions="orderOptions"
                    @handleChange="onOrderChange"
                />
                <Select 
                    :selectOptions="typeOptions"
                    @handleChange="onTypeChange"
                />
            </div>
            <div class="filters__bottom">
                <Select
                    :selectOptions="limitOptions"
                    @handleChange="onLimitChange"
                />
                <button class="filters__get-btn" @click="getImages" />
            </div>
        </div>
        <Loader v-if="apiRequests.isLoading" />
        <CatList 
            v-else-if="galleryItems.length > 0"
            :catList="galleryItems"
            type="favorite"
        />
    </section>
</template>

<style lang="scss">
    @import '../assets/variables.scss';

    .filters {
        padding: 10px 20px;
        margin-bottom: 20px;
        border-radius: 20px;
        background-color: $gray_light;
        .select {
            width: 50%;
            background-color: $white;
            color: $black;
            justify-content: space-between;
            &__content {
                background-color: $white;
                width: 100%;
            }
        }
        &__top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 10px;
        }
        &__bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            .select {
                width: 100%;
            }
        }
        &__get-btn {
            width: 40px;
            height: 40px;
            min-width: 40px;
            display: grid;
            place-items: center;
            background-color: $white;
            border-radius: 10px;
            transition: background-color 0.2s linear;
            &::before {
                content: '';
                display: block;
                width: 20px;
                height: 20px;
                background-repeat: no-repeat;
                background-position: center;
                background-image: url("data:image/svg+xml,%3Csvg width='18' height='20' viewBox='0 0 18 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.48189 2.49989L6.93396 0.953004L7.88633 0L11.0577 3.16928L7.88634 6.33873L6.93395 5.38576L8.47232 3.84832C4.51244 3.99813 1.3473 7.25498 1.3473 11.2478C1.3473 15.3361 4.66547 18.6527 8.75744 18.6527C12.8494 18.6527 16.1676 15.3361 16.1676 11.2478V10.5742H17.5149V11.2478C17.5149 16.081 13.5927 20 8.75744 20C3.92221 20 0 16.081 0 11.2478C0 6.50682 3.77407 2.64542 8.48189 2.49989Z' fill='%23FF868E'/%3E%3C/svg%3E%0A");
            }
            @media screen and (min-width: 768px) {
                &:hover {
                    background-color: $pink_hover;
                }
            }
            &:active {
                background-color: $pink_hover;
            }
        }
    }
</style>