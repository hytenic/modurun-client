import moduRunApiUtil from './utils';

const getMySchdules = () => moduRunApiUtil.request('GET', '/users/schedules');

const joinToSchedule = (scheduleId) => moduRunApiUtil.request('POST', '/users/schedules', { scheduleId });

const exitFromSchedule = (scheduleId) => moduRunApiUtil.request('DELETE', '/schedules/users', { scheduleId });

const getSchedules = (filter, userPosition, area) => {
  const encodedFilter = encodeURI(JSON.stringify(filter));
  const encodedUserPos = encodeURI(JSON.stringify(userPosition));
  const encodedArea = encodeURI(JSON.stringify(area));
  return moduRunApiUtil.request('GET', `/schedules/${encodedFilter}/${encodedUserPos}/${encodedArea}`);
};

const createSchedule = (track, schedule) => {
  return moduRunApiUtil.request('POST', '/schedules', {
    track,
    schedule,
  });
};

export default {
  createSchedule,
  getSchedules,
  getMySchdules,
  joinToSchedule,
  exitFromSchedule,
};
