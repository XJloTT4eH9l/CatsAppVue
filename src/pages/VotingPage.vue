<script setup lang="ts">
    import HeaderPanel from '../components/HeaderPanel.vue'
    import BackButton from '../components/BackButton.vue'
    import PageTitle from '../components/PageTitle.vue'
</script>

<template>
    <HeaderPanel />
    <section class="page-container">
        <div class="page-header">
            <BackButton />
            <PageTitle />
        </div>
    </section>
</template>