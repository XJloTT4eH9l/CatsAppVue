<script setup lang="ts">
    import { useRoute } from 'vue-router'
    defineProps<{
        title?: string
    }>()
    const currentRoute = useRoute().path.slice(1);
</script>

<template>
    <div class="page-title" :class="title && 'light'">{{  title ? title : currentRoute }}</div>
</template>

<style lang="scss">
    @import '../assets/variables.scss';

    .page-title {
        width: 150px;
        padding: 5px 0;
        font-size: 20px;
        font-weight: 500;
        line-height: 30px;
        letter-spacing: 2px;
        text-align: center;
        text-transform: uppercase;
        color: $white;
        background-color: $pink;
        border-radius: 10px;
        &.light {
            color: $pink;
            background-color: $pink_hover;
        }
    }
</style>