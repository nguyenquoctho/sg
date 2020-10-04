import { API_PUBLIC } from "../setting";
import axios from "axios";
import { Cookies } from "react-cookie";
const customer = {
  state: {
    customer: {},
    isLogin: false,
    loading: false
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return { ...state };
    },
    setCustomer(state, payload) {
      state.customer = { ...state.customer, ...payload };
      return { ...state };
    }
  },
  effects: {
    register(payload, rootState) {
      let current = this;
      current.setState({ loading: true });
      axios({
        method: "POST",
        url: API_PUBLIC + "/customer/register",
        data: payload
      })
        .then(response => {
          console.log(response.data);
          current.setState({ loading: false });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

export default customer;
