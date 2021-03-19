const getTime = () =>
  new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toJSON()
    .substring(0, 19)
    .replace("T", " ");

import "codemirror/mode/meta.js";
export default {
  state: {
    activeFile: {
      gist_id: "",
      name: "",
      data: "",
      size: "",
      mediaSize: "",
    },
    files: [],
    publicGists: [],
    gist_dir: null,
    queryFailed: false,
    queryFailedObj: {},
    queryActive: false,
    gists: [],
    gistLoading: true,
  },
  mutations: {
    SET_LOADING(state, val) {
      state.gistLoading = val;
    },
    PUBLIC_GISTS(state, arr) {
      state.publicGists = arr;
    },
    ADD_FILE(state, data) {
      if (!state.files.find((el) => el.name == data.name)) {
        state.files.push(data);
      }
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
    CHANGE_NAME(state, obj) {
      state.files = state.files.filter((el) => {
        el.name = el.name == obj.name ? obj.newName : el.name;
        return el;
      });
    },
    SAVE(state) {
      if (state.activeFile.name && state.activeFile.data) {
        let obj = state.files.find((el) => el.name == state.activeFile.name);
        obj.data = state.activeFile.data;
        let len = new TextEncoder("utf-8").encode(state.activeFile.data).length;
        obj.size = len;
        obj.hash = state.activeFile.data.hashCode();
      }
    },
    CHANGE_MODE(state, name, mode) {
      state.files = state.files.filter((el) => {
        el.mode = el.name == name ? mode : el.mode;
        return el;
      });
    },
    GIST_FIRST(state, name) {
      const file = state.files.find((el) => el.name == name);
      file.gistFirst = name;
    },
    ACTIVE_FILE(state, name) {
      state.activeFile.name = name;
      const el = state.files.filter((el) => el.name == name)[0];
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
    NOT_SAVED(state) {
      let obj = state.files.find((el) => el.name == state.activeFile.name);
      obj.save.is = false;
    },
    FILES(state, files) {
      state.files = files;
    },
    GISTS(state, gists) {
      state.gists = gists;
    },
    GIST_DIR(state, dir) {
      state.gist_dir = dir;
    },
    QUERY_FAILED(state, obj) {
      state.queryFailed = obj || false;
      state.queryFailedObj = obj || null;
    },
    QUERY_ACTIVE(state, status) {
      state.queryActive = status;
    },
  },
  actions: {
    setLoading({ commit }, val) {
      commit("SET_LOADING", val);
    },
    setHeaders({ getters }) {
      return getters.authorized
        ? {
            "Content-type": "application/json",
            Authorization: `${getters.tokenType} ${getters.token}`,
          }
        : {
            "Content-type": "application/json",
          };
    },
    async newGist({ dispatch }, obj) {
      // console.log("NEWGIST", obj.url, obj.files);
      let headers = await dispatch("setHeaders");
      let response = await fetch(obj.url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          description: "Gist created with https://gist.suchanecki.me/",
          public: obj.public || false,
          files: obj.files,
        }),
      });
      return response;
    },
    async patchGist({ getters, dispatch }, obj) {
      let headers = await dispatch("setHeaders");
      return await fetch(`https://api.github.com/gists/${obj.id}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({
          description:
            getters.fileById(obj.id).description ||
            "Gist created with https://gist.suchanecki.me/",
          public: obj.public || false,
          files: obj.files,
        }),
      });
    },
    async updateGists({ dispatch }, link) {
      return await dispatch("getGists", { link: link });
    },
    async appendGists({ dispatch }, link) {
      // console.log(link);
      return dispatch("getGists", { link: link, append: true });
    },
    async getGists({ state, commit, dispatch, getters }, obj) {
      commit("QUERY_FAILED", false);
      commit("QUERY_ACTIVE", true);
      let headers = await dispatch("setHeaders");
      return fetch(obj.link, {
        method: "GET",
        headers: headers,
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            commit("QUERY_FAILED", {
              message: res.message,
              link: obj.link,
              authorized: getters.authorized,
            });
            commit("QUERY_ACTIVE", false);
          } else {
            commit("QUERY_FAILED", false);
            commit("QUERY_ACTIVE", false);
            if (obj.append) {
              dispatch("setPublicGists", [...getters.publicGists, ...res]);
              commit("GISTS", [...getters.gists, ...res]);
            } else {
              dispatch("setPublicGists", res);
              commit("GISTS", res);
            }
            commit("SET_LOADING", true);
          }
        })
        .catch((e) => {
          state.queryFailed = "Failed to fetch gists";
          commit("GISTS", []);
          commit("QUERY_ACTIVE", false);
          commit("QUERY_FAILED", {
            message: e,
            link: state.gist_dir,
            authorized: getters.authorized,
          });
        });
    },
    addFile({ commit, getters }, newFile) {
      // console.log(newFile);
      Object.keys(newFile.files).forEach(async (gist) => {
        let fileObj = {
          name: newFile.files[gist].filename,
          mode: newFile.files[gist].type,
          public: newFile.public,
          save: {
            last: newFile.updated_at,
            is: true,
          },
          data: newFile.files[gist].content,
          size: newFile.files[gist].size,
          mediaSize: "",
          owner: newFile.owner.login,
          hash: newFile.files[gist].content
            ? newFile.files[gist].content.hashCode()
            : "".hashCode(),
          gistId: newFile.id,
          description: newFile.description,
          gistFirst: newFile.files[Object.keys(newFile.files)[0]].filename,
          comments_url: newFile.comments_url,
          comments: newFile.comments,
        };
        if (fileObj.data.length === 0) {
          let headers = getters.authorized
            ? {
                Authorization: `${getters.tokenType} ${getters.token}`,
              }
            : {};
          fileObj.data = await (
            await fetch(newFile.files[gist].raw_url, {
              headers: headers,
            })
          ).text();
        }
        console.log(fileObj);
        return new Promise((res) => {
          res(commit("ADD_FILE", fileObj));
        });
      });
    },
    async removeFile({ getters, dispatch, commit }, obj) {
      let files = await getters.files.filter(
        (el) => el.gistId == obj.id && el.name != obj.name
      );
      let preFiles = {};
      files.forEach((el) => {
        preFiles[el.name] = {
          content: el.data,
        };
      });
      preFiles[obj.name] = null;
      if (getters.authorized) {
        dispatch("patchGist", {
          id: obj.id,
          files: preFiles,
        })
          .then((res) => res.json())
          .then(() => {
            commit("REMOVE_FILE", obj.name);
          })
          .catch((e) => {
            alert(e);
          });
      } else {
        commit("REMOVE_FILE", obj.name);
      }
    },
    async saveFile({ commit, state, getters, dispatch }, FILES) {
      let headers = await dispatch("setHeaders");
      let obj;
      let preFiles = {};

      if (FILES) {
        obj = FILES;
      } else {
        obj = {
          name: getters.activeFile,
          id: getters.fileByName(getters.activeFile).gistId,
        };
        getters.files
          .filter((el) => el.gistId == obj.id && el.data)
          .forEach((el) => {
            preFiles[el.name] = {
              content: el.data,
            };
          });
      }
      commit("SAVE");
      preFiles[obj.name] = {
        content: getters.fileByName(getters.activeFile).data,
      };
      if (!getters.authorized) {
        let file = state.files.find(
          (el) => el.name == state.activeFile.name && el.gistId == obj.id
        );
        file.save.is = true;
        file.save.last = getTime();
      } else {
        fetch(`https://api.github.com/gists/${obj.id}`, {
          method: "PATCH",
          headers: headers,
          body: JSON.stringify({
            files: preFiles,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            let file = state.files.find(
              (el) => el.name == state.activeFile.name && el.gistId == obj.id
            );
            file.save.is = true;
            file.save.last = getTime();
          })
          .catch((e) => {
            let file = state.files.find(
              (el) => el.name == state.activeFile.name && el.gistId == obj.id
            );
            file.save.is = false;
            // console.log(e);
          });
      }
    },
    activeFileData({ commit, getters, dispatch }, value, dispName) {
      if (value.hashCode() != getters.fileHash) {
        commit("NOT_SAVED");
      }
      commit("ACTIVE_FILE_DATA", value);
      if (dispName) {
        dispatch(`${dispName}`);
      }
    },
    switchFile({ commit }, name) {
      commit("ACTIVE_FILE", name);
    },
    removeAll({ commit }) {
      commit("FILES", []);
      commit("ACTIVE_FILE", null);
      commit("ACTIVE_FILE_DATA", null);
    },
    setPublicGists({ commit }, arr) {
      commit("PUBLIC_GISTS", arr);
    },
    closeById({ commit, getters }, id) {
      let files = getters.files;
      files = files.filter((el) => el.gistId != id);
      commit("FILES", files);
      commit("ACTIVE_FILE", null);
      commit("ACTIVE_FILE_DATA", null);
      return true;
    },
    async setStar({ dispatch }, id) {
      let headers = await dispatch("setHeaders");
      return await fetch(`https://api.github.com/gists/${id}/star`, {
        method: "PUT",
        headers: headers,
      });
    },
    async unStar({ dispatch }, id) {
      let headers = await dispatch("setHeaders");
      return await fetch(`https://api.github.com/gists/${id}/star`, {
        method: "DELETE",
        headers: headers,
      });
    },
  },
  getters: {
    activeFile: (state) => state.activeFile.name,
    activeFileData: (state) => state.activeFile.data,
    activeFileSize: (state) => state.activeFile.size,
    activeFileGistId: (state) => state.activeFile.gist_id,
    activeFileMediaSize: (state) => state.activeFile.mediaSize,
    activeFileIndex: (state) => {
      return state.files.findIndex((el) => {
        return el.name == state.activeFile.name;
      });
    },
    files: (state) => state.files,
    fileNameByIndex: (state) => (index) => {
      return state.files[index].name || null;
    },
    fileByIndex: (state) => (index) => {
      return state.files[index] || null;
    },
    fileByName: (state, getters) => (name) => {
      return getters.files.find((el) => el.name === name) || {};
    },
    fileById: (getters) => (id) => {
      return getters.files.find((el) => el.gistId === id);
    },
    fileIsSaved: (state, getters) => (name) => {
      let saved = null;
      if (state.activeFile.name && state.activeFile.data && state.files) {
        if (
          getters.fileByName(name ? name : state.activeFile.name).hash ===
            state.activeFile.data.hashCode() &&
          state.activeFile.data != null
        ) {
          saved = true;
        } else {
          saved = false;
        }
      }
      return saved;
    },
    fileLastSaved: (state, getters) => (name) => {
      return (state.activeFile.name && state.files) || name
        ? getters.fileByName(name ? name : state.activeFile.name).save.last
        : "never";
    },
    fileMode: (state, getters) => {
      return state.activeFile.name && state.files
        ? getters.fileByName(state.activeFile.name).mode
        : "";
    },
    fileData: (state, getters) => (name) => {
      return getters.fileByName(name ? name : state.activeFile.name).data || "";
    },
    fileHash: (state, getters) => (name) =>
      getters.fileByName(name ? name : state.activeFile.name).hash,
    fileLines: (state, getters) => {
      return state.activeFile.name && state.files
        ? getters.fileData(state.activeFile.name).split("\n").length
        : 0;
    },
    fileStringified: (state, getters) => (name) =>
      JSON.stringify(getters.fileByName(name)),
    publicGists: (state) => state.publicGists,
    gists: (state) => state.gists,
    gistsLength: (state) => state.gists.length,
    queryActive: (state) => state.queryActive,
    queryFailed: (state) => state.queryFailed,
    queryFailedObj: (state) => state.queryFailedObj,
    gistLoading: (state) => state.gistLoading,
  },
};
