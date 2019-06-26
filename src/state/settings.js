export default {
  state: {
    numLines: true,
    fontSize: 16,
    fontSizesArray: [14, 16, 18, 20, 22, 24, 26, 28]
  },
  mutations: {
    NUM_LINES(state, enabled) {
      state.numLines = enabled;
    },
    FONT_SIZE(state, size) {
      state.fontSize = size;
    }
  },
  actions: {
    setNumLines({ commit }, enabled) {
      commit("NUM_LINES", !!enabled);
    },
    setFontSize({ commit }, size) {
      commit("FONT_SIZE", parseInt(size, 10));
    }
  },
  getters: {
    numLines: state => state.numLines,
    fontSize: state => state.fontSize,
    fontSizeArray: state => state.fontSizeArray
  }
};
