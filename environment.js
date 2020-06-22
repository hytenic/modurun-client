import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiKey: 'AIzaSyDiwHaKjWBEnIh3B6mIGNN-5wBAQXWGZhg',
    clientId: '770587523828-nr7ka402aj2jtohbvao4j8ku67rffteu.apps.googleusercontent.com',
    mapBox: 'pk.eyJ1IjoibW9udGhlbSIsImEiOiJja2IxZmtwcWowMmYzMnhyMXQ5OTZ0dmt3In0.3RPJjMF0sGwwcNtncaT-tQ',
  },
};
const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (env === 'dev') {
    return ENV.dev;
  }
};
export default getEnvVars;
