import { atom, selector } from 'recoil';

export const notificatios = atom({
  key: 'notificationsAtom',
  default: selector({
    key: 'notificationsSelector',
    get: async ({ get }) => {
      const notifications = get(notificatios);
      return notifications;
    },
  }),
});
