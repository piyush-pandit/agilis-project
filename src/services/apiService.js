import axios from 'axios';

const handle401Error = () => {
  localStorage.clear();
  window.location.href = '/';
};

const ApiCaller = () => {
  const apiCall = async (httpType, url, data, options) => {
    let headers;
    if (localStorage.getItem('bearerToken')) {
      headers = {
        Authorization: localStorage.getItem('bearerToken'),
      };
    }
    try {
      let response;
      switch (httpType.trim().toLowerCase()) {
        case 'get':
          response = await axios.get(url, { headers });
          break;
        case 'post':
          response = await axios.post(url, data, { headers });
          break;
        default:
          throw new Error('Invalid HTTP method provided');
      }
      return response;
    } catch (error) {
      if (error?.response?.status === 401) {
        handle401Error();
      }
      return error.response;
    }
  };

  return { apiCall };
};

export default ApiCaller;
