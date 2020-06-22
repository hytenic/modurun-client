import moduRunApiUtils from './utils';

const getMessages = (scheduleId, page) => moduRunApiUtils.request('GET', `/messages/messages?start=${page}&scheduleId=${scheduleId}`);

export default {
  getMessages,
};
