const header = {
  state: {
    header: 0
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return { ...state };
    }
  },
  effects: {}
};

export default header;
