const language = {
  state: {
    language: "en"
  },
  reducers: {
    setState(state, payload) {
      state = { ...state, ...payload };
      return { ...state };
    },
    changeLanguage(state, payload) {
      state.language = payload;
      return { ...state };
    }
  },
  effects: {}
};
export default language;
