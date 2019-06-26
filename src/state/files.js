const getTime = () =>
  new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toJSON()
    .substring(0, 19)
    .replace("T", " ");

export default {
  state: {
    newFile: false,
    activeFile: "file.html",
    files: [
      {
        name: "file.html",
        mode: "text/html",
        save: {
          last: getTime(),
          is: true
        },
        data: "yeeeeeeeeeeeeeeee"
      },
      {
        name: "index.js",
        mode: "application/javascript",
        save: {
          last: "",
          is: false
        },
        data: "hahahhahahahh"
      }
    ]
  },
  mutations: {
    ADD_FILE(state, fileObj) {
      state.files.push(fileObj);
    },
    REMOVE_FILE(state, name) {
      let index = -1;
      state.files = state.files.filter((el, i) => {
        if (el.name != name) {
          return el;
        } else {
          index = i;
        }
      });
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
        if (state.files.length == 0) {
          state.activeFile = "";
        }
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
      const { name, data, mode } = newFile;
      const fileObj = {
        name: name,
        mode: mode,
        save: {
          last: getTime(),
          is: true
        },
        data: data
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
      return getters.fileByName(name ? name : state.activeFile).save.is;
    },
    fileLastSaved: (state, getters) => name => {
      return getters.fileByName(name ? name : state.activeFile).save.last;
    },
    fileMode: (state, getters) => {
      return getters.fileByName(state.activeFile).mode;
    },
    fileData: (state, getters) => name => {
      return getters.fileByName(name ? name : state.activeFile).data;
    },
    fileLines: (state, getters) => {
      return getters.fileData(state.activeFile).split("\n").length;
    },
    fileStringified: (state, getters) => name =>
      JSON.stringify(getters.fileByName(name))
  }
};
