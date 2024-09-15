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