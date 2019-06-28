const getTime = () =>
  new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toJSON()
    .substring(0, 19)
    .replace("T", " ");

import CodeMirror from "codemirror";
import "codemirror/mode/meta.js";

export default {
  state: {
    newFile: false,
    activeFile: "",
    files: [],
    modes: [
      "text/plain",
      "text/markdown",
      "text/html",
      "application/json",
      "application/javascript",
      "text/x-ini",
      "text/x-scheme",
      "text/x-spreadsheet",
      "text/x-lua"
    ]
  },
  mutations: {
    ADD_FILE(state, fileObj) {
      if (!state.files.find(el => el.name == fileObj.name))
        state.files.push(fileObj);
    },
    REMOVE_FILE(state, name) {
      let index = -1;
      state.files = state.files.filter((el, i) => {
        if (el && el.name != name) {
          return el;
        } else {
          index = i;
        }
      });
      if (state.files.length != 0) {
        if (name == state.activeFile) {
          if (index != -1 && index < 2) {
            state.activeFile = state.files[0].name;
          } else {
            if (state.files.length - 1 > index) {
              state.activeFile = state.files[index + 1].name;
            } else if (state.files.length - 1 < index) {
              state.activeFile = state.files[index - 1].name;
            } else {
              state.activeFile = state.files[index - 1].name;
            }
          }
        }
      } else {
        state.activeFile = null;
      }
    },
    CHANGE_NAME(state, name, newName) {
      state.files = state.files.filter(el => {
        el.name = el.name == name ? newName : el.name;
        return el;
      });
    },
    SAVE(state, val) {
      let obj = state.files.find(el => el.name == state.activeFile);
      obj.data = val;
      obj.save.is = true;
      obj.save.last = getTime();
    },
    CHANGE_MODE(state, name, mode) {
      state.files = state.files.filter(el => {
        el.mode = el.name == name ? mode : el.mode;
        return el;
      });
    },
    ACTIVE_FILE(state, name) {
      state.activeFile = name;
    },
    NEW_FILE_MODAL(state, val) {
      state.newFile = val;
    }
  },
  actions: {
    addFile({ commit }, newFile) {
      const { name, data, mode, last } = newFile;
      let detectMode = CodeMirror.findModeByFileName(name)
        ? CodeMirror.findModeByFileName(name).mime
        : "text/plain";
      const fileObj = {
        name: name,
        mode: mode ? mode : detectMode,
        save: {
          last: last ? last : getTime(),
          is: true
        },
        data: data ? data : ""
      };
      commit("ADD_FILE", fileObj);
      commit("ACTIVE_FILE", name);
    },
    removeFile({ commit }, name) {
      commit("REMOVE_FILE", name);
    },
    saveFile({ commit }, value) {
      commit("SAVE", value);
    },
    switchFile({ commit }, name) {
      commit("ACTIVE_FILE", name);
    },
    newFileModal({ commit }, value) {
      commit("NEW_FILE_MODAL", value);
    }
  },
  getters: {
    activeFile: state => state.activeFile,
    newFileModal: state => state.newFile,
    files: state => state.files,
    fileByName: (state, getters) => name => {
      return getters.files.find(el => el.name === name);
    },
    fileIsSaved: (state, getters) => name => {
      return state.activeFile && state.files
        ? getters.fileByName(name ? name : state.activeFile).save.is
        : null;
    },
    fileLastSaved: (state, getters) => name => {
      return (state.activeFile && state.files) || name
        ? getters.fileByName(name ? name : state.activeFile).save.last
        : "never";
    },
    fileMode: (state, getters) => {
      return state.activeFile && state.files
        ? getters.fileByName(state.activeFile).mode
        : "none";
    },
    fileData: (state, getters) => name => {
      return getters.fileByName(name ? name : state.activeFile).data;
    },
    fileLines: (state, getters) => {
      return state.activeFile && state.files
        ? getters.fileData(state.activeFile).split("\n").length
        : 0;
    },
    fileStringified: (state, getters) => name =>
      JSON.stringify(getters.fileByName(name))
  }
};
