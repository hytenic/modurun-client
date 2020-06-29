import moduRunApiUtil from './utils';

/**
 * No parameter is requied.
 */
const getMySchdules = () => moduRunApiUtil.request('GET', '/users/schedules');

/**
 * This is used for joining a schedule.
 * @param {Number} scheduleId
 */
const joinToSchedule = (scheduleId) => moduRunApiUtil.request('POST', '/users/schedules', { scheduleId });

/**
 * This is used for exiting from a schedule.
 * @param {Number} scheduleId
 */
const exitFromSchedule = (scheduleId) => moduRunApiUtil.request('DELETE', '/schedules/user', { scheduleId });

/**
 * @param {filter} filter
 * @param {userPosition} userPosition
 * @param {area} area
 */
const getSchedules = (filter, userPosition, area) => {
  const encodedFilter = encodeURI(JSON.stringify(filter));
  const encodedUserPos = encodeURI(JSON.stringify(userPosition));
  const encodedArea = encodeURI(JSON.stringify(area));
  return moduRunApiUtil.request('GET', `/schedules/${encodedFilter}/${encodedUserPos}/${encodedArea}`);
};

/**
 * This is used for creating schedule;
 * @param {track} track
 * @param {schedule} schedule
 */
const createSchedule = (track, schedule) => {
  return moduRunApiUtil.request('POST', '/schedules', {
    track,
    schedule,
  });
};

const getCompletedScheduleTracks = () => moduRunApiUtil.request('GET', '/users/schedules/completed');

export default {
  createSchedule,
  getSchedules,
  getMySchdules,
  joinToSchedule,
  exitFromSchedule,
  getCompletedScheduleTracks,
};
