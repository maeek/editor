import Vue from "vue";
import Router from "vue-router";

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

export default new Router({
  mode: "hash",
  routes: routes
});
