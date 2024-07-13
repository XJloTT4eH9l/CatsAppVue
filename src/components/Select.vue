<script setup lang="ts">
    import { ref } from 'vue';
    import type { Ref } from 'vue';
    import type { SelectItem } from '@/types';

    const { selectOptions, label } = defineProps<{
        selectOptions: SelectItem[],
        label?: string
    }>()

    const isSelectOpen:Ref<boolean> = ref(false);
    const currentItem:Ref<SelectItem> = ref(selectOptions[0]);

    const emit = defineEmits<{
        (e: 'handleChange', option: string): void,
    }>();

    const selectToggle = () => isSelectOpen.value = !isSelectOpen.value;

    const onSelectChange = (option: SelectItem) => {
        currentItem.value = option;
        emit('handleChange', option.value);
        selectToggle();
    }
</script>

<template>
    <div class="select-wrapper">
        <div v-if="label" class="select-label">{{ label }}</div>
        <div 
            class="select" 
            :class="isSelectOpen && 'active'"
            @click.stop="selectToggle"
        >
            <div class="select__current-item">{{ currentItem.name}}</div>
            <div class="select__content">
                <div 
                    v-for="option in selectOptions"
                    :key="option.name"
                    class="select__item"
                    :class="option.value === currentItem.value && 'active'"
                    @click.stop="onSelectChange(option)"
                >
                    {{ option.name }}
                </div>
            </div>
            <div @click.stop="selectToggle" class="select__overlay" />
        </div>
    </div>
</template>