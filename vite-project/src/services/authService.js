import { api } from './api.js';

const endpoints = {
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout'
};

export function login(email, password) {
  return api.post(endpoints.login, { email, password });
}

export function register(email, password, rePassword, username) {
  return api.post(endpoints.register, { email, password, rePassword, username });
}

export function logout(token) {
  return api.post(endpoints.logout, null, token);
}