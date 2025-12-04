import { api } from './api.js';

const base = '/events';

export function getAll() {
  return api.get(base);
}

export function getOne(id) {
  return api.get(`${base}/${id}`);
}

export function create(data, token) {
  return api.post(base, data, token);
}

export function update(id, data, token) {
  return api.put(`${base}/${id}`, data, token);
}

export function remove(id, token) {
  return api.del(`${base}/${id}`, null, token);
}

export function join(id, token) {
  return api.post(`${base}/${id}/join`, null, token);
}