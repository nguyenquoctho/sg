import { API_URL, API_KEY } from "../setting";
import axios from "axios";
const services = {
  state: {
    services: [],
    allServices: [],
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return { ...state };
    },
    setServices(state, payload) {
      state.services = [...state.services, payload];
      return { ...state };
    },
    clearServices(state, payload) {
      console.log("clear services");
      state.services = [];
      return { ...state };
    },
  },
  effects: {
    loadAllServices(payload, rootState) {
      axios
        .get(API_URL + "/services", { headers: { apiKey: API_KEY } })
        .then((response) => {
          this.setState({ allServices: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async loadServices(payload, rootState) {
      console.log("loadServices", payload);
      axios
        .get(API_URL + "/services/get", {
          params: { id: payload },
          headers: { apiKey: API_KEY },
        })
        .then((response) => {
          this.setState({ services: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default services;
