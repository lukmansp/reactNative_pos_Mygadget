import axios from 'axios';

export const login = data => {
  return {
    type: 'LOGIN_USER',
    payload: axios({
      method: 'POST',
      url: 'http://20.20.20.131:9009/user/login',
      data: data,
    }),
  };
};
export const register = data => {
  return {
    type: 'POST_USER',
    payload: axios({
      method: 'POST',
      url: 'http://20.20.20.131:9009/user/register',
      data: data,
    }),
  };
};
export const logout = () => {
  return {
    type: 'LOGOUT_USER',
  };
};
