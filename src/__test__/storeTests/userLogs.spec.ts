import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import { useUserLogs } from '@/stores/userLogs';
import type { UserLogsStore } from '@/stores/userLogs';
import { addCustomLog } from '../mockData';

describe('user logs', () => {
    let userLogsStore: UserLogsStore;

    beforeEach(() => {
        setActivePinia(createPinia());
        userLogsStore = useUserLogs();
    });

    it('init value should be empty array', () => {
        expect(userLogsStore.userLogs.length).toBe(0);
    });

    it('logs with status "added" should adds properly', () => {
        const log = addCustomLog('likes', 'added');
        userLogsStore.addLog(log.id, log.status, log.type);

        expect(userLogsStore.userLogs.length).toBe(1),
        expect(userLogsStore.userLogs[0].status).toBe(log.status)
    });

    it('logs with status "removed" should adds properly', () => {
        const log = addCustomLog('likes', 'removed');
        userLogsStore.addLog(log.id, log.status, log.type);

        expect(userLogsStore.userLogs.length).toBe(1),
        expect(userLogsStore.userLogs[0].status).toBe('removed')
    });

    it('getLikedLogs should work properly', () => {
        const log = addCustomLog('likes', 'added');
        userLogsStore.addLog(log.id, log.status, log.type);

        expect(userLogsStore.getLikesLogs.length).toBe(1),
        expect(userLogsStore.getDislikesLogs.length).toBe(0),
        expect(userLogsStore.getFavoriteLogs.length).toBe(0),
        expect(userLogsStore.getLikesLogs[0].type).toBe(log.type)
    });

    it('getDislikedLogs should work properly', () => {
        const log = addCustomLog('dislikes', 'added');
        userLogsStore.addLog(log.id, log.status, log.type);

        expect(userLogsStore.getDislikesLogs.length).toBe(1),
        expect(userLogsStore.getLikesLogs.length).toBe(0),
        expect(userLogsStore.getFavoriteLogs.length).toBe(0),
        expect(userLogsStore.getDislikesLogs[0].type).toBe(log.type)
    });

    it('getFavoriteLogs should work properly', () => {
        const log = addCustomLog('favorite', 'added');
        userLogsStore.addLog(log.id, log.status, log.type);

        expect(userLogsStore.getFavoriteLogs.length).toBe(1),
        expect(userLogsStore.getDislikesLogs.length).toBe(0),
        expect(userLogsStore.getLikesLogs.length).toBe(0),
        expect(userLogsStore.getFavoriteLogs[0].type).toBe(log.type)
    });
});