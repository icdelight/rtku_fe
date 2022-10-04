let response = {
  responseCode: 999,
  responseDesc: "",
  responseData: null,
};

export const defaultSuccessRes = (res) => {
  if (res) {
    if (res.data) {
      if (res.data.statusCode) {
        response = {
          responseCode: res.data.statusCode,
          responseDesc: res.data.message,
          responseData: res.data.data,
        };
      } else {
        response = {
          responseCode: 999,
          responseDesc: res.data.message,
          responseData: [],
        };
      }
    } else {
      response = {
        responseCode: 999,
        responseDesc: "Invalid response. 3",
        responseData: [],
      };
    }
  } else {
    response = {
      responseCode: 999,
      responseDesc: "Failled to parse response.",
      responseData: [],
    };
  }
  return response;
};

export const defaultFailedRes = (error) => {
  // console.log(error);
  if (error.response) {
    // Request made and server responded
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
    response = {
      responseCode: error.response.status,
      responseDesc: error.response.data.message,
      responseData: null,
    };
  } else if (error.request) {
    // The request was made but no response was received
    // console.log(error.request);
    response = {
      responseCode: 999,
      responseDesc: error.request,
      responseData: null,
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    // console.log('Error', error.message);
    response = {
      responseCode: 999,
      responseDesc: `Something went wrong, ${error.message}`,
      responseData: null,
    };
  }
  return response;
};
