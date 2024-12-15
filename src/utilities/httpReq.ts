import axios from "axios";

const token = localStorage.getItem("token");
const req = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  headers: {
    Authorization: `Bearer ${token && token}`,
    "Content-type": "application/json; charset=UTF-8",
  },
});

export default req;
