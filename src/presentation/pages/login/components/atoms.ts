import { atom } from 'recoil';

export const loginState = atom({
  key: 'loginState',
  default: {
    memberId: '',
    password: '',
    memberIdError: '',
    passwordError: '',
    mainError: '',
    isLoading: false,
    isFormInvalid: true
  }
});
