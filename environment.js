import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiKey: 'AIzaSyDiwHaKjWBEnIh3B6mIGNN-5wBAQXWGZhg',
    googleOauth: {
      client_id: '393543792096-tb6s0g04d73kv71p0em266abv78jffsf.apps.googleusercontent.com', project_id: 'sunlit-theory-279801', auth_uri: 'https://accounts.google.com/o/oauth2/auth', token_uri: 'https://oauth2.googleapis.com/token', auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs', redirect_uris: ['urn:ietf:wg:oauth:2.0:oob', 'http://localhost'],
    },
    mapBox: 'pk.eyJ1IjoibW9udGhlbSIsImEiOiJja2IxZmtwcWowMmYzMnhyMXQ5OTZ0dmt3In0.3RPJjMF0sGwwcNtncaT-tQ',
  },
};
const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (env === 'dev') {
    return ENV.dev;
  }
};
export default getEnvVars;
