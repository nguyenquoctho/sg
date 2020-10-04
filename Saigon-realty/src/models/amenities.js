import { API_URL, API_KEY } from "../setting";
import axios from "axios";
const amenities = {
  state: {
    amenities: []
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return { ...state };
    },
    setAmnenities(state, payload) {
      state.amenities = [...state.amenities, payload];
      return { ...state };
    }
  },
  effects: {
    loadAllAmenities(payload, rootState) {
      axios
        .get(API_URL + "/amenities", { headers: { apiKey: API_KEY } })
        .then(response => {
          this.setState({ amenities: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadAmenities(payload, rootState) {
      axios
        .get(API_URL + "/amenities/get", {
          params: { id: payload },
          headers: { apiKey: API_KEY }
        })
        .then(response => {
          this.setAmnenities(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

export default amenities;
