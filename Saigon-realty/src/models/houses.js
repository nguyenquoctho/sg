import {
  BASE_URL,
  API_URL,
  COMPANY_CODE,
  API_KEY,
  limitPerRequest,
} from "../setting";
import axios from "axios";

const houses = {
  state: {
    loading: false,
    houses: [],
    housesByQuery: [],
    houseBySlug: { images: [], services: [], devices: [] },
    numberOfHouses: "",
    query: {
      query: {},
      page: 1,
      pageSize: 15,
      sort: "-date-post",
    },
    houseById: {
      images: [],
      services: [],
      devices: [],
    },
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return { ...state };
    },
    setQuery(state, payload) {
      state.query = { ...state.query, ...payload };
      return { ...state };
    },
    setQueryFilter(state, payload) {
      state.query.filter = [...state.query.filter, payload];
      return { ...state };
    },
    setQuerySort(state, payload) {
      state.query.sort = payload;
      return { ...state };
    },
    setQueryPrice(state, payload) {
      state.query.price = payload;
      return { ...state };
    },
    setQueryPage(state, payload) {
      state.query.page = payload;
      return { ...state };
    },
    setQuerySearch(state, payload) {
      state.query.search = payload;
      return { ...state };
    },
    setQueryDevices(state, payload) {
      state.query.query.devices = { $in: payload };
      return { ...state };
    },
    clearQueryFilter(state, payload) {
      // state.query.filter = state.query.filter.filter((item) => {
      //   if (item != null) return Object.keys(item)[0] !== payload;
      // });
      return { ...state };
    },
    setDefaultImage(state, payload) {
      state.houseBySlug.images = [...state.houseBySlug.images, payload];
      return { ...state };
    },
    clearQuery(state, payload) {
      state.query = {
        query: {},
        page: 1,
        pageSize: 15,
        sort: "date_post",
        search: "",
      };
      return { ...state };
    },
  },
  effects: (dispatch) => ({
    loadHouses(payload, rootState) {
      axios
        .get(API_URL + "/houses", { headers: { apiKey: API_KEY } })
        .then((response) => {
          this.setState({ houses: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchClientHouses(payload, rootState) {
      axios
        .get(API_URL + "/houses/fetchClientHouses", { headers: { apiKey: API_KEY } })
        .then((response) => {
          this.setState({ houses: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async loadHouseById(payload, rootState) {
      this.setState({ loading: true });
      let current = this;
      axios
        .get(API_URL + "/houses/get", {
          params: { id: payload },
          headers: { apiKey: API_KEY },
        })
        .then(async (response) => {
          current.setState({
            houseById: response.data,
            loading: false,
          });
          dispatch.projects.loadProjectById(response.data.projectId);
          dispatch.services.loadServices(response.data.services);
          dispatch.devices.loadDevices(response.data.devices);
          response.data.similarListing.list1.map((item) => {
            dispatch.houseList.loadLoaction(item);
          });
          response.data.similarListing.list2.map((item) => {
            dispatch.houseList.loadPrice(item);
          });
          if (response.data.images.length === 0) {
            current.setDefaultImage(BASE_URL + "/images/default.jpg");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadHousesByQuery(payload, rootState) {
      let current = this;
      this.setState({ loading: true });
      axios({
        method: "POST",
        url: API_URL + "/houses/loadHouses",
        data: payload,
        headers: { apiKey: API_KEY },
      })
        .then((response) => {
          current.setState({ housesByQuery: response.data, loading: false });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listCompanyHouses(payload, rootState) {
      let current = this;
      this.setState({ loading: true });
      axios({
        method: "POST",
        url: API_URL + "/houses/listCompanyHouses",
        data: payload,
        headers: { apiKey: API_KEY },
      })
        .then((response) => {
          console.log(response)
          current.setState({
            housesByQuery: response.data.rows,
            numberOfHouses: response.data.total,
            loading: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listCompanyClientHouses(payload, rootState) {
      console.log(payload)
      let current = this;
      this.setState({ loading: true });
      axios({
        method: "POST",
        url: API_URL + "/houses/listCompanyClientHouses",
        data: payload,
        headers: { apiKey: API_KEY },
      })
        .then((response) => {
          console.log(response)
          current.setState({
            housesByQuery: response.data.rows,
            numberOfHouses: response.data.total,
            loading: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listCompanyRentHouses(payload, rootState) {
      let current = this;
      this.setState({ loading: true });
      axios({
        method: "POST",
        url: API_URL + "/houses/listCompanyRentHouses",
        data: payload,
        headers: { apiKey: API_KEY },
      })
        .then((response) => {
          current.setState({
            housesByQuery: response.data.rows,
            numberOfHouses: response.data.total,
            loading: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listCompanySaleHouses(payload, rootState) {
      let current = this;
      this.setState({ loading: true });
      axios({
        method: "POST",
        url: API_URL + "/houses/listCompanySaleHouses",
        data: payload,
        headers: { apiKey: API_KEY },
      })
        .then((response) => {
          current.setState({
            housesByQuery: response.data.rows,
            numberOfHouses: response.data.total,
            loading: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadHousesByQueryNoLimit(payload, rootState) {
      let current = this;
      this.setState({ loading: true });
      let noLimit = {
        ...payload,
        limit: 0,
        page: 0,
      };

      axios({
        method: "POST",
        url: API_URL + "/houses/loadHouses",
        data: noLimit,
        headers: { apiKey: API_KEY },
      })
        .then((response) => {
          current.setState({ numberOfHouses: response.data.length });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadHouseBySlug(payload, rootState) {
      let current = this;
      this.setState({ loading: true });
      axios
        .get(API_URL + "/houses/slug", {
          params: { slug: payload },
          headers: {
            apiKey: API_KEY,
          },
        })
        .then(async (response) => {
          this.setState({ loading: false });
          current.setState({ houseBySlug: response.data });
          if (response.data.images.length === 0) {
            current.setDefaultImage(BASE_URL + "/images/default.jpg");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // loadHouseFactorsBySlug(payload, rootState) {
    //   let current = this;
    //   this.setState({ loading: true });
    //   axios
    //     .get(API_URL + "/houses/getHouseFactorsBySlug", {
    //       params: { slug: payload },
    //       headers: {
    //         apiKey: API_KEY,
    //       },
    //     })
    //     .then(async (response) => {
    //       this.setState({ loading: false });
    //       current.setState({ houseBySlug: response.data });
    //       if (response.data.images.length === 0) {
    //         current.setDefaultImage(BASE_URL + "/images/default.jpg");
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
  }),
};

export default houses;
