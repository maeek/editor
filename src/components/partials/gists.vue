<template>
  <main class="editor" :key="gistDir" ref="main">
    <ul class="editorFields" v-if="!queryFailed && !queryActive">
      <gist
        v-for="gist in gists"
        :key="gist.id"
        :shwPublic="shwPublic"
        :starred="starred"
        :gist="gist"
        @starred="showStarNotf"
        @reload="refresh"
      ></gist>
    </ul>
    <page-changer
      @prev="Older"
      @next="Newer"
      :shwPublic="shwPublic"
      :pages="pages"
    ></page-changer>
    <no-gists v-if="gistsLength < 1 && !queryActive && !queryFailed"></no-gists>
    <failed-request></failed-request>
    <load-placeholder :count="10"></load-placeholder>
    <star-notf :list="starNotf"></star-notf>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import gist from "@/components/partials/gist.vue";
import noGists from "@/components/partials/no-gists.vue";
import pageChanger from "@/components/partials/page-changer.vue";
import starNotf from "@/components/partials/star-notf.vue";
import loadPlaceholder from "@/components/partials/load-placeholder.vue";
import failedRequest from "@/components/partials/failed-request.vue";
export default {
  name: "gists",
  components: {
    gist,
    noGists,
    pageChanger,
    starNotf,
    loadPlaceholder,
    failedRequest
  },
  props: ["user", "shwPublic", "starred"],
  data() {
    return {
      gist_dir: "https://api.github.com/gists/public",
      pages: 1,
      starNotf: []
    };
  },
  computed: {
    ...mapGetters([
      "authorized",
      "token",
      "tokenType",
      "alias",
      "gists",
      "gistsLength",
      "queryFailedObj",
      "queryFailed",
      "queryActive"
    ]),
    gistDir() {
      return this.gist_dir;
    }
  },
  methods: {
    ...mapActions(["updateGists"]),
    showStarNotf(data) {
      this.starNotf.push(data);
      setTimeout(() => {
        this.starNotf.shift();
      }, 3000);
    },
    apiLink() {
      let user = JSON.parse(window.localStorage.getItem("user"));
      let access = JSON.parse(window.localStorage.getItem("gh-token"));
      if (user && access) {
        this.$store.commit("TOKEN", {
          token_type: access.token_type,
          access_token: atob(access.access_token)
        });
        this.$store.commit("USER", user);
      }
      if (this.user) {
        this.gist_dir = `https://api.github.com/users/${
          this.$props.user
        }/gists`;
      } else {
        if (this.shwPublic) {
          this.gist_dir = `https://api.github.com/gists/public?page=${
            this.pages
          }&per_page=10`;
        }
        if (this.authorized && !this.shwPublic && !this.starred) {
          this.gist_dir = `https://api.github.com/users/${this.alias}/gists`;
        } else if (this.authorized && this.starred) {
          this.gist_dir = `https://api.github.com/gists/starred?page=${
            this.pages
          }`;
        } else {
          this.gist_dir = `https://api.github.com/gists/public?page=${
            this.pages
          }&per_page=10`;
        }
      }
      return this.gist_dir;
    },
    async Older() {
      this.pages++;
      let link = this.apiLink();
      this.updateGists(link);
    },
    async Newer() {
      if (this.pages > 1) {
        this.pages--;
      }
      let link = this.apiLink();
      this.updateGists(link);
    },
    refresh() {
      let link = this.apiLink();
      this.updateGists(link);
    }
  },
  created() {
    let link = this.apiLink();
    this.updateGists(link);
  }
};
</script>

<style scoped lang="scss">
.editor {
  flex: 1 1 auto;
  overflow: auto;
  @include rectangle(100%, 100%);
  @extend %flex-start;
  flex-direction: column;
  position: relative;
  .editorFields {
    flex-direction: column;
    background: $body--bg;
    @include rectangle(100%, auto);
    @extend %flex-start;
  }
  ul {
    padding: 0 1rem;
    list-style: none;
    width: 100%;
    transform: translate3d(0, 0, 0);
  }
}
</style>
