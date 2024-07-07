<script setup lang="ts">
    import { ref } from 'vue';
    import type { Ref } from 'vue'; 

    const { name, selectOptions } = defineProps<{
        name: string,
        selectOptions: string[]
    }>()

    const isSelectOpen:Ref<boolean> = ref(false);
    const currentItem:Ref<string> = ref(selectOptions[0]);

    const emit = defineEmits<{
        (e: 'handleChange', option: string): void,
    }>();

    const selectToggle = () => isSelectOpen.value = !isSelectOpen.value;

    const onSelectChange = (option: string) => {
        currentItem.value = option;
        emit('handleChange', option);
        selectToggle();
    }
</script>

<template>
    <div 
        class="select" 
        :class="isSelectOpen && 'active'"
        @click.stop="selectToggle"
    >
        <div class="select__current-item">{{ name + ': ' + currentItem }}</div>
        <div class="select__content">
            <div 
                v-for="option in selectOptions"
                :key="option"
                class="select__item"
                :class="option === currentItem && 'active'"
                @click.stop="onSelectChange(option)"
            >
                {{ name + ': ' + option }}
            </div>
        </div>
        <div @click.stop="selectToggle" class="select__overlay" />
    </div>
</template>