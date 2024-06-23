<script setup lang="ts">
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const onBack = () => router.go(-1);
</script>

<template>
    <button @click="onBack" class="back-button" />
</template>

<style lang="scss">
    @import '../assets/variables.scss';
    
    .back-button {
        width: 40px;
        height: 40px;
        min-width: 40px;
        background-color: $pink_hover;
        display: grid;
        place-items: center;
        border-radius: 10px;
        transition: background-color 0.2s linear;
        &::before {
            content: '';
            width: 20px;
            min-width: 20px;
            height: 20px;
            background-position: center;
            background-repeat: no-repeat;
            background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1_1332)'%3E%3Cpath d='M4.70999 10.9901L13.3097 19.5896C13.8567 20.1369 14.7437 20.1369 15.2905 19.5896C15.8373 19.0427 15.8373 18.1558 15.2905 17.6091L7.68104 9.99988L15.2902 2.39096C15.8371 1.84391 15.8371 0.957107 15.2902 0.410284C14.7434 -0.136761 13.8565 -0.136761 13.3095 0.410284L4.70977 9.00985C4.43635 9.28339 4.2998 9.64153 4.2998 9.99983C4.2998 10.3583 4.43662 10.7167 4.70999 10.9901Z' fill='%23FF868E'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1_1332'%3E%3Crect width='20' height='20' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
        }
        &:hover {
            background-color: $pink;
            &::before {
                background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1_1338)'%3E%3Cpath d='M4.70999 10.9901L13.3097 19.5896C13.8567 20.1369 14.7437 20.1369 15.2905 19.5896C15.8373 19.0427 15.8373 18.1558 15.2905 17.6091L7.68104 9.99988L15.2902 2.39096C15.8371 1.84391 15.8371 0.957107 15.2902 0.410284C14.7434 -0.136761 13.8565 -0.136761 13.3095 0.410284L4.70977 9.00985C4.43635 9.28339 4.2998 9.64153 4.2998 9.99983C4.2998 10.3583 4.43662 10.7167 4.70999 10.9901Z' fill='white'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1_1338'%3E%3Crect width='20' height='20' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
            }
        }
    }
</style>