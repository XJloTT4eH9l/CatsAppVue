import { setActivePinia, createPinia } from 'pinia';
import { useSavedCats } from '@/stores/savedCats';
import { useUserLogs } from '@/stores/userLogs';
import type { SavedCatsStore } from '@/stores/savedCats';
import type { UserLogsStore } from '@/stores/userLogs';
import { describe, it, expect, beforeEach } from 'vitest';
import type { CatObject } from '@/types';

const mockCat: CatObject = {
    id: 'catId',
    url: 'www.cat-funny.com',
    width: 230,
    height: 100
};

const expectLog = (logs: Array<{ type: string; status: string }>, index: number, type: string, status: string) => {
    expect(logs[index].type).toBe(type);
    expect(logs[index].status).toBe(status);
};

describe('savedCats', () => {
    let store: SavedCatsStore;
    let userLogsStore: UserLogsStore;

    beforeEach(() => {
        setActivePinia(createPinia());
        store = useSavedCats();
        userLogsStore = useUserLogs();
    });

    it('init values should be 0', () => {
        expect(store.likedCats.length).toBe(0);
        expect(store.dislikedCats.length).toBe(0);
        expect(store.favoriteCats.length).toBe(0);
    });

    it('add cat to likes works properly', () => {
        store.addCatToSaved(mockCat, 'likes');

        expect(store.likedCats[0].id).toBe(mockCat.id);
        expectLog(userLogsStore.userLogs, 0, 'likes', 'added');
    });

    it('add cat to dislikes works properly', () => {
        store.addCatToSaved(mockCat, 'dislikes');

        expect(store.dislikedCats[0].id).toBe(mockCat.id);
        expectLog(userLogsStore.userLogs, 0, 'dislikes', 'added');
    });

    it('add cat to favorites works properly', () => {
        store.addCatToSaved(mockCat, 'favorite');

        expect(store.favoriteCats[0].id).toBe(mockCat.id);
        expectLog(userLogsStore.userLogs, 0, 'favorite', 'added');
    });

    it('remove cat from likes works properly', () => {
        store.addCatToSaved(mockCat, 'likes');
        store.removeCatFromSaved(mockCat.id, 'likes');

        expect(store.likedCats).not.toContain(mockCat);
        expectLog(userLogsStore.userLogs, 1, 'likes', 'removed');
    });

    it('remove cat from dislikes works properly', () => {
        store.addCatToSaved(mockCat, 'dislikes');
        store.removeCatFromSaved(mockCat.id, 'dislikes');

        expect(store.dislikedCats).not.toContain(mockCat);
        expectLog(userLogsStore.userLogs, 1, 'dislikes', 'removed');
    });

    it('remove cat from favorites works properly', () => {
        store.addCatToSaved(mockCat, 'favorite');
        store.removeCatFromSaved(mockCat.id, 'favorite');

        expect(store.favoriteCats).not.toContain(mockCat);
        expectLog(userLogsStore.userLogs, 1, 'favorite', 'removed');
    });
});