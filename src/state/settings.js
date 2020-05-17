import CodeMirror from "codemirror";
import "codemirror/mode/meta.js";

const modes = CodeMirror.modeInfo.filter(el => {
  return {
    mode: el.mode,
    mime: el.mime
  };
});

const pjson = require("../../package.json");
const version = pjson.version;

export default {
  state: {
    version: version,
    tabSize: 2,
    lineNumbers: true,
    keyMap: "sublime",
    keyMaps: ["sublime", "vim"],
    lineWrapping: false,
    scrollPastEnd: true,
    autoCloseBrackets: true,
    smartIndent: true,
    fontSize: 16,
    modes: modes,
    promptLeave: true
  },
  mutations: {
    TAB_SIZE(state, size) {
      state.tabSize = size;
    },
    PROMPT_LEAVE(state, val) {
      state.promptLeave = val;
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
    KEY_MAP(state, val) {
      state.keyMap = val;
    }
  },
  actions: {
    setLineNumbers({ commit }, enabled) {
      commit("NUM_LINES", !!enabled);
    },
    setFontSize({ commit }, size) {
      commit("FONT_SIZE", parseInt(size, 10));
    },
    setKeyMap({ commit }, val) {
      commit("KEY_MAP", val);
    },
    setPromptLeave({ commit }, val) {
      commit("PROMPT_LEAVE", val);
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
    version: state => state.version,
    keyMap: state => state.keyMap,
    keyMaps: state => state.keyMaps,
    scrollPastEnd: state => state.scrollPastEnd,
    tabSize: state => state.tabSize,
    smartIndent: state => state.smartIndent,
    autoClose: state => state.autoCloseBrackets,
    lineWrap: state => state.lineWrapping,
    modes: state => state.modes,
    showPromptLeave: state => state.promptLeave
  }
};
