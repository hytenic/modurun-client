import utils from './utils';

function search(options) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?';
  return utils.convertApiToFunction(baseUrl, options, true);
}

function nearby(options) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
  return utils.convertApiToFunction(baseUrl, options, true);
}

function nearestPlace(location) {
  return nearby({
    location: `${location.latitude},${location.longitude}`,
    language: 'ko',
    rankby: 'distance',
  })
    .then((res) => res.json())
    .then((json) => {
      const nearest = json.results[0];
      return nearest;
    });
};

function autoComplete(options) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?';
  return utils.convertApiToFunction(baseUrl, options, true);
}

function details(options) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/details/json?';
  return utils.convertApiToFunction(baseUrl, options, true);
}

function photos(options) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/photo?';
  return utils.convertApiToFunction(baseUrl, options, true);
}

export default {
  search,
  autoComplete,
  details,
  photos,
  nearby,
  nearestPlace,
};
