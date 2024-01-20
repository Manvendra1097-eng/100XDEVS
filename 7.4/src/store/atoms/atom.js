import { atom, selector } from 'recoil';

export const notificationCount = atom({
  key: 'notificationCount',
  default: 12,
});
export const jobsCount = atom({
  key: 'jobsCount',
  default: 0,
});
export const messageCount = atom({
  key: 'messageCount',
  default: 0,
});
export const networkCount = atom({
  key: 'networkCount',
  default: 112,
});

export const totalNotification = selector({
  key: 'totalNotification',
  get: ({ get }) => {
    const notifications = get(notificationCount);
    const jobs = get(jobsCount);
    const messages = get(messageCount);
    const networks = get(networkCount);
    return notifications + jobs + messages + networks;
  },
});

// useRecoilStateLoadable
// useRecoilValueLoadable
// selectorFamily
// atomFamily
