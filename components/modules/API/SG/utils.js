const baseUrl = 'https://modurun.xyz';

const request = (method, route, data) => {
  return fetch(`${baseUrl}${route}`, {
    method,
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default {
  request,
};
