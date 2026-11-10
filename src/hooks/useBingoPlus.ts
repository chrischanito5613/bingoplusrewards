import { useEffect, useState } from 'react';
import { store } from '../services/store';
import { BingoPlusDatabase, User } from '../types/bingoplus';

export function useBingoPlus() {
  const [data, setData] = useState<BingoPlusDatabase>(() => store.getState());
  const [currentUserId, setCurrentUserId] = useState<string>(() => store.getCurrentUserId());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setData({ ...store.getState() });
      setCurrentUserId(store.getCurrentUserId());
    });
    return unsubscribe;
  }, []);

  const currentUser: User | undefined = data.users.find((u) => u.id === currentUserId);

  return {
    data,
    currentUser,
    currentUserId,
    store,
    sites: data.sites,
    users: data.users,
    rewards: data.rewards,
    vouchers: data.vouchers,
    logs: data.logs,
    chatMessages: data.chatMessages,
    notifications: data.notifications,
    tierConfigs: data.tierConfigs,
    mechanics: data.mechanics || [],
  };
}
