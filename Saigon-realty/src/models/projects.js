import { API_URL, API_KEY } from "../setting";
import axios from "axios";
const projects = {
  state: {
    projects: [],
    projectById: {}
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return { ...state };
    }
  },
  effects: dispatch => ({
    loadAllProjects(payload, rootState) {
      let current = this;
      axios
        .get(API_URL + "/projects", {
          params: payload,
          headers: { apiKey: API_KEY }
        })
        .then(response => {
          current.setState({ projects: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    },
    async loadProjectById(payload, rootState) {
      let current = this;
      await axios
        .get(API_URL + "/projects/get", {
          params: { id: payload },
          headers: { apiKey: API_KEY }
        })
        .then(response => {
          current.setState({ projectById: response.data });
          dispatch.facilities.loadFacilities(response.data.amenities);
        })
        .catch(error => {
          console.log(error);
        });
    }
  })
};
export default projects;
