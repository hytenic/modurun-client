/* eslint-disable no-undef */
const url = 'https://modurun.xyz';

const getUserTracks = async () => {
  try {
    const response = await fetch(`${url}/users/tracks`);
    if (response.status === 200) {
      const tracks = response.json();
      return tracks;
    }
    return false;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getUserTracks,
};
