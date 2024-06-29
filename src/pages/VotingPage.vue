<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useSavedCats } from '@/stores/savedCats'

    import { VOTING_IMG } from '@/catApi'
    import type { catObject } from '@/types'

    import HeaderPanel from '@/components/HeaderPanel.vue'
    import BackButton from '@/components/BackButton.vue'
    import PageTitle from '@/components/PageTitle.vue'
    import Loader from '@/components/Loader.vue'
    import UserActionLogs from '@/components/UserActionLogs.vue';

    const savedCatsStore = useSavedCats();
    
    const catInfo = ref<catObject | null>(null);
    const isLoading = ref<boolean>(false);

    const getCatInfo = async () => {
        isLoading.value = true;

        try {
            const responce = await fetch(VOTING_IMG);

            if(!responce.ok) {
                throw new Error('Cant get data')
            }

            const responceJson = await responce.json();

            catInfo.value = responceJson[0];
        } catch (error) {
            console.log(error);
        }

        isLoading.value = false;
    }

    const saveCat = (type: string) => {
        if(!catInfo.value) {
            return
        }

        savedCatsStore.addCatToSaved(catInfo.value, type);
        
        getCatInfo();
    }
    
    onMounted(() => {
        getCatInfo()
    })
</script>

<template>
    <HeaderPanel />
    <section class="page-container">
        <div class="page-header">
            <BackButton />
            <PageTitle />
        </div>

        <div class="img-container">
            <Loader v-if="isLoading" />
            <template v-else>
                <img
                    v-if="catInfo"  
                    class="cat-img"
                    :src="catInfo.url"
                    :width="catInfo?.width"
                    :height="catInfo?.hegth" 
                    :alt="catInfo.id"
                >
                <div class="voting-actions">
                    <button @click="saveCat('likes')" class="voting-actions__button like"></button>
                    <button @click="saveCat('favorite')" class="voting-actions__button favorite"></button>
                    <button @click="saveCat('dislikes')" class="voting-actions__button dislike"></button>
                </div>
            </template>
        </div>

        <UserActionLogs 
            v-if="savedCatsStore.userLogs.length > 0"
            :logs="savedCatsStore.userLogs" 
        /> 
    </section>
</template>

<style lang="scss">
    @import '../assets/variables.scss';

    .img-container {
        position: relative;
        width: 100%;
        height: 360px;
        margin-bottom: 20px;
        overflow: hidden;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        @media screen and (max-width: 1230px) {
            height: 460px;
        }
    }
    .cat-img {
        width: 100%;
        height: auto;
        border-radius: 20px;
    }

    .voting-actions {
        position: absolute;
        left: 50%;
        bottom: 20px;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        border-radius: 20px;
        border: 3px solid $white;
        overflow: hidden;
        &__button {
            width: 50px;
            height: 50px;
            min-width: 50px;
            background-repeat: no-repeat;
            background-position: center;
            transition: background-color 0.2s linear;
            &.like {
                background-color: $green;
                border-right: 3px solid $white;
                background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1_2)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 10C0 4.47715 4.47715 0 10 0C15.5229 0 20 4.47715 20 10C20 15.5229 15.5229 20 10 20C4.47715 20 0 15.5229 0 10ZM10 1.33333C5.21353 1.33333 1.33333 5.21353 1.33333 10C1.33333 14.7865 5.21353 18.6667 10 18.6667C14.7865 18.6667 18.6667 14.7865 18.6667 10C18.6667 5.21353 14.7865 1.33333 10 1.33333ZM6.66667 8H5.33333V6.66667H6.66667V8ZM14.6667 8H13.3333V6.66667H14.6667V8ZM6.13333 11.0667L6.53333 11.6C8.26667 13.9111 11.7333 13.9111 13.4667 11.6L13.8667 11.0667L14.9333 11.8667L14.5333 12.4C12.2667 15.4222 7.73333 15.4222 5.46667 12.4L5.06667 11.8667L6.13333 11.0667Z' fill='white'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1_2'%3E%3Crect width='20' height='20' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
                &:hover {
                    background-color: $green_hover;
                }
            }
            &.favorite {
                background-color: $pink;
                background-image: url("data:image/svg+xml,%3Csvg width='20' height='17' viewBox='0 0 20 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.38071 1.30769C3.14541 1.30769 1.33333 3.08492 1.33333 5.27724C1.33333 6.33003 1.75975 7.33969 2.51878 8.08416L10 15.4215L17.4812 8.08416C18.2403 7.33969 18.6667 6.33003 18.6667 5.27724C18.6667 3.08492 16.8546 1.30769 14.6193 1.30769C13.5459 1.30769 12.5164 1.72591 11.7573 2.47034L10.4714 3.73158C10.2111 3.98692 9.78893 3.98692 9.5286 3.73158L8.24267 2.47035C7.4836 1.72591 6.45414 1.30769 5.38071 1.30769ZM0 5.27724C0 2.3627 2.40903 0 5.38071 0C6.80773 0 8.1764 0.555994 9.18547 1.54567L10 2.34456L10.8145 1.54567C11.8236 0.555993 13.1923 0 14.6193 0C17.591 0 20 2.3627 20 5.27724C20 6.67682 19.4331 8.01917 18.424 9.00883L10.4714 16.8085C10.2111 17.0638 9.78893 17.0638 9.5286 16.8085L1.57597 9.00883C0.566893 8.01917 0 6.67682 0 5.27724Z' fill='white'/%3E%3C/svg%3E");
                &:hover {
                    background-color: $pink_hover;
                }
            }
            &.dislike {
                background-color: $orange;
                border-left: 3px solid $white;
                background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1_6)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 10C0 4.47715 4.47715 0 10 0C15.5229 0 20 4.47715 20 10C20 15.5229 15.5229 20 10 20C4.47715 20 0 15.5229 0 10ZM10 1.33333C5.21353 1.33333 1.33333 5.21353 1.33333 10C1.33333 14.7865 5.21353 18.6667 10 18.6667C14.7865 18.6667 18.6667 14.7865 18.6667 10C18.6667 5.21353 14.7865 1.33333 10 1.33333ZM6.66667 8H5.33333V6.66667H6.66667V8ZM14.6667 8H13.3333V6.66667H14.6667V8ZM5.06667 13.4667L5.46667 12.9333C7.73333 9.91113 12.2667 9.91113 14.5333 12.9333L14.9333 13.4667L13.8667 14.2667L13.4667 13.7333C11.7333 11.4222 8.26667 11.4222 6.53333 13.7333L6.13333 14.2667L5.06667 13.4667Z' fill='white'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1_6'%3E%3Crect width='20' height='20' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
                &:hover {
                    background-color: $orange_hover;
                }
            }
        }
    }
</style>