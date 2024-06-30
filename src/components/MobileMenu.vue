<script setup lang="ts">
    import { ref } from 'vue';

    import Nav from '@/components/Nav.vue';

    const isMobileMenuOpen = ref<boolean>(false);

    const mobileMenuHandler = () => {
        if(isMobileMenuOpen.value) {
            document.body.style.overflow = '';
            isMobileMenuOpen.value = false;
        } else {
            document.body.style.overflow = 'hidden';
            isMobileMenuOpen.value = true;
        }
    }
</script>

<template>
    <button @click="mobileMenuHandler" class="burger-btn header__link burger-open" />
    <div :class="['mobile-menu', isMobileMenuOpen && 'active']">
        <button @click="mobileMenuHandler" class="burger-btn header__link burger-close" />
        <Nav />
    </div>
</template>

<style lang="scss">
    .burger-btn {
        display: none;
        @media screen and (max-width: 1230px) {
            display: flex;
        }
        &.burger-close {
            position: absolute;
            right: 20px;
            top: 20px;
        }
    }
    .mobile-menu {
        position: fixed;
        left: -100%;
        top: 0;
        width: 100%;
        height: 100vh;
        padding: 80px 30px 30px 30px;
        background-color: white;
        transition: left 0.3s ease-in;
        z-index: 10;
        & .nav__list {
            justify-content: center;
        }
        &.active {
            left: 0;
        }
    }
</style>