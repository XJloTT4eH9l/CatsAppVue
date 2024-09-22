import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { createRouter, createMemoryHistory } from 'vue-router';
import BackButton from '@/components/BackButton.vue';

describe('BackButtton', () => {
    it('should render the button with correct class', () => {
        const wrapper = mount(BackButton);
        const button = wrapper.find('button');

        expect(button.exists()).toBe(true);
        expect(button.classes()).toContain('back-button');
    });

    it('should go back in router when button clicked', async () => {
        const router = createRouter({
            history: createMemoryHistory(),
            routes: [],
        });

        router.go = vi.fn();

        const wrapper = mount(BackButton, {
            global: {
                plugins: [router],
            },
        });
        const button = wrapper.find('button');
        await button.trigger('click');

        expect(router.go).toHaveBeenCalledWith(-1);
    });
});