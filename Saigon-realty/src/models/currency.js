const users = {
  state: {
    unit: "$"
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return { ...state };
    },
    setCurrency(state, payload) {
      state.unit = payload;
      return { ...state };
    }
  },
  effects: {}
};

export default users;
