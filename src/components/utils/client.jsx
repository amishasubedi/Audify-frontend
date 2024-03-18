import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const getClient = async (headers) => {
  const token = await localStorage.getItem("jsonwebtoken");

  if (!token) return axios.create({ baseURL });

  const defaultheaders = {
    Authorization: "Bearer " + token,
    ...headers,
  };

  return axios.create({ baseURL, headers: defaultheaders });
};

export default getClient;
