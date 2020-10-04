const users = {
  state: {
    username: "Thinktodo"
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return { ...state };
    }
  },
  effects: {}
};

export default users;
