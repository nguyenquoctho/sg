import { API_PUBLIC } from "../setting";
import axios from "axios";
const guest = {
  state: {
    isLoading: false,
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return { ...state };
    },
  },
  effects: {
    async request(payload, rootState) {
      this.setState({ isLoading: true });
      let response = await axios({
        method: "POST",
        url: API_PUBLIC + "/guest/request",
        data: payload,
      });
      this.setState({ isLoading: false });
      return response.data;
    },
  },
};

export default guest;
