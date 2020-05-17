<template>
  <div class="more" v-if="moreDialog">
    <div class="moreBtn" @click="shareGist">Copy link to clipboard</div>
    <div class="moreBtn" v-if="markdown" @click="setMarkdown(!showMarkdown)">
      Preview
    </div>
    <div class="moreBtn" @click="goToProfile">Open profile</div>
    <div v-if="authorized" class="moreBtn">Fork gist</div>
    <div class="moreBtn" v-if="authorized" @click="editModal(activeFile)">
      Edit gist
    </div>
    <div class="moreBtn" @click="showRevs">Revisions</div>
    <div class="moreBtn" @click="showComs">Comments</div>
    <div class="moreBtn" @click="returnToPrevious">Load last save</div>
    <div class="moreBtn" @click.stop="showFilesDialog(!filesDialog)">
      Show opened
    </div>
    <div class="moreBtn" @click="removeAll">Close All without saving</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "moreDialog",
  computed: {
    ...mapGetters([
      "authorized",
      "fileData",
      "moreDialog",
      "filesDialog",
      "activeFile",
      "showRevisions",
      "comments",
      "showMarkdown"
    ]),
    markdown() {
      return (
        (this.$route.query.target &&
          (this.$route.query.target.toLowerCase().includes(".md") ||
            this.$route.query.target.toLowerCase().includes(".markdown"))) ||
        (this.activeFile &&
          (this.activeFile.toLowerCase().includes(".md") ||
            this.activeFile.toLowerCase().includes(".markdown")))
      );
    }
  },
  methods: {
    ...mapActions([
      "activeFileData",
      "showFilesDialog",
      "removeAll",
      "editModal",
      "setRevisions",
      "setComments",
      "setMarkdown"
    ]),
    scrollLeft() {
      this.$parent.$refs.panelFiles.scrollBy({
        top: 0,
        left: -100,
        behavior: "smooth"
      });
    },
    scrollRight() {
      this.$parent.$refs.panelFiles.scrollBy({
        top: 0,
        left: 100,
        behavior: "smooth"
      });
    },
    returnToPrevious() {
      this.activeFileData(this.fileData(), "saveFile");
    },
    shareGist() {
      window.navigator.permissions
        .query({ name: "clipboard-write" })
        .then(result => {
          if (result.state == "granted" || result.state == "prompt") {
            navigator.clipboard.writeText(window.location.href);
          }
        });
    },
    async fetchGist(link) {
      return fetch(link, {
        headers: await this.$store.dispatch("setHeaders"),
        cache: "no-cache"
      })
        .then(res => res.json())
        .then(ms => {
          if (!ms.message) {
            return ms;
          } else {
            return null;
          }
        });
    },
    showRevs() {
      if (!this.showRevisions) {
        this.fetchGist(
          `https://api.github.com/gists/${this.$route.params.id}/commits`
        ).then(data => {
          console.log(data);
          this.$store.commit("SET_REVS", data.reverse());
        });
      }
      // this.setComments(false);
      this.setRevisions(!this.showRevisions);
    },
    goToProfile() {
      let user = this.$store.getters.fileById(this.$route.params.id).owner;
      this.$router.push({
        path: `/user/${user}`
      });
    },
    showComs() {
      if (!this.comments) {
        this.fetchGist(
          `https://api.github.com/gists/${this.$route.params.id}/comments`
        ).then(data => {
          console.log(data);
          this.$store.commit("SET_COMMENTS", data);
        });
      }
      // this.setRevisions(false);
      this.setComments(!this.comments);
    }
  },
  mounted() {
    if (!this.showRevisions) {
      this.fetchGist(
        `https://api.github.com/gists/${this.$route.params.id}/commits`
      ).then(data => {
        this.$store.commit("SET_REVS", data.reverse());
      });
    }
  }
};
</script>

<style scoped lang="scss">
.more {
  position: fixed;
  top: calc(4.5rem + 2px);
  right: 0;
  background: #0e0e0e;
  z-index: 2;
  @include rectangle(auto, auto);
  .moreBtn {
    color: #a0a0a0;
    padding: 0.5rem 1rem;
    transition: color 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    @extend %typo-roboto;
    @extend %typo-small;
    @extend %pointer;
    @extend %noselect;
  }
  .moreBtn:last-child {
    margin-top: 1rem;
  }
  .moreBtn:hover {
    color: $panel-top--header;
  }
}
</style>
