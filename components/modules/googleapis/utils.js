import getEnvVars from '../../../environment';

const { apiKey, clientId } = getEnvVars('dev');

const mapOptionToQuery = (options, appendKey) => {
  if (appendKey) Object.assign(options, { key: apiKey });
  return Object.keys(options).map((optionName) => `${optionName}=${options[optionName]}`).join('&');
};

/**
 * @param {String} baseUrl
 * @param {*} options
 * @param {Boolean} appendKey
 */
const convertApiToFunction = (baseUrl, options, appendKey) => {
  // console.log(`${baseUrl}${mapOptionToQuery(options, appendKey)}`);
  return fetch(`${baseUrl}${mapOptionToQuery(options, appendKey)}`);
};

const convertBlobToBase64 = (blob) => {
  const fileReaderInstance = new FileReader();
  return new Promise((resolve, reject) => {
    fileReaderInstance.onload = () => {
      const base64data = fileReaderInstance.result;
      resolve(base64data);
    };
    try {
      fileReaderInstance.readAsDataURL(blob);
    } catch (err) {
      reject(err);
    }
  });
};

export default {
  mapOptionToQuery,
  convertApiToFunction,
  convertBlobToBase64,
};
