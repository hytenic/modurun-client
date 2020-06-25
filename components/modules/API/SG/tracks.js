import moduRunApiUtil from './utils';

/**
 * This is used for creating track
 * @param {track} track
 */
const createTrack = (track) => moduRunApiUtil.request('POST', '/tracks/track', track);

/**
 * This is used for fetching tracks with filter or userPosition or area
 * @param {filter} filter
 * @param {userPosition} userPos
 * @param {area} area
 */
const getTracks = (filter, userPos, area) => {
  const encodedFilter = encodeURI(JSON.stringify(filter));
  const encodedUserPos = encodeURI(JSON.stringify(userPos));
  const encodedArea = encodeURI(JSON.stringify(area));
  return moduRunApiUtil.request('GET', `/tracks/${encodedFilter}/${encodedUserPos}/${encodedArea}`);
};

/**
 * This is used for fetching a single track.
 * @param {number} trackId
 */
const getTrack = (trackId) => moduRunApiUtil.request('GET', `/tracks/track/${trackId}`);

/**
 * Used for deleting a track.
 * @param {number} trackId
 */
const deleteTrack = (trackId) => moduRunApiUtil.request('DELETE', `/tracks/track/${trackId}`);

const rateTrack = (trackId, rate) => moduRunApiUtil.request('POST', '/users/tracks/rate', { trackId, rate });

const getMyTracks = () => moduRunApiUtil.request('GET', '/users/tracks');

const addToMyTrack = (trackId) => moduRunApiUtil.request('POST', '/users/tracks', { trackId });

const toggleBookmark = (trackId) => moduRunApiUtil.request('PATCH', '/users/tracks', { trackId });

const deleteFromMyTrack = (trackId) => moduRunApiUtil.request('DELETE', '/users/tracks', { trackId });

export default {
  createTrack,
  getTrack,
  getTracks,
  rateTrack,
  deleteTrack,
  addToMyTrack,
  getMyTracks,
  toggleBookmark,
  deleteFromMyTrack,
};
