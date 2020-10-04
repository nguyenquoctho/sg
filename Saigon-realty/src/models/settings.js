import { API_URL, BASE_URL, API_KEY } from "../setting";
import axios from "axios";
const settings = {
  state: {
    settings: {
      slideImages: [],
      hotProject: [],
      totalUser: 0,
      totalProperties: 0
    }
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return { ...state };
    }
  },
  effects: dispatch => ({
    loadSettings(payload, rootState) {
      let current = this;
      axios
        .get(API_URL + "/settings", {
          params: payload,
          headers: { apiKey: API_KEY }
        })
        .then(response => {
          current.setState({
            settings: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  })
};
export default settings;
