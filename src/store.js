import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import settings from "@/state/settings.js";
import files from "@/state/files.js";
import session from "@/state/session.js";
import modals from "@/state/modals.js";
export default new Vuex.Store({
  modules: {
    settings,
    files,
    session,
    modals
  }
});
