import { API_URL, API_KEY } from "../setting";
import axios from "axios";
const devices = {
  state: {
    devices: [],
    allDevices: [],
    requireFactors: []
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return { ...state };
    },
    setDevices(state, payload) {
      state.devices = [...state.devices, payload];
      return { ...state };
    },
    clearDevices(state, payload) {
      state.devices = [];
      return { ...state };
    },
  },
  effects: {
    loadAllDevices(payload, rootState) {
      axios
        .get(API_URL + "/devices", { headers: { apiKey: API_KEY } })
        .then((response) => {
          console.log("allDevices", response.data);
          this.setState({ allDevices: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadAllDevicesRentPage(payload, rootState) {
      axios
        .get(API_URL + "/devices/fetchIsShowClient", { headers: { apiKey: API_KEY } })
        .then((response) => {
          
          this.setState({ requireFactors: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async loadDevices(payload, rootState) {
      axios({
        method: "POST",
        url: API_URL + "/devices/get",
        data: { id: payload },
        headers: { apiKey: API_KEY },
      })
        .then((response) => {
          this.setState({ devices: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default devices;
