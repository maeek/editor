<template>
  <div class="revisions">
    <h5 :class="{ scrolled: scroll }">Version history</h5>
    <div
      :class="{
        'close-revision': true,
        'material-icons': true,
        scrolled: scroll,
      }"
      @click="closeRevs"
    >
      close
    </div>
    <ul ref="revs" :class="{ revs: true, scrolled: scroll }">
      <li
        v-for="(rev, n) in showRevsList"
        :key="rev.version"
        :class="{
          loaded:
            loadedRevision == rev.version ||
            (!loadedRevision && n == showRevsList.length - 1),
        }"
      >
        <span>#{{ n + 1 }}</span>
        <span class="time">{{ rev.committed_at }}</span>
        <span class="name">{{ rev.version }}</span>
        <div class="change_status">
          <span class="add"
            >+
            {{
              rev.change_status.additions ? rev.change_status.additions : 0
            }}</span
          >
          <span>/</span>
          <span class="del"
            >-
            {{
              rev.change_status.deletions ? rev.change_status.deletions : 0
            }}</span
          >
        </div>
        <compact
          title="Load Revision"
          name="Load"
          @click.native="loadRev(rev.url, rev.version)"
        >
          build
        </compact>
      </li>
      <li class="load-more" v-if="showRevsList.length === 30">
        <compact title="Load" name="Load more" @click.native="loadMore">
          more_horiz
        </compact>
      </li>
    </ul>
    <!-- <div v-if="showRevsList.length > 0" class="end revsEnd"></div> -->
  </div>
</template>

<script>
import compact from "@/components/buttons/button-compact.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "revisions",
  data() {
    return {
      loadedRev: null,
      page: 1,
    };
  },
  props: {
    scroll: Boolean,
  },
  components: {
    compact,
  },
  computed: {
    ...mapGetters(["showRevisions", "showRevsList", "activeFile"]),
    loadedRevision() {
      return this.loadedRev;
    },
  },
  methods: {
    ...mapActions(["setRevisions", "setComments"]),
    async fetchGist(link) {
      return fetch(link, {
        headers: await this.$store.dispatch("setHeaders"),
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then((ms) => {
          if (!ms.message) {
            return ms;
          } else {
            return null;
          }
        });
    },
    loadMore() {
      this.$emit("next", ++this.page);
    },
    loadRev(link, ver) {
      this.fetchGist(link).then((data) => {
        this.loadedRev = ver;
        console.log(data);
        const file = data.files[this.activeFile]
          ? data.files[this.activeFile].content
          : data.files[Object.keys(data.files)[0]].content;

        this.$store.dispatch("activeFileData", file);
      });
    },
    closeRevs() {
      // this.setComments(false);
      this.setRevisions(false);
      this.scrolled = false;
      this.$emit("scrolled", false);
    },
    scrollHoriz(e) {
      e.preventDefault();
      const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      this.$refs.revs.scrollLeft -= delta * 35;
    },
  },
  mounted() {
    const $this = this;
    this.$refs.revs.addEventListener("mousewheel", $this.scrollHoriz, false);
    this.$refs.revs.addEventListener(
      "DOMMouseScroll",
      $this.scrollHoriz,
      false
    );
  },
};
</script>

<style scoped lang="scss">
.end {
  width: 12px;
  height: 12px;
  flex: 0 0 12px;
  border-radius: 50%;
  background: $comment--header;
  margin: 2rem auto;
  position: relative;
  &::after,
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    width: 6px;
    height: 6px;
    background: darken($comment--header, 10);
    border-radius: 50%;
    transform: translateY(-50%);
  }
  &::after {
    right: -10px;
  }
  &::before {
    left: -10px;
  }
}
.revisions {
  width: 100%;
  z-index: 1;
  flex: 0 0 auto;
  background-color: #151515;
  // background-image: url("../../assets/dot.svg");
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
    &.scrolled {
      position: fixed;
      top: 4.9rem;
      right: 0.5rem;
    }
  }
  .revs {
    width: 100%;
    height: auto;
    list-style: none;
    color: #ababab;
    padding: 0.5rem 1%;
    margin: 0;
    overflow: auto;
    @extend %typo-koho;
    @extend %typo-small;
    @extend %flex-start-center;
    flex-wrap: nowrap;
    &.scrolled {
      padding-top: 2.5rem;
    }
    li {
      .change_status {
        margin: 0.2rem 0;
        span {
          margin: 0 0.2rem;
        }
        .add {
          color: $panel-top--header;
        }
        .del {
          color: lighten(red, 25);
        }
      }
      @extend %flex-center;
      padding: 0.2rem;
      margin: 0.5rem 1rem;
      background: #333333;
      border-radius: 4px;
      position: relative;
      flex-direction: column;
      box-shadow: 0 1px 3px rgba(17, 17, 17, 0.664);
      border: 2px solid transparent;
      transition: 0.4s;
      &.load-more {
        padding: 0;
        button {
          flex-wrap: nowrap;
          white-space: nowrap;
        }
        &::before {
          content: initial;
        }
      }

      &::after {
        position: absolute;
        content: "";
        top: 50%;
        right: -37px;
        transform: translateY(-50%);
        width: 35px;
        height: 3px;
        background: $panel-top--header;
      }
      &::before {
        position: absolute;
        content: "";
        top: 50%;
        right: -23px;
        border-radius: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        background: #666;
        z-index: 1;
      }
      &:last-child:after {
        background: transparent;
      }
      &:last-child:before {
        content: initial;
      }
      &.loaded {
        border: 2px solid darken($panel-top--header, 15);
        span:nth-of-type(1) {
          color: $panel-top--header;
        }
      }
      span:nth-of-type(1) {
        color: $comment--header;
        min-width: 40px;
        align-self: flex-start;
      }
      .name {
        flex: 1 0 auto;
        margin: 0.5rem;
      }
      .time {
        margin: 0 1rem;
        text-decoration: solid $comment--header;
      }
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
    font-weight: 400;
    border-bottom: 3px dotted #333;
    &.scrolled {
      position: fixed;
      top: 4.6rem;
      left: 0;
    }
  }
}
::-webkit-scrollbar {
  display: block;
  width: 2px;
  height: 2px;
  padding: 5px;
  overflow: auto;
  background-color: #1d1d1d;
}

::-webkit-scrollbar-thumb {
  background: $panel-top--header;
  border: 2px solid #0000;
}
</style>
