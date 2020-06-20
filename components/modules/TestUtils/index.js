const testUserLogin = () => {
  return fetch('https://modurun.xyz/users/signin', {
    method: 'POST',
    body: JSON.stringify({
      email: 'test@gmail.com',
      password: '1234',
    }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default {
  testUserLogin,
};
