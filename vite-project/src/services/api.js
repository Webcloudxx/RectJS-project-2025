const baseUrl = 'http://localhost:5000/api';

async function request(method, url, data, token) {
  const options = {
    method,
    headers: {}
  };

  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(baseUrl + url, options);

  if (!res.ok) {
    let errorMessage = 'Request failed';
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
    }
    throw new Error(errorMessage);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  get: request.bind(null, 'GET'),
  post: request.bind(null, 'POST'),
  put: request.bind(null, 'PUT'),
  del: request.bind(null, 'DELETE')
};