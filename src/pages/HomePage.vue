<script setup lang="ts">
    import Nav from '@/components/Nav.vue';
</script>

<template>
    <section class="home-page">
        <img src="../assets/img/home-bg.svg" alt="cats app home page">

        <div class="home-page__content">
            <RouterLink class="sidebar__home-link" to="/">CatsPaw</RouterLink>
            <h1 class="sidebar__title">Hi!👋</h1>
            <p class="sidebar__description">Explore our app to see some cats</p>
            <Nav />
        </div>
    </section>
</template>

<style scoped lang="scss">
    .home-page {
        height: 100%;
        border-radius: 16px;
        background-color: #fbe0dc;
        display: flex;
        justify-content: center;
        align-items: center;
        @media screen and (max-width: 1230px) {
            background-color: unset;
            display: block;
        }

        img {
            max-height: 90%;
            width: auto;
            @media screen and (max-width: 1230px) {
                display: none;
            }
        }

        &__content {
            display: none;
            @media screen and (max-width: 1230px) {
                display: block;
            }
        }
    }
</style>