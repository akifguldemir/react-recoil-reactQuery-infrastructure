import { atom } from 'recoil';

export const authAtom = atom({
  key: 'authAtom',
  default: {
    user: null,
    accessToken: '',
    refreshToken: '',
    isAuthenticated: false,
  },
});