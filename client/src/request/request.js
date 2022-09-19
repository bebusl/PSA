import axios from "axios";

function defaulHandler(result) {
  // console.log("msw ::", result);
}

function requests(baseURL = "http://localhost:3000") {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
  });

  async function requestHandler(
    request,
    callback = defaulHandler,
    errorHandler = defaulHandler
  ) {
    try {
      const result = await request();
      if (callback) callback(result);
      return result;
    } catch (error) {
      if (errorHandler) errorHandler();
      return error;
    }
  }

  async function get({ url, config, callback, errorHandler }) {
    const request = () => axiosInstance.get(url, config);
    return requestHandler(request, callback, errorHandler);
  }

  async function post({ url, data, config, callback, errorHandler }) {
    const request = () => axiosInstance.post(url, data, config);
    return requestHandler(request, callback, errorHandler);
  }
  return { get, post };
}

export default requests();
