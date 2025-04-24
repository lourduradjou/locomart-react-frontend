// used as interceptors (for adding header in the request )

import axios from "axios"; //used to make the request to the backend

//create a axios object and mark the baseurl to port 8000(to the backend)
const api = axios.create({
  baseURL: "http://localhost:8000/",
});

//use the interceptors request in api object and check whether the user is allowed to use the backend , logged in or not
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access"); //get the access token  from the localstorage
  if (token) {
    //if token exist , we can make the header authorization part with
    // that token so that we can allow the user to connect with the backend
    config.headers.authorization = `Bearer ${token}`;
  }
  return config; //return in configuration
});

export default api;
