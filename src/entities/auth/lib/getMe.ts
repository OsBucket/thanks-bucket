import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { Me } from '../model/Profile';

export const getMe = () => {
  const jwt = getCookie('jwt');
  return jwt ? jwtDecode<Me>(jwt) : undefined;
};
