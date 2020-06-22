import getEnvVars from '../../../environment';

const mapBoxAccessToken = getEnvVars('dev').mapBox;

const findRoute = (points, profile = 'mapbox/walking') => {
  const baseUrl = `https://api.mapbox.com/directions/v5/${profile}/`;
  const mappedPoints = points
    .map((point) => `${point.longitude},${point.latitude}`)
    .join(';');
  const composedUrl = `${baseUrl}${mappedPoints}?geometries=geojson&steps=true&access_token=${mapBoxAccessToken}`;
  return fetch(composedUrl);
};

export default {
  findRoute,
};
