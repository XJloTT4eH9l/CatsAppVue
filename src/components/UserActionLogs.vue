<script setup lang="ts">
    import type { userActionType } from '@/types';

    defineProps<{
        logs: userActionType[]
    }>()
</script>

<template>
    <ul class="user-logs">
        <li 
            v-for="log in logs"
            :key="log.id"
            :class="['user-logs-item', log.type]"
        >
            <div class="user-logs-item__info">
                <span class="user-logs-item__time">{{ log.time }}</span>
                <p class="user-logs-item__text">
                    ImageID: <span>{{ log.id }}</span> was {{ log.status }} {{ log.status == 'added' ? 'to' : 'from'}} {{ log.type }}
                </p>
            </div>
            <div class="user-logs-item__logo" />
        </li>
    </ul>
</template>
