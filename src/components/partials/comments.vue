<template>
  <div class="comments" v-if="comments" ref="coms">
    <h5 :class="{ scrolled: scroll }">Comments</h5>
    <div
      :class="{
        'close-revision': true,
        'material-icons': true,
        scrolled: scroll
      }"
      @click="closeRevs"
    >
      close
    </div>
    <ul
      :class="{ coms: true, scrolled: scroll }"
      v-if="commentsList.length > 0"
    >
      <comment
        @edit="editComment"
        @delete="removeComment"
        v-for="(com, n) in commentsList"
        :key="com.id + n + rand()"
        :com="com"
      />
    </ul>
    <div class="no-items" v-if="commentsList.length === 0">
      <span class="material-icons">comment</span>
      <span>Comments will be displayed here</span>
    </div>
    <new-comment ref="newComment" @create="createComment" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import showdown from "showdown";
import newComment from "@/components/partials/new-comment.vue";
import comment from "@/components/partials/comment.vue";

export default {
  name: "comments",
  computed: {
    ...mapGetters(["comments", "commentsList"])
  },
  data() {
    return {
      textComment: ""
    };
  },
  components: {
    newComment,
    comment
  },
  props: {
    scroll: Boolean
  },
  methods: {
    ...mapActions(["setRevisions", "setComments"]),
    rand() {
      return Math.random();
    },
    text(text) {
      const converter = new showdown.Converter(),
        html = converter.makeHtml(text);
      return html;
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
    updateComments() {
      this.fetchGist(
        `https://api.github.com/gists/${this.$route.params.id}/comments`
      ).then(data => {
        this.$store.commit("SET_COMMENTS", []);
        this.$store.commit("SET_COMMENTS", data);
      });
    },
    async createComment(text) {
      fetch(`https://api.github.com/gists/${this.$route.params.id}/comments`, {
        method: "POST",
        headers: await this.$store.dispatch("setHeaders"),
        body: JSON.stringify({
          body: text
        })
      })
        .then(res => res.json())
        .then(res => {
          if (!res.message) {
            this.$refs.newComment.textComment = "";
            this.updateComments();
          }
        });
    },
    async removeComment(id) {
      fetch(
        `https://api.github.com/gists/${this.$route.params.id}/comments/${id}`,
        {
          method: "DELETE",
          headers: await this.$store.dispatch("setHeaders")
        }
      ).then(res => {
        if (res.ok) {
          this.updateComments();
        }
      });
    },
    async editComment(obj) {
      fetch(
        `https://api.github.com/gists/${this.$route.params.id}/comments/${obj.id}`,
        {
          method: "PATCH",
          headers: await this.$store.dispatch("setHeaders"),
          body: JSON.stringify({
            body: obj.body
          })
        }
      ).then(res => {
        if (res.ok) {
          this.updateComments();
        }
      });
    },
    closeRevs() {
      this.setComments(false);
      this.scrolled = false;
    }
  }
};
</script>

<style scoped lang="scss">
.no-items {
  padding: 3.5rem 0;
  @extend %typo-koho;
  font-weight: 900;
  @extend %noselect;
  @extend %flex-center;
  width: 100%;
  background: #1d1d1d;
  margin-bottom: 2rem;
  flex-direction: column;
  color: lighten($comment--header, 40);
  span {
    background: #0e0e0e;
    padding: 0.3rem;
    border-radius: 4px;
  }
  .material-icons {
    color: $comment--header;
    font-size: 2rem;
    margin: 0.3rem 0;
  }
}
.comments {
  width: 100%;
  flex: 0 0 auto;
  background-color: #151515;
  // background-image: url("../../assets/dot.svg");
  background-position: center;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 0;
  .close-revision {
    top: 0.4rem;
    right: 0.5rem;
    position: absolute;
    color: #aaa;
    font-weight: 900;
    @extend %pointer;
    @extend %noselect;
    &.scrolled {
      position: fixed;
      z-index: 1;
      top: 4.9rem;
      right: 0.5rem;
    }
  }
  .coms {
    width: 100%;
    max-width: 1200px;
    color: #aaa;
    padding: 0.5rem;
    @extend %typo-koho;
    &.scrolled {
      padding-top: 2.5rem;
    }
  }
  h5 {
    width: 100%;
    padding: 0.5rem;
    margin: 0;
    color: #f0f0f0;
    background: #1d1d1d;
    text-align: center;
    @extend %typo-koho;
    @extend %noselect;
    font-weight: 400;
    border-bottom: 3px dotted #333;
    &.scrolled {
      position: fixed;
      z-index: 1;
      top: 4.6rem;
      left: 0;
    }
  }
}
</style>
