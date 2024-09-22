import { mount } from '@vue/test-utils';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import PageTitle from '@/components/PageTitle.vue';


describe('PageTitle', () => {
    beforeEach(() => {
        vi.mock('vue-router', () => ({
            useRoute: () => ({
                path: '/test-path',
            }),
        }));
    });

    it('should render page title properly', () => {
        const wrapper = mount(PageTitle);
        const title = wrapper.find('.page-title');

        expect(title.exists()).toBe(true);
        expect(title.classes()).toContain('page-title');
    });

    it('should render corectly with title prop', () => {
        const mockTitle = 'Cat page';
        const wrapper = mount(PageTitle, {
            props: {
                title: mockTitle,
            },
        });

        const title = wrapper.find('.page-title');

        expect(title.exists()).toBe(true);
        expect(title.classes()).toContain('page-title');
        expect(title.classes()).toContain('light');
        expect(title.text()).toBe(mockTitle);
    });

    it('should render the current route path when the title prop is not provided', () => {
        const wrapper = mount(PageTitle);
        const title = wrapper.find('.page-title');

        expect(title.text()).toBe('test-path');
        expect(title.classes()).not.toContain('light');
      });
});