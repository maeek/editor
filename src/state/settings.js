export default {
  state: {
    settingsModal: false,
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
    },
    SHOW_SETTINGS(state, val) {
      state.settingsModal = val;
    }
  },
  actions: {
    setNumLines({ commit }, enabled) {
      commit("NUM_LINES", !!enabled);
    },
    setFontSize({ commit }, size) {
      commit("FONT_SIZE", parseInt(size, 10));
    },
    toggleSettings({ commit }, val) {
      commit("SHOW_SETTINGS", val);
    }
  },
  getters: {
    numLines: state => state.numLines,
    fontSize: state => state.fontSize,
    fontSizeArray: state => state.fontSizeArray,
    showSettings: state => state.settingsModal
  }
};
