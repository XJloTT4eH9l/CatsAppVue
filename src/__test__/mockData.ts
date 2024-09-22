import type { CatObject } from '@/types';
import type { UserActionType } from '@/types';

export const mockCat: CatObject = {
    id: 'catId',
    url: 'www.cat-funny.com',
    width: 230,
    height: 100
};

export function addCustomLog(type: string, status: string): UserActionType {
    return {
        id: 'catId',
        time: '11:11',
        type,
        status,
    }
}

export const mockRoutes = [
    { path: '/', component: { template: '<div></div>' } },
    { path: '/voting', component: { template: '<div></div>' } },
    { path: '/gallery', component: { template: '<div></div>' } },
    { path: '/breeds', component: { template: '<div></div>' } },
];