export default {
  state: {
    settingsModal: false,
    tabSize: 2,
    closeBrackets: true,
    lineNumbers: true,
    keyMap: "sublime",
    keyMaps: ["sublime", "vim"],
    lineWrapping: false,
    scrollPastEnd: true,
    fontSize: 16,
    fontSizesArray: [14, 16, 18, 20, 22, 24, 26, 28]
  },
  mutations: {
    NUM_LINES(state, enabled) {
      state.lineNumbers = enabled;
    },
    FONT_SIZE(state, size) {
      state.fontSize = size;
    },
    SHOW_SETTINGS(state, val) {
      state.settingsModal = val;
    }
  },
  actions: {
    setlineNumbers({ commit }, enabled) {
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
    lineNumbers: state => state.lineNumbers,
    fontSize: state => state.fontSize,
    fontSizeArray: state => state.fontSizeArray,
    showSettings: state => state.settingsModal
  }
};
