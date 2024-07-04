import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { Me } from '../base';

export const getMe = () => {
  const jwt = getCookie('jwt');
  console.log(jwt);
  const me: Me = jwt ? jwtDecode<Me>(jwt) : ({} as Me);
  return me;
};
