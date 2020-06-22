/* eslint-disable no-undef */
const url = 'https://modurun.xyz';

const postEmailLogin = async (email, password) => {
  try {
    const response = await fetch(`${url}/users/signin`, {
      method: 'POST',
      //   withCredentials, true,
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.status);
    if (response.status === 404) return false;
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

const postSignUp = async (email, password) => {
  try {
    const response = await fetch(`${url}/users/signup`, {
      method: 'POST',
      //   withCredentials, true,
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) return true;
    return false;
  } catch (e) {
    console.log(e);
  }
};

const getEmailDupli = async (email) => {
  try {
    const response = await fetch(`${url}/users/user/exist/?email=${email}`);
    if (response.status === 409) { // 이메일 중복
      return false;
    }
    return true;
  } catch (e) {
    console.log(e);
  }
};

const patchUserName = async (username) => {
  try {
    const response = await fetch(`${url}/users/user/name`, {
      method: 'PATCH',
      //   withCredentials, true,
      credentials: 'include',
      body: JSON.stringify({
        username,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      console.log('응답 상태 코드가 200이 아님');
      return false;
    }
    console.log('응답 상태 코드 200');
    return true;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  postEmailLogin,
  postSignUp,
  getEmailDupli,
  patchUserName,
};
