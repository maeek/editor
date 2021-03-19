<template>
  <li :key="gist.id">
    <div class="wrapper">
      <div class="user">
        <img
          v-if="(gist.owner.avatar_url && gist.owner.login != alias) || starred"
          :src="gist.owner.avatar_url"
          @click="route"
        />
        <div class="path">
          <h5>
            <span class="username" @click="route">{{ gist.owner.login }}</span>
            /
            <span class="filename" @click="gistToFile(gist)">{{
              filename || "&lt; NO FILES &gt;"
            }}</span>
          </h5>
          <span class="description">{{ mimeType }}</span>
          <span class="description">{{ gist.description }}</span>
        </div>
      </div>
      <div class="wrapper options">
        <span class="stats pb" title="Public gist" v-if="gist.public"
          ><i class="material-icons">public</i></span
        >
        <span class="stats" v-if="Object.keys(gist.files).length > 0"
          ><i class="material-icons">description</i>
          {{ Object.keys(gist.files).length }}</span
        >
        <span class="stats"
          ><i class="material-icons">comment</i> {{ gist.comments }}</span
        >

        <span
          class="stats stats-button"
          v-if="authorized && !starred && !hasStar"
          @click="setStarClick(gist.id)"
          ><i class="material-icons">star</i>Star</span
        >
        <span
          class="stats stats-button"
          :title="`Unstar ${gist.id}`"
          v-if="authorized && !starred && hasStar"
          @click="unStarClick(gist.id)"
          ><i class="material-icons starred">star</i>Unstar</span
        >
        <span
          class="stats stats-button"
          :title="`Star ${gist.id}`"
          v-if="authorized && starred"
          @click="unStarClick(gist.id)"
          ><i class="material-icons starred">star</i>Unstar</span
        >
        <span
          class="stats stats-button"
          :title="`Delete ${gist.id}`"
          @click="rmFileModal({ rid: gist.id, files: gist.files })"
          v-if="
            (authorized && !$route.params.user && !shwPublic) ||
            (authorized && $route.params.user == alias)
          "
          ><i class="material-icons trash">delete</i>Delete</span
        >
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "gist",
  props: {
    gist: Object,
    shwPublic: Boolean,
    starred: Boolean,
  },
  data() {
    return {
      file: "",
      star: false,
    };
  },
  computed: {
    ...mapGetters(["alias", "authorized", "token", "tokenType"]),
    filename() {
      return this.file;
    },
    mimeType() {
      return this.mime;
    },
    hasStar() {
      return this.star;
    },
  },
  methods: {
    ...mapActions([
      "addFile",
      "rmFileModal",
      "updateGists",
      "setHeaders",
      "setStar",
      "unStar",
    ]),
    route() {
      if (this.gist.owner.login != this.alias) {
        this.$router.push({ path: `/user/${this.gist.owner.login}` });
      }
    },
    gistToFile(gist) {
      this.$router.push({ path: `/edit/${gist.id}?target=${this.filename}` });
    },
    async setStarClick(id) {
      this.setStar(id)
        .then((res) => {
          if (res.status === 204) {
            this.star = true;
            this.$emit("starred", { status: true, id: id });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async unStarClick(id) {
      this.unStar(id)
        .then((res) => {
          if (res.status === 204) {
            this.star = false;
            this.$emit("starred", { status: false, id: id });
            this.updateGists(
              this.starred
                ? `https://api.github.com/gists/starred`
                : `https://api.github.com/gists`
            );
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    const $this = this;
    (async function () {
      let raw_link = Object.keys($this.gist.files)[0];
      $this.file = raw_link;
      $this.mime = $this.gist.files[raw_link].type;
    })();
  },
  beforeDestroy() {
    this.$el && this.$el.remove();
  },
};
</script>

<style scoped lang="scss">
li {
  margin: 0.7rem auto;
  width: 100%;
  padding: 0.3rem 0.5rem;
  color: #f0f0f0;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgb(87, 87, 87);
  a {
    color: inherit;
    text-decoration: none;
  }
  @extend %typo-koho;
  .actions {
    padding: 0.3rem 0;
    @extend %flex-end;
  }
  .wrapper {
    @extend %flex-btw-center;
    flex-wrap: wrap;
    .stats {
      &.pb {
        color: $comment--header;
      }
      margin: 0.3rem 0 0 1rem;
      font-weight: 900;
      color: $bottom--button-color;
      flex-wrap: nowrap;
      word-break: keep-all;
      flex: 0 0 auto;
      @extend %typo-small;
      @extend %flex-center;
      @extend %noselect;
      &-button {
        border-radius: 5px;
        border: 2px solid #2d2d2d;
        padding: 0.1rem 0.3rem;
        @extend %pointer;
      }

      i {
        margin: 0 0.2rem 0 0;
        &.trash {
          color: lighten(red, 25);
        }
        &.starred {
          color: $comment--header;
        }
      }
    }
    img {
      flex: 0 0 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
      border: 1px solid #2d2d2d;
    }
    .user {
      @extend %flex-start;
      .path {
        h5 {
          margin: 0 0.5rem;
          font-size: 1.2rem;
          font-weight: 400;
          line-break: auto;
          span {
            color: $panel-top--header;
            @extend %pointer;
          }
          .filename {
            font-weight: 700;
          }
        }
        .description {
          margin: 0 0.5rem;
          font-size: 0.8rem;
          color: $bottom--button-color;
        }
      }
    }
  }
  .vue-codemirror {
    border-radius: 4px;
    overflow: hidden;
    margin-top: 1rem;
    max-height: 200px;
    .CodeMirror {
      cursor: pointer !important;
    }
  }
}
@media screen and (max-width: 768px) {
  li > .wrapper {
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: nowrap;
    .stats {
      margin: 0.5rem 0rem 0 0.5rem;
    }
    .user .path h5 .filename,
    .user .path .description {
      word-break: break-all;
    }
  }
}
</style>
