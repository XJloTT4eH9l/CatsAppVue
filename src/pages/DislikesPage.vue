<script setup lang="ts">
    import { useSavedCats } from '@/stores/savedCats';
    import { useUserLogs } from '@/stores/userLogs';

    import HeaderPanel from '@/components/HeaderPanel.vue'
    import BackButton from '@/components/BackButton.vue'
    import PageTitle from '@/components/PageTitle.vue'
    import CatList from '@/components/CatList.vue';
    import UserActionLogs from '@/components/UserActionLogs.vue';

    const savedCatsStore = useSavedCats();
    const userLogsStore = useUserLogs();
</script>

<template>
    <HeaderPanel />
    <section class="page-container">
        <div class="page-header">
            <BackButton />
            <PageTitle />
        </div>

        <CatList 
            v-if="savedCatsStore.dislikedCats.length > 0" 
            :catList="savedCatsStore.dislikedCats"
            type="dislikes"
        />

        <h2 class="title-empty" v-else>No cats found</h2>

        <UserActionLogs 
            v-if="userLogsStore.getDislikesLogs.length > 0"
            :logs="userLogsStore.getDislikesLogs" 
        /> 
    </section>
</template>