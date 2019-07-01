const getTime = () =>
  new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toJSON()
    .substring(0, 19)
    .replace("T", " ");

function getImageDimensions(file) {
  return new Promise(function(resolved) {
    var i = new Image();
    i.onload = function() {
      resolved({ w: i.width, h: i.height });
    };
    i.src = file;
  });
}

import CodeMirror from "codemirror";
import "codemirror/mode/meta.js";

export default {
  state: {
    newFile: false,
    activeFile: {
      name: "",
      data: "",
      size: "",
      mediaSize: ""
    },
    files: []
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
        if (name == state.activeFile.name) {
          if (index != -1 && index < 2) {
            state.activeFile.name = state.files[0].name;
          } else {
            if (state.files.length - 1 > index) {
              state.activeFile.name = state.files[index + 1].name;
            } else if (state.files.length - 1 < index) {
              state.activeFile.name = state.files[index - 1].name;
            } else {
              state.activeFile.name = state.files[index].name;
            }
          }
        }
      } else {
        state.activeFile.name = null;
        state.activeFile.data = null;
        state.activeFile.mediaSize = null;
        state.activeFile.size = null;
      }
    },
    CHANGE_NAME(state, name, newName) {
      state.files = state.files.filter(el => {
        el.name = el.name == name ? newName : el.name;
        return el;
      });
    },
    SAVE(state) {
      let obj = state.files.find(el => el.name == state.activeFile.name);
      obj.data = state.activeFile.data;
      let len = new TextEncoder("utf-8").encode(state.activeFile.data).length;
      obj.size = len;
      obj.hash = state.activeFile.data.hashCode();
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
      state.activeFile.name = name;
      const el = state.files.filter(el => el.name == name)[0];
      const data = el ? el.data : "";
      const len = el ? el.size : 0;
      const size =
        len > 999
          ? len / 1000 > 999
            ? Math.round((len / 1000 / 1000) * 100) / 100 + " MB"
            : Math.round((len / 1000) * 100) / 100 + " KB"
          : Math.round(len * 100) / 100 + "B";
      state.activeFile.data = data;
      state.activeFile.size = size;
      state.activeFile.mediaSize = el ? el.mediaSize : "";
    },
    ACTIVE_FILE_DATA(state, value) {
      state.activeFile.data = value;
    },
    NEW_FILE_MODAL(state, val) {
      state.newFile = val;
    },
    NOT_SAVED(state) {
      let obj = state.files.find(el => el.name == state.activeFile.name);
      obj.save.is = false;
    },
    FILES(state, files) {
      state.files = files;
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
        data: data ? data : "",
        size: data ? new TextEncoder("utf-8").encode(data).length : "",
        mediaSize: "",
        hash: data ? data.hashCode() : "".hashCode()
      };
      if (mode && mode.includes("image/")) {
        getImageDimensions(data).then(size => {
          fileObj.mediaSize = `${size.w}x${size.h}`;
          commit("ADD_FILE", fileObj);
          commit("ACTIVE_FILE", name);
        });
      } else {
        commit("ADD_FILE", fileObj);
        commit("ACTIVE_FILE", name);
      }
    },
    removeFile({ commit }, name) {
      commit("REMOVE_FILE", name);
    },
    activeFileData({ commit, getters, dispatch }, value, dispName) {
      if (value.hashCode() != getters.fileHash) commit("NOT_SAVED");
      commit("ACTIVE_FILE_DATA", value);
      if (dispName) dispatch(`${dispName}`);
    },
    saveFile({ commit }) {
      commit("SAVE");
    },
    switchFile({ commit }, name) {
      commit("ACTIVE_FILE", name);
    },
    newFileModal({ commit }, value) {
      commit("NEW_FILE_MODAL", value);
    },
    removeAll({ commit }) {
      commit("FILES", []);
      commit("ACTIVE_FILE", null);
      commit("ACTIVE_FILE_DATA", null);
    }
  },
  getters: {
    activeFile: state => state.activeFile.name,
    activeFileData: state => state.activeFile.data,
    activeFileSize: state => state.activeFile.size,
    activeFileMediaSize: state => state.activeFile.mediaSize,
    activeFileIndex: state =>
      state.files.findIndex(el => {
        return el.name == state.activeFile.name;
      }),
    newFileModal: state => state.newFile,
    files: state => state.files,
    fileByIndex: state => index =>
      state.files[index] ? state.files[index].name : null,
    fileByName: (state, getters) => name => {
      return getters.files.find(el => el.name === name);
    },
    fileIsSaved: (state, getters) => name => {
      return state.activeFile.name && state.files
        ? getters.fileByName(name ? name : state.activeFile.name).hash ==
            state.activeFile.data.hashCode()
        : null;
    },
    fileLastSaved: (state, getters) => name => {
      return (state.activeFile.name && state.files) || name
        ? getters.fileByName(name ? name : state.activeFile.name).save.last
        : "never";
    },
    fileMode: (state, getters) => {
      return state.activeFile.name && state.files
        ? getters.fileByName(state.activeFile.name).mode
        : "none";
    },
    fileData: (state, getters) => name => {
      return getters.fileByName(name ? name : state.activeFile.name).data;
    },
    fileHash: (state, getters) => name =>
      getters.fileByName(name ? name : state.activeFile.name).hash,
    fileLines: (state, getters) => {
      return state.activeFile.name && state.files
        ? getters.fileData(state.activeFile.name).split("\n").length
        : 0;
    },
    fileStringified: (state, getters) => name =>
      JSON.stringify(getters.fileByName(name))
  }
};
