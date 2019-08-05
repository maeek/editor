import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Pages */
import Home from "@/pages/Home.vue";
import Editor from "@/pages/Editor.vue";

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/public/",
    component: Home,
    props: {
      shwPublic: true
    }
  },
  {
    path: "/starred/",
    component: Home,
    props: {
      starred: true
    }
  },
  {
    path: "/user/:user",
    component: Home,
    props: true
  },
  {
    path: "/edit/:id",
    component: Editor,
    props: true
  },
  {
    path: "/edit/",
    component: Editor
  }
];

export default new Router({
  mode: "hash",
  routes: routes
});
