<template>
  <div id="app">
    <router-view :focus="focus" :key="key" />
    <modals />
  </div>
</template>

<script>
import modals from "@/components/modals.vue";
import { mapGetters } from "vuex";
export default {
  name: "app",
  components: {
    modals
  },
  computed: {
    ...mapGetters(["authorized"]),
    key() {
      return `${this.user}+${this.authorized ? "ac" : "nac"} ${
        this.id ? this.id : "nid"
      } ${this.$route.query.target || "notarget"}`;
    }
  },
  props: ["user", "focus", "id"],
  created() {
    let user = JSON.parse(window.localStorage.getItem("user"));
    let access = JSON.parse(window.localStorage.getItem("gh-token"));
    if (user && access) {
      this.$store.commit("TOKEN", {
        token_type: access.token_type,
        access_token: atob(access.access_token)
      });
      this.$store.commit("USER", user);
    }
  },
  beforeRouteLeave(next) {
    this.$el.remove();
    this.$store.dispatch("setComments", false);
    this.$store.commit("SET_REVS", []);
    this.$store.dispatch("setMarkdown", false);
    next();
  }
};
</script>

<style lang="scss">
@import "@/design/index.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
