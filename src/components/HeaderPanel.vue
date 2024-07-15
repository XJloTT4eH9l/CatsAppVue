<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { RouterLink } from 'vue-router';
    import { useApiRequests } from '@/stores/apiRequests';
    import { storeToRefs } from 'pinia';
    import type { Ref } from 'vue';
    import type { BreedItemShort } from '@/types';

    import MobileMenu from '@/components/MobileMenu.vue';
    import Loader from '@/components/Loader.vue';

    const apiRequests = useApiRequests();
    const { isSearchLoading, isSearchError } = storeToRefs(apiRequests);
    const { searchBreeds } = apiRequests;
    const searchValue: Ref<string> = ref('');
    const searchedBreeds: Ref<BreedItemShort[]> = ref([]);
    const searchOpen: Ref<boolean> = ref(false);
    
    const searchToggle = () => searchOpen.value = !searchOpen.value; 

    watch(searchValue, () => {
        const searchParams = new URLSearchParams({ q: searchValue.value  });
        searchBreeds(searchParams.toString()).then(res => {
            if(!res) return;
            searchedBreeds.value = res;
        });
    });
</script>

<template>
    <header class="header">
        <div class="header__left">
            <MobileMenu />
            <div class="header__input-container">
                <label class="header__search-icon" for="search" />
                <input
                    v-model="searchValue"
                    type="text"
                    id="search-breeds"
                    class="header__input"
                    placeholder="Search for breeds by name"
                    @click.stop="searchToggle"
                >
                <div 
                    class="search-overlay" 
                    :class="searchOpen && 'active'" 
                    @click.stop="searchToggle" 
                />
                <div 
                    class="search-breeds" 
                    :class="searchOpen && searchValue.length > 0 && 'active'"
                >
                    <Loader v-if="isSearchLoading" />
                    <p 
                        v-if="!isSearchLoading && searchValue.length > 0 && searchedBreeds.length  === 0"
                        class="search-breeds__not-found"
                    >
                        Nothing been founded
                    </p>
                    <div class="search-breeds__items" v-if="!isSearchLoading && searchedBreeds.length > 0">
                        <RouterLink 
                            v-for="item in searchedBreeds"
                            :to="{ name: 'BreedsItemPage', params: {id: item.id} }" 
                            @click="searchToggle"
                            class="search-breeds__item"
                        >
                            {{ item.name }}
                        </RouterLink> 
                    </div>
                    <p v-if="isSearchError" class="search-breeds__not-found">Something went wrong... Try later</p>
                </div>
            </div>
        </div>
        <div class="header__links">
            <RouterLink class="header__link likes" to="/likes" />
            <RouterLink class="header__link favorites" to="/favorites" />
            <RouterLink class="header__link dislikes" to="/dislikes" />
        </div>
    </header>
</template>

