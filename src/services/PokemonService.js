import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default {
  get(resource) {
    return apiClient.get(resource);
  },
};
