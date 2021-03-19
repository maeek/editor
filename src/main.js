import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import VueShowdown, { showdown } from "vue-showdown";
// import "./service-worker";
import "oauthio-web";

Vue.config.productionTip = true;

Vue.use(VueShowdown, {
  options: {
    emoji: true,
    tables: true,
  },
});
showdown.setFlavor("github");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.addEventListener(
  "keydown",
  function (e) {
    if (e.ctrlKey && e.code == "KeyS") {
      e.preventDefault();
    } else if (e.ctrlKey && e.code == "KeyR") {
      e.preventDefault();
      store.dispatch("activeFileData", store.getters.fileData());
      store.dispatch("saveFile");
    } else if (e.ctrlKey && e.code == "KeyO") {
      e.preventDefault();
      document.querySelector("input[type='file']").click();
    }

    if (e.ctrlKey && e.code == "Backquote") {
      e.preventDefault();
      store.dispatch("showFilesDialog", true);
      let i = store.getters.activeFileIndex;
      const filesLength = store.getters.files.length;
      if (e.shiftKey) {
        if (i > 0) i--;
        else if (i == 0) i = filesLength - 1;
      } else {
        if (i < filesLength - 1) i++;
        else if (i == filesLength - 1) i = 0;
      }
      const fileName = store.getters.fileByIndex(i);
      store.dispatch("switchFile", fileName.name);
      router.push({
        path: `/edit/${fileName.gistId}`,
        query: {
          target: fileName.name,
        },
      });
      document
        .querySelector(".opened")
        .scrollTo(0, document.querySelector(".isActive").offsetTop);
    }

    if (store.getters.filesDialog && e.code == "ArrowDown") {
      e.preventDefault();
      let i = store.getters.activeFileIndex;
      const filesLength = store.getters.files.length;
      if (i < filesLength - 1) i++;
      else if (i == filesLength - 1) i = 0;
      const fileName = store.getters.fileByIndex(i);
      store.dispatch("switchFile", fileName);
      document
        .querySelector(".opened")
        .scrollTo(0, document.querySelector(".isActive").offsetTop || 0);
    }

    if (store.getters.filesDialog && e.code == "ArrowUp") {
      e.preventDefault();
      let i = store.getters.activeFileIndex;
      const filesLength = store.getters.files.length;
      if (i > 0) i--;
      else if (i == 0) i = filesLength - 1;
      const fileName = store.getters.fileByIndex(i);
      store.dispatch("switchFile", fileName);
      document
        .querySelector(".opened")
        .scrollTo(0, document.querySelector(".isActive").offsetTop);
    }
  },
  false
);

window.addEventListener(
  "keyup",
  function (e) {
    if (e.code == "ControlLeft") {
      store.dispatch("showFilesDialog", false);
    }
  },
  false
);

String.prototype.hashCode = function () {
  var hash = 0;
  if (this.length == 0) {
    return hash;
  }
  for (var i = 0; i < this.length; i++) {
    var char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};