<style lang="scss">
    @import '../assets/variables.scss';

    .header {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
        @media screen and (max-width: 680px) {
            padding-bottom: 50px;
        }
        &__left {
            display: flex;
            gap: 10px;
        }
        &__links {
            display: flex;
            gap: 10px;
        }
        &__input-container {
            position: relative;
            @media screen and (max-width: 680px) {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
            }
        }
        &__search-icon {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            display: block;
            width: 30px;
            height: 30px;
            border-radius: 10px;
            background-color: $pink_hover;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url("data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_2_2)'%3E%3Cmask id='mask0_2_2' style='mask-type:luminance' maskUnits='userSpaceOnUse' x='0' y='0' width='15' height='15'%3E%3Cpath d='M15 0H0V15H15V0Z' fill='white'/%3E%3C/mask%3E%3Cg mask='url(%23mask0_2_2)'%3E%3Cpath d='M14.5206 13.6626L10.9505 9.94965C11.8685 8.85848 12.3714 7.48552 12.3714 6.05624C12.3714 2.71688 9.65452 0 6.31516 0C2.9758 0 0.258911 2.71688 0.258911 6.05624C0.258911 9.39563 2.9758 12.1125 6.31516 12.1125C7.56877 12.1125 8.76345 11.7343 9.78488 11.0166L13.382 14.7578C13.5323 14.9139 13.7346 15 13.9513 15C14.1564 15 14.351 14.9218 14.4987 14.7796C14.8126 14.4776 14.8226 13.9768 14.5206 13.6626ZM6.31516 1.57989C8.78347 1.57989 10.7915 3.58793 10.7915 6.05624C10.7915 8.52458 8.78347 10.5326 6.31516 10.5326C3.84684 10.5326 1.8388 8.52458 1.8388 6.05624C1.8388 3.58793 3.84684 1.57989 6.31516 1.57989Z' fill='%23FF868E'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_2_2'%3E%3Crect width='15' height='15' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
        }
        &__input {
            width: 400px;
            height: 40px;
            font-size: 14px;
            padding: 5px 45px 5px 10px;
            border-radius: 10px;
            background-color: $white;
            border: 2px solid transparent;
            transition: border-color .2s linear;
            @media screen and (max-width: 680px) {
                width: 100%;
            }
            &:hover {
                border-color: $pink_hover;
            }
            &:focus {
                border-color: $pink;
            }
        }
        &__link {
            width: 40px;
            height: 40px;
            min-width: 40px;
            background-color: $white;
            border-radius: 10px;
            background-position: center;
            background-repeat: no-repeat;
            transition: background-color 0.2s linear;
            &.router-link-active {
                background-color: $pink;
                &:hover {
                    background-color: $pink;
                }
            }
            &:hover {
                background-color: $pink_hover;
            }
            &.likes {
                &.router-link-active {
                    background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1_2)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 10C0 4.47715 4.47715 0 10 0C15.5229 0 20 4.47715 20 10C20 15.5229 15.5229 20 10 20C4.47715 20 0 15.5229 0 10ZM10 1.33333C5.21353 1.33333 1.33333 5.21353 1.33333 10C1.33333 14.7865 5.21353 18.6667 10 18.6667C14.7865 18.6667 18.6667 14.7865 18.6667 10C18.6667 5.21353 14.7865 1.33333 10 1.33333ZM6.66667 8H5.33333V6.66667H6.66667V8ZM14.6667 8H13.3333V6.66667H14.6667V8ZM6.13333 11.0667L6.53333 11.6C8.26667 13.9111 11.7333 13.9111 13.4667 11.6L13.8667 11.0667L14.9333 11.8667L14.5333 12.4C12.2667 15.4222 7.73333 15.4222 5.46667 12.4L5.06667 11.8667L6.13333 11.0667Z' fill='white'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1_2'%3E%3Crect width='20' height='20' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
                } 
                background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1_2)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 10C0 4.47715 4.47715 0 10 0C15.5229 0 20 4.47715 20 10C20 15.5229 15.5229 20 10 20C4.47715 20 0 15.5229 0 10ZM10 1.33333C5.21353 1.33333 1.33333 5.21353 1.33333 10C1.33333 14.7865 5.21353 18.6667 10 18.6667C14.7865 18.6667 18.6667 14.7865 18.6667 10C18.6667 5.21353 14.7865 1.33333 10 1.33333ZM6.66667 8H5.33333V6.66667H6.66667V8ZM14.6667 8H13.3333V6.66667H14.6667V8ZM6.13333 11.0667L6.53333 11.6C8.26667 13.9111 11.7333 13.9111 13.4667 11.6L13.8667 11.0667L14.9333 11.8667L14.5333 12.4C12.2667 15.4222 7.73333 15.4222 5.46667 12.4L5.06667 11.8667L6.13333 11.0667Z' fill='%23FF868E'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1_2'%3E%3Crect width='20' height='20' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
            }
            &.favorites {
                &.router-link-active {
                    background-image: url("data:image/svg+xml,%3Csvg width='20' height='17' viewBox='0 0 20 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.38071 1.30769C3.14541 1.30769 1.33333 3.08492 1.33333 5.27724C1.33333 6.33003 1.75975 7.33969 2.51878 8.08416L10 15.4215L17.4812 8.08416C18.2403 7.33969 18.6667 6.33003 18.6667 5.27724C18.6667 3.08492 16.8546 1.30769 14.6193 1.30769C13.5459 1.30769 12.5164 1.72591 11.7573 2.47034L10.4714 3.73158C10.2111 3.98692 9.78893 3.98692 9.5286 3.73158L8.24267 2.47035C7.4836 1.72591 6.45414 1.30769 5.38071 1.30769ZM0 5.27724C0 2.3627 2.40903 0 5.38071 0C6.80773 0 8.1764 0.555994 9.18547 1.54567L10 2.34456L10.8145 1.54567C11.8236 0.555993 13.1923 0 14.6193 0C17.591 0 20 2.3627 20 5.27724C20 6.67682 19.4331 8.01917 18.424 9.00883L10.4714 16.8085C10.2111 17.0638 9.78893 17.0638 9.5286 16.8085L1.57597 9.00883C0.566893 8.01917 0 6.67682 0 5.27724Z' fill='white'/%3E%3C/svg%3E");
                }
                background-image: url("data:image/svg+xml,%3Csvg width='20' height='17' viewBox='0 0 20 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.38071 1.30769C3.14541 1.30769 1.33333 3.08492 1.33333 5.27724C1.33333 6.33003 1.75975 7.33969 2.51878 8.08416L10 15.4215L17.4812 8.08416C18.2403 7.33969 18.6667 6.33003 18.6667 5.27724C18.6667 3.08492 16.8546 1.30769 14.6193 1.30769C13.5459 1.30769 12.5164 1.72591 11.7573 2.47034L10.4714 3.73158C10.2111 3.98692 9.78893 3.98692 9.5286 3.73158L8.24267 2.47035C7.4836 1.72591 6.45414 1.30769 5.38071 1.30769ZM0 5.27724C0 2.3627 2.40903 0 5.38071 0C6.80773 0 8.1764 0.555994 9.18547 1.54567L10 2.34456L10.8145 1.54567C11.8236 0.555993 13.1923 0 14.6193 0C17.591 0 20 2.3627 20 5.27724C20 6.67682 19.4331 8.01917 18.424 9.00883L10.4714 16.8085C10.2111 17.0638 9.78893 17.0638 9.5286 16.8085L1.57597 9.00883C0.566893 8.01917 0 6.67682 0 5.27724Z' fill='%23FF868E'/%3E%3C/svg%3E");
            }
            &.dislikes {
                &.router-link-active {
                    background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1_6)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 10C0 4.47715 4.47715 0 10 0C15.5229 0 20 4.47715 20 10C20 15.5229 15.5229 20 10 20C4.47715 20 0 15.5229 0 10ZM10 1.33333C5.21353 1.33333 1.33333 5.21353 1.33333 10C1.33333 14.7865 5.21353 18.6667 10 18.6667C14.7865 18.6667 18.6667 14.7865 18.6667 10C18.6667 5.21353 14.7865 1.33333 10 1.33333ZM6.66667 8H5.33333V6.66667H6.66667V8ZM14.6667 8H13.3333V6.66667H14.6667V8ZM5.06667 13.4667L5.46667 12.9333C7.73333 9.91113 12.2667 9.91113 14.5333 12.9333L14.9333 13.4667L13.8667 14.2667L13.4667 13.7333C11.7333 11.4222 8.26667 11.4222 6.53333 13.7333L6.13333 14.2667L5.06667 13.4667Z' fill='white'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1_6'%3E%3Crect width='20' height='20' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
                }
                background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1_6)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 10C0 4.47715 4.47715 0 10 0C15.5229 0 20 4.47715 20 10C20 15.5229 15.5229 20 10 20C4.47715 20 0 15.5229 0 10ZM10 1.33333C5.21353 1.33333 1.33333 5.21353 1.33333 10C1.33333 14.7865 5.21353 18.6667 10 18.6667C14.7865 18.6667 18.6667 14.7865 18.6667 10C18.6667 5.21353 14.7865 1.33333 10 1.33333ZM6.66667 8H5.33333V6.66667H6.66667V8ZM14.6667 8H13.3333V6.66667H14.6667V8ZM5.06667 13.4667L5.46667 12.9333C7.73333 9.91113 12.2667 9.91113 14.5333 12.9333L14.9333 13.4667L13.8667 14.2667L13.4667 13.7333C11.7333 11.4222 8.26667 11.4222 6.53333 13.7333L6.13333 14.2667L5.06667 13.4667Z' fill='%23FF868E'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1_6'%3E%3Crect width='20' height='20' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
            }
            &.burger-open {
                background-image: url("data:image/svg+xml,%3Csvg width='20' height='12' viewBox='0 0 20 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1_2)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M20 1.33333H0V0H20V1.33333ZM20 6.66667H0V5.33333H20V6.66667ZM20 12H0V10.6667H20V12Z' fill='%23FF868E'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1_2'%3E%3Crect width='20' height='12' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
            }
            &.burger-close {
                background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_3_2)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.91223 9.99968L0.225357 1.31283L1.31321 0.224976L10.0001 8.91184L18.6869 0.224976L19.7748 1.31283L11.0879 9.99968L19.7748 18.6865L18.6869 19.7744L10.0001 11.0875L1.31321 19.7744L0.225357 18.6865L8.91223 9.99968Z' fill='%23FF868E'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_3_2'%3E%3Crect width='20' height='20' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
            }
        }
    }
    .search-breeds {
        display: none;
        position: absolute;
        top: 45px;
        left: 0;
        width: 100%;
        border-radius: 10px;
        background-color: $white;
        padding: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 20;
        max-height: 200px;
        overflow-y: auto;
        &.active {
            display: block;
        }
        &__items {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        &__item {
            width: max-content;
            font-size: 16px;
            font-weight: 500;
            color: $black;
            transition: color 0.2s linear;
            &:hover {
                color: $pink;
            }
        }
    }
    .search-overlay {
        display: none;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 15;
        &.active {
            display: block;
        }
    }
</style>