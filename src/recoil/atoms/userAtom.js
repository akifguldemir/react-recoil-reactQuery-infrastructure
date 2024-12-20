import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userAtom = atom({
  key: 'userAtom',
  default: {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    age: null,
    image: '',
  },
  effects_UNSTABLE: [persistAtom],
});