import CodeMirror from "codemirror";
import "codemirror/mode/meta.js";

const modes = CodeMirror.modeInfo.filter(el => {
  return {
    mode: el.mode,
    mime: el.mime
  };
});

export default {
  state: {
    moreDialog: false,
    filesDialog: false,
    settingsModal: false,
    helpModal: false,
    tabSize: 2,
    lineNumbers: true,
    keyMap: "sublime",
    keyMaps: ["sublime", "vim"],
    lineWrapping: false,
    scrollPastEnd: true,
    autoCloseBrackets: true,
    smartIndent: true,
    fontSize: 16,
    fontSizesArray: [14, 16, 18, 20, 22, 24, 26, 28],
    modes: modes
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
    },
    SHOW_MORE(state, val) {
      state.moreDialog = !!val;
    },
    FILES_DIALOG(state, val) {
      state.filesDialog = !!val;
    },
    HELP_MODAL(state, val) {
      state.helpModal = !!val;
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
      commit("FILES_DIALOG", false);
    },
    showMore({ commit }, val) {
      commit("SHOW_MORE", val);
      commit("FILES_DIALOG", false);
    },
    showFilesDialog({ commit }, val) {
      commit("FILES_DIALOG", val);
      commit("SHOW_MORE", false);
    },
    showHelpModal({ commit }, val) {
      commit("HELP_MODAL", val);
    }
  },
  getters: {
    lineNumbers: state => state.lineNumbers,
    fontSize: state => state.fontSize,
    fontSizeArray: state => state.fontSizeArray,
    showSettings: state => state.settingsModal,
    moreDialog: state => state.moreDialog,
    filesDialog: state => state.filesDialog,
    helpModal: state => state.helpModal
  }
};
