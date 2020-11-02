import axios from "axios";

const instance = axios.create({
  baseURL: "https://5f71763264a3720016e60715.mockapi.io",
});

export default instance;
