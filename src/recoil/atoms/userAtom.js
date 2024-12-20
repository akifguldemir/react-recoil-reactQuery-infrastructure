import { atom } from 'recoil';

export const userAtom = atom({
  key: 'userAtom',
  default: {
    id: null,
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    image: ''
  },
});