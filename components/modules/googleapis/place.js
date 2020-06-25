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

function getNearestAddr(location) {
  return nearestPlace(location)
    .then((place) => {
      return details({
        place_id: place.place_id,
        language: 'ko',
        fields: 'formatted_address,icon,name,address_component',
      })
        .then((res) => res.json())
        .then((json) => {
          const region = json.result.formatted_address.replace(/대한민국 /, '');
          const postalCode = json.result.address_components.reduce((acc, ele) => {
            let isPostalCode = false;
            ele.types.forEach((type) => {
              if (type === 'postal_code') isPostalCode = true;
            });
            if (isPostalCode) return ele.long_name;
            return acc;
          }, '');
          const { name } = json.result;
          // const composedAddr = `${region} ${postalCode} ${name}`;
          const composedAddr = `${region} ${name}`;
          // console.log(composedAddr);
          return composedAddr;
        });
    });
}

export default {
  search,
  autoComplete,
  details,
  photos,
  nearby,
  nearestPlace,
  getNearestAddr,
};
