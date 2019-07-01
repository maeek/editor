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
    version: "0.6.0",
    offline: false,
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
    TAB_SIZE(state, size) {
      state.tabSize = size;
    },
    LINE_WRAP(state, val) {
      state.lineWrapping = val;
    },
    SCROLL_PAST(state, val) {
      state.scrollPastEnd = val;
    },
    SMART_INDENT(state, val) {
      state.smartIndent = val;
    },
    AUTO_CLOSE_BRACKETS(state, val) {
      state.autoCloseBrackets = val;
    },
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
    KEY_MAP(state, val) {
      state.keyMap = val;
    },
    HELP_MODAL(state, val) {
      state.helpModal = !!val;
    },
    OFFLINE(state, val) {
      state.offline = val;
    }
  },
  actions: {
    setLineNumbers({ commit }, enabled) {
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
    },
    changeOffline({ commit }, val) {
      commit("OFFLINE", val);
    },
    setKeyMap({ commit }, val) {
      commit("KEY_MAP", val);
    },
    setTabSize({ commit }, val) {
      commit("TAB_SIZE", val ? val : 2);
    },
    setLineWrap({ commit }, val) {
      commit("LINE_WRAP", val);
    },
    setScrollPast({ commit }, val) {
      commit("SCROLL_PAST", val);
    },
    setAutoClose({ commit }, val) {
      commit("AUTO_CLOSE_BRACKETS", val);
    },
    setSmartIndent({ commit }, val) {
      commit("SMART_INDENT", val);
    }
  },
  getters: {
    lineNumbers: state => state.lineNumbers,
    fontSize: state => state.fontSize,
    fontSizeArray: state => state.fontSizeArray,
    showSettings: state => state.settingsModal,
    moreDialog: state => state.moreDialog,
    filesDialog: state => state.filesDialog,
    helpModal: state => state.helpModal,
    offline: state => state.offline,
    version: state => state.version,
    keyMap: state => state.keyMap,
    keyMaps: state => state.keyMaps,
    scrollPastEnd: state => state.scrollPastEnd,
    tabSize: state => state.tabSize,
    smartIndent: state => state.smartIndent,
    autoClose: state => state.autoCloseBrackets,
    lineWrap: state => state.lineWrapping,
    modes: state => state.modes
  }
};
