export default {
  state: {
    offline: false,
    newFile: false,
    moreDialog: false,
    filesDialog: false,
    editModal: false,
    rmFile: false,
    settingsModal: false,
    helpModal: false,
    revisions: false,
    loadedRevisions: [],
    comments: false,
    commentsList: [],
    markdown: false,
    notSaved: false
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
    },
    EDIT_MODAL(state, val) {
      state.editModal = val;
    },
    REVISIONS(state, val) {
      state.revisions = val;
    },
    SET_REVS(state, revs) {
      state.loadedRevisions = revs;
    },
    COMMENTS(state, val) {
      state.comments = val;
    },
    SET_COMMENTS(state, comments) {
      state.commentsList = comments;
    },
    MARKDOWN(state, val) {
      state.markdown = val;
    },
    FILE_NOT_SAVED(state, val) {
      state.notSaved = val;
    }
  },
  actions: {
    editModal({ commit }, val) {
      commit("EDIT_MODAL", val);
    },
    setNotSaved({ commit }, val) {
      commit("FILE_NOT_SAVED", val);
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
    newFileModal({ commit }, val) {
      commit("NEW_FILE_MODAL", val);
    },
    rmFileModal({ commit }, val) {
      commit("RM_FILE_MODAL", val);
    },
    setRevisions({ commit }, val) {
      if (!val) commit("SET_REVS", []);
      commit("REVISIONS", val);
    },
    setComments({ commit }, val) {
      if (!val) commit("SET_COMMENTS", []);
      commit("COMMENTS", val);
    },
    setMarkdown({ commit }, val) {
      commit("MARKDOWN", val);
    }
  },
  getters: {
    showSettings: state => state.settingsModal,
    newFileModal: state => state.newFile,
    removeFileModal: state => state.rmFile,
    moreDialog: state => state.moreDialog,
    filesDialog: state => state.filesDialog,
    helpModal: state => state.helpModal,
    offline: state => state.offline,
    editGist: state => state.editModal,
    showRevisions: state => state.revisions,
    showRevsList: state => state.loadedRevisions,
    comments: state => state.comments,
    commentsList: state => state.commentsList,
    showMarkdown: state => state.markdown,
    showNotSaved: state => state.notSaved
  }
};
