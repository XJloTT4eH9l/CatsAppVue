<script setup lang="ts">
    import { useSavedCats } from '@/stores/savedCats';

    import HeaderPanel from '@/components/HeaderPanel.vue'
    import BackButton from '@/components/BackButton.vue'
    import PageTitle from '@/components/PageTitle.vue'
    import CatList from '@/components/CatList.vue';
    import UserActionLogs from '@/components/UserActionLogs.vue';

    const savedCatsStore = useSavedCats();
</script>

<template>
    <HeaderPanel />
    <section class="page-container">
        <div class="page-header">
            <BackButton />
            <PageTitle />
        </div>

        <CatList 
            v-if="savedCatsStore.favoriteCats.length > 0" 
            :catList="savedCatsStore.favoriteCats"
            type="favorite"
        />

        <h2 class="title-empty" v-else>No cats found</h2>

        <UserActionLogs 
            v-if="savedCatsStore.getFavoriteLogs.length > 0"
            :logs="savedCatsStore.getFavoriteLogs" 
        /> 
    </section>
</template>