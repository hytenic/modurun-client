import moduRunApiUtil from './utils';

const signIn = (email, password) => moduRunApiUtil.request('POST', '/users/signin', { email, password });

const signUp = (email, password) => moduRunApiUtil.request('POST', '/users/signup', { email, password });

const changeMyName = (newName) => moduRunApiUtil.request('PATCH', '/users/user/name', { username: newName });

const isDuplicateEmail = (email) => moduRunApiUtil.request('GET', `/users/user/exist/?email=${email}`);

const userHateModurun = (password) => moduRunApiUtil.request('POST', '/users/unsubscribe', { password });

export default {
  signIn,
  signUp,
  changeMyName,
  isDuplicateEmail,
  userHateModurun,
};
