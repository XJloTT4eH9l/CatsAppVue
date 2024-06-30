<script setup lang="ts">
    import { RouterView, RouterLink } from 'vue-router';
    
    import Nav from '@/components/Nav.vue';
</script>

<template>
    <main class="container">
        <div class="sidebar">
            <RouterLink class="sidebar__home-link" to="/">CatsPaw</RouterLink>
            <h1 class="sidebar__title">Hi!👋</h1>
            <p class="sidebar__description">Explore our app to see some cats</p>
            <Nav />
        </div>
        <div class="main-content">
            <RouterView />
        </div>
    </main>
</template>
