import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-burger-bilder.firebaseio.com/"
});

export default instance;
