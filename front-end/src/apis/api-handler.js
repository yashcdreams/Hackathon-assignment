import axios from "axios";

export const postMethodCall = async (
  url,
  data,
  contentType = "application/json"
) => {
  try {
    const apiResponse = await axios({
      method: "post",
      url,
      data,
      headers: { "Content-Type": contentType },
    });
    return { status: true, data: apiResponse.data };
  } catch (err) {
    return { status: false, data: err.response?.data };
  }
};

export const getMethodCall = async (url) => {
  try {
    const apiResponse = await axios({ method: "get", url });
    return { status: true, data: apiResponse.data };
  } catch (error) {
    return { status: false, data: error?.response?.data };
  }
};

export const putMethodCall = async (
  url,
  data,
  contentType = "application/json"
) => {
  try {
    const apiResponse = await axios({
      method: "put",
      url,
      data,
      headers: { "Content-Type": contentType },
    });
    return { status: true, data: apiResponse.data };
  } catch (error) {
    return { status: false, data: error };
  }
};

export const deleteMethodCall = async (
  url,
  contentType = "application/json"
) => {
  try {
    const apiResponse = await axios({
      method: "delete",
      url,
    });
    return { status: true, data: apiResponse.data };
  } catch (error) {
    return { status: false, data: error };
  }
};
