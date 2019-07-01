import Vue from "vue";
import App from "./App.vue";
import store from "./store";
Vue.config.productionTip = true;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

window.addEventListener(
  "keydown",
  function(e) {
    if (e.ctrlKey && e.code == "KeyS") {
      e.preventDefault();
    } else if (e.ctrlKey && e.code == "KeyR") {
      e.preventDefault();
      store.dispatch("activeFileData", store.getters.fileData(), "saveFile");
    } else if (e.ctrlKey && e.code == "KeyO") {
      e.preventDefault();
      document.querySelector("input[type='file']").click();
    }

    if (e.metaKey && e.code == "Tab") {
      e.preventDefault();
      let i = store.getters.activeFileIndex;
      const filesLength = store.getters.files.length;
      if (i < filesLength - 1) i++;
      else if (i == filesLength - 1) i = 0;
      const fileName = store.getters.fileByIndex(i);
      store.dispatch("switchFile", fileName);
      store.dispatch("showFilesDialog", true);
      document
        .querySelector(".opened")
        .scrollTo(0, document.querySelector(".isActive").offsetTop);
    } else if (store.getters.filesDialog && e.code == "ArrowDown") {
      e.preventDefault();
      let i = store.getters.activeFileIndex;
      const filesLength = store.getters.files.length;
      if (i < filesLength - 1) i++;
      else if (i == filesLength - 1) i = 0;
      const fileName = store.getters.fileByIndex(i);
      store.dispatch("switchFile", fileName);
      document
        .querySelector(".opened")
        .scrollTo(0, document.querySelector(".isActive").offsetTop);
    } else if (store.getters.filesDialog && e.code == "ArrowUp") {
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
  function(e) {
    if (e.code == "MetaLeft") {
      store.dispatch("showFilesDialog", false);
    }
  },
  false
);

String.prototype.hashCode = function() {
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
