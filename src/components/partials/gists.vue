<template>
  <main class="editor" :key="gistDir" ref="main">
    <h5
      v-if="
        !queryFailed &&
          !queryActive &&
          !authorized &&
          !shwPublic &&
          !user &&
          !starred
      "
    >
      Recent gists feed
    </h5>
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
      v-if="!queryFailed && !queryActive && shwPublic"
      @prev="Older"
      @next="Newer"
      :shwPublic="shwPublic"
      :pages="pages"
    ></page-changer>
    <button
      class="show-more"
      @click="$router.push({ path: '/public' })"
      v-if="
        !queryFailed &&
          !queryActive &&
          !shwPublic &&
          !user &&
          !starred &&
          !authorized
      "
    >
      <span class="wrapper">EXPLORE</span>
    </button>
    <no-gists v-if="gistsLength < 1 && !queryActive && !queryFailed"></no-gists>
    <failed-request></failed-request>
    <load-placeholder :count="count"></load-placeholder>
    <star-notf :list="starNotf"></star-notf>
    <foot v-if="!starred && !user" />
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import gist from "@/components/partials/gist.vue";
import foot from "@/components/partials/footer.vue";
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
    failedRequest,
    foot
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
    count() {
      // !queryFailed ? 12 : 3
      let cc = 5;
      if (this.shwPublic && !this.queryFailed) cc = 15;
      else if (this.queryFailed) cc = 3;
      else if (this.user) cc = 10;
      return cc;
    },
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
        }/gists?per_page=30`;
      } else {
        if (this.shwPublic) {
          this.gist_dir = `https://api.github.com/gists/public?page=${
            this.pages
          }&per_page=30`;
        }
        if (this.authorized && !this.shwPublic && !this.starred) {
          this.gist_dir = `https://api.github.com/users/${
            this.alias
          }/gists?per_page=30`;
        } else if (this.authorized && this.starred) {
          this.gist_dir = `https://api.github.com/gists/starred?page=${
            this.pages
          }`;
        } else {
          if (!this.shwPublic) {
            this.gist_dir = `https://api.github.com/gists/public?page=${
              this.pages
            }&per_page=5`;
          } else {
            this.gist_dir = `https://api.github.com/gists/public?page=${
              this.pages
            }&per_page=30`;
          }
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
  @include rectangle(100%, auto);
  @extend %flex-start;
  flex-direction: column;
  position: relative;
  .show-more {
    width: 100%;
    max-width: 1200px;
    background: transparent;
    .wrapper {
      background: $panel-bottom;
      display: block;
      width: 100%;
      color: $panel-top--header;
      padding: 1rem;
      border-radius: 8px;
      @extend %noselect;
      @extend %pointer;
      &:hover {
        color: $panel-bottom;
        background: $panel-top--header;
      }
    }
    margin: 0 auto 3rem;
    @extend %typo-koho;
    font-weight: 900;
    text-align: center;
    padding: 1rem;
    @extend %typo-medium;
  }
  h5 {
    width: 100%;
    max-width: 1200px;
    margin: 1rem auto;
    @extend %typo-koho;
    font-weight: 900;
    color: #ababab;
    padding: 0 1rem;
    @extend %typo-medium;
  }
  .editorFields {
    flex-direction: column;
    background: $body--bg;
    @include rectangle(100%, auto);
    @extend %flex-start;
  }
  ul {
    padding: 0 1rem;
    padding-bottom: 2rem;
    list-style: none;
    width: 100%;
    max-width: 1200px;
    margin: 1rem auto;
    transform: translate3d(0, 0, 0);
  }
}
</style>
