import Vue from "vue";
import App from "./App.vue";
import store from "./store";
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

window.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.keyCode == 83) {
    e.preventDefault();
  } else if (e.ctrlKey && e.keyCode == 80) {
    e.preventDefault();
  }
});
