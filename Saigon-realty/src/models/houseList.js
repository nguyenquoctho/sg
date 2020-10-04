import { API_URL, API_KEY } from "../setting";
import axios from "axios";
const houseList = {
  state: {
    locationList: [],
    priceList: [],
    likeList: [],
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return { ...state };
    },
    setLocation(state, payload) {
      state.locationList = [...state.locationList, payload];
      state.locationList = state.locationList.filter((item) => {
        return item != "";
      });
      return { ...state };
    },
    setPrice(state, payload) {
      state.priceList = [...state.priceList, payload];
      state.priceList = state.priceList.filter((item) => {
        return item != "";
      });
      return { ...state };
    },
    setLikeHouse(state, payload) {
      state.likeList = [...state.likeList, payload];
      return { ...state };
    },
    removeLikeHouse(state, payload) {
      state.likeList = state.likeList.filter((item) => {
        return item._id != payload._id;
      });
      return { ...state };
    },
  },
  effects: {
    async loadLoaction(payload, rootState) {
      axios
        .get(API_URL + "/houses/get", {
          params: { id: payload },
          headers: { apiKey: API_KEY },
        })
        .then((response) => {
          this.setState({ locationList: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async loadPrice(payload, rootState) {
      let current = this;
      axios
        .get(API_URL + "/houses/get", {
          params: { id: payload },
          headers: { apiKey: API_KEY },
        })
        .then((response) => {
          this.setState({ priceList: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
export default houseList;
