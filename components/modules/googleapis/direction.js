import apiUtil from './utils';

const findRoute = (options) => {
  const baseUrl = 'https://maps.googleapis.com/maps/api/directions/json?';
  return apiUtil.convertApiToFunction(baseUrl, options, true);
};

export default {
  findRoute,
};
