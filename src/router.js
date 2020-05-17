import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

/* Pages */
const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "home-chunk" */ "@/pages/Home.vue")
  },
  {
    path: "/public/",
    component: () =>
      import(/* webpackChunkName: "home-chunk" */ "@/pages/Home.vue"),
    props: {
      shwPublic: true
    }
  },
  {
    path: "/starred/",
    component: () =>
      import(/* webpackChunkName: "home-chunk" */ "@/pages/Home.vue"),
    props: {
      starred: true
    }
  },
  {
    path: "/user/:user",
    component: () =>
      import(/* webpackChunkName: "home-chunk" */ "@/pages/Home.vue"),
    props: true
  },
  {
    path: "/edit/:id/:ver",
    component: () =>
      import(/* webpackChunkName: "editor-chunk" */ "@/pages/Editor.vue"),
    props: true
  },
  {
    path: "/edit/:id",
    component: () =>
      import(/* webpackChunkName: "editor-chunk" */ "@/pages/Editor.vue"),
    props: true
  },
  {
    path: "/edit/",
    component: () =>
      import(/* webpackChunkName: "editor-chunk" */ "@/pages/Editor.vue")
  },
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName: "home-chunk" */ "@/pages/Home.vue"),
    props: {
      not_found: true
    }
  }
];

const router = new Router({
  mode: "hash",
  routes: routes
});

router.beforeEach((to, from, next) => {
  store.dispatch("setMarkdown", false);
  if (
    store.getters.activeFile &&
    !store.getters.fileIsSaved() &&
    store.getters.showPromptLeave
  ) {
    store.dispatch("setNotSaved", to.fullPath);
  } else {
    store.dispatch("setNotSaved", false);
    next();
  }
});

export default router;
