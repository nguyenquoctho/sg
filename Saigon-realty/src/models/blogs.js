import {
  BASE_URL,
  API_URL,
  COMPANY_CODE,
  API_KEY,
  limitPerRequest,
} from "../setting";
import axios from "axios";

const blogs = {
  state: {
    blogs: [],
    blogsByQuery: [],
    query: {
      query: {},
      page: 1,
      pageSize: limitPerRequest,
      limit: 200,
    },
    blogById: {},
    featureBlogs: [],
    numberOfBlogs: "",
    categories: [],
    idList: [],
    loading: false,
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return state;
    },
    addToIdList(state, payload) {
      state.idList = { ...state.idList, ...payload };
      return state;
    },
  },
  effects: (dispatch) => ({
    loadAllBlogs(payload, rootState) {
      let current = this;
      axios
        .get(API_URL + "/blogs", {
          params: payload,
          headers: { apiKey: API_KEY },
        })
        .then((response) => {
          current.setState({ blogs: response.data });
        })
        .catch((error) => console.log(error));
    },
    loadBlogById(payload, rootState) {
      let current = this;
      this.setState({ loading: true });
      axios
        .get(API_URL + "/blogs/get", {
          params: { id: payload },
          headers: { apiKey: API_KEY },
        })
        .then((response) => {
          current.setState({ blogById: response.data });
          current.setState({ loading: false });
        })
        .catch((error) => console.log(error));
    },
    loadBlogByQuery(payload, rootState) {
      this.setState({ loading: true });
      let current = this;
      axios
        .get(API_URL + "/blogs/getByQuery", {
          params: payload,
          headers: { apiKey: API_KEY },
        })
        .then((response) => {
          current.setState({ blogsByQuery: response.data.data.rows });
          current.setState({ loading: false });
        })
        .catch((error) => console.log(error));
    },
    loadBlogByQueryNoLimit(payload, rootState) {
      let current = this;
      axios
        .get(API_URL + "/blogs/getByQuery", {
          params: { ...payload, limit: 0 },
          headers: { apiKey: API_KEY },
        })
        .then((response) => {
          current.setState({ numberOfBlogs: response.data.length });
        })
        .catch((error) => console.log(error));
    },
    loadCategories(payload, rootState) {
      axios
        .get(API_URL + "/blogCategories", {
          params: {},
          headers: { apiKey: API_KEY },
        })
        .then((response) => {
          this.setState({ categories: response.data });
        })
        .catch((error) => console.log(error));
    },
  }),
};
export default blogs;
