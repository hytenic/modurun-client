import moduRunApiUtils from './utils';

/**
 * @param {Number} scheduleId
 * @param {Number} page
 */
const getMessages = (scheduleId, page) => moduRunApiUtils.request('GET', `/messages/messages?start=${page}&scheduleId=${scheduleId}`);

export default {
  getMessages,
};
