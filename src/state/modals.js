export default {
  state: {
    offline: false,
    newFile: false,
    moreDialog: false,
    filesDialog: false,
    rmFile: false,
    settingsModal: false,
    helpModal: false
  },
  mutations: {
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
    },
    OFFLINE(state, val) {
      state.offline = val;
    },
    NEW_FILE_MODAL(state, val) {
      state.newFile = val;
    },
    RM_FILE_MODAL(state, val) {
      state.rmFile = val;
    }
  },
  actions: {
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
    newFileModal({ commit }, value) {
      commit("NEW_FILE_MODAL", value);
    },
    rmFileModal({ commit }, value) {
      commit("RM_FILE_MODAL", value);
    }
  },
  getters: {
    showSettings: state => state.settingsModal,
    newFileModal: state => state.newFile,
    removeFileModal: state => state.rmFile,
    moreDialog: state => state.moreDialog,
    filesDialog: state => state.filesDialog,
    helpModal: state => state.helpModal,
    offline: state => state.offline
  }
};
