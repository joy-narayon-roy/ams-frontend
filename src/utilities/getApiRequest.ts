import axios from "axios";

function getApiRequest(token: string | null) {
  const req = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
    headers: {
      Authorization: `Bear ${token ? token : ""}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return req;
}

export default getApiRequest;
