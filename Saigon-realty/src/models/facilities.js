import { API_URL, API_KEY } from "../setting";
import axios from "axios";
const facilities = {
  state: {
    facilities: [],
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return { ...state };
    },
    setFacilities(state, payload) {
      state.facilities = [...state.facilities, payload];
      return { ...state };
    },
    clearFacilities(state, payload) {
      state.facilities = [];
      return { ...state };
    },
  },
  effects: {
    loadFacilities(payload, rootState) {
      axios({
        method: "POST",
        url: API_URL + "/amenities/get",
        data: { id: payload },
        headers: { apiKey: API_KEY },
      })
        .then((response) => {
          this.setState({ facilities: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default facilities;
