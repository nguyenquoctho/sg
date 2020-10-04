import { API_PUBLIC } from "../setting";
import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
const customer = {
  state: {
    customer: {},
    isLogin: false,
    loading: false,
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return { ...state };
    },
    setCustomer(state, payload) {
      state.customer = { ...state.customer, ...payload };
      return { ...state };
    },
  },
  effects: {
    login(payload, rootState) {
      let current = this;
      current.setState({ loading: true });
      axios({
        method: "POST",
        url: API_PUBLIC + "/userCustomer/login",
        data: payload,
      })
        .then((response) => {
          current.setState({ loading: false });
          if (response.data.code === 1) {
            cookies.set("customer", response.data.data, { path: "/" });
            current.setState({ customer: response.data.data });
            window.history.back();
          } else {
            current.setState({ isLogin: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    register(payload, rootState) {
      let current = this;
      current.setState({ loading: true });
      axios({
        method: "POST",
        url: API_PUBLIC + "/userCustomer/register",
        data: payload,
      })
        .then((response) => {
          console.log(response.data);
          current.setState({ loading: false });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getById(payload, rootState) {
      let current = this;
      current.setState({ loading: true });
      axios
        .get(API_PUBLIC + "userCustomer/get", { params: payload })
        .then((response) => {
          current.setState({ customer: response.data });
          current.setState({ loading: false });
        })
        .catch((error) => console.log(error));
    },
    update(payload, rootState) {
      let current = this;
      current.setState({ loading: true });
      axios({
        method: "POST",
        url: API_PUBLIC + "userCustomer/update",
        data: payload,
      })
        .then((response) => {
          current.setState({ loading: false });
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default customer;
