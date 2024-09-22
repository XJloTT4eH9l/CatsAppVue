import { mount } from '@vue/test-utils';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { mockRoutes } from '../mockData';
import type { DOMWrapper } from '@vue/test-utils';
import MobileMenu from '@/components/MobileMenu.vue';

const routes = mockRoutes;

const router = createRouter({
    history: createWebHistory(),
    routes,
});

describe('MobileMenu', () => {
    let wrapper: ReturnType<typeof mount>;
    let mobileMenu: DOMWrapper<Element>;
    let burgerOpenBtn: DOMWrapper<Element>;
    let burgerCloseBtn: DOMWrapper<Element>;

    beforeEach(() => {
        wrapper = mount(MobileMenu, {
            global: {
                plugins: [router]
            },
        });
        mobileMenu = wrapper.find('.mobile-menu');
        burgerOpenBtn = wrapper.find('.burger-open');
        burgerCloseBtn = wrapper.find('.burger-close');
    });

    it('MobileMenu should init render correctly', () => {
        expect(mobileMenu.classes()).not.toContain('active');
        expect(burgerOpenBtn.exists()).toBe(true);
        expect(burgerCloseBtn.exists()).toBe(true);
    });

    it('MobileMenu should open and close correctly', async () => {
        await burgerOpenBtn.trigger('click');

        expect(mobileMenu.classes()).toContain('active');
        expect(document.body.style.overflow).toBe('hidden');

        await burgerCloseBtn.trigger('click');

        expect(mobileMenu.classes()).not.toContain('active');
        expect(document.body.style.overflow).toBe('');
    });
});