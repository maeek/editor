<template>
  <div class="my-account">
    <img :src="image" />
    <div class="info">
      <h5>
        <span v-if="!user">Welcome,</span
        ><span class="name">{{ aliasName }}</span>
      </h5>
      <span>{{ username }}</span>
    </div>
    <div class="spacer"></div>
    <div
      class="more"
      v-if="!$route.params.user || $route.params.user === alias"
    >
      <span class="stats">
        <i class="material-icons">location_on</i>Location: {{ location }}
      </span>
      <span class="stats">
        <i class="material-icons">public</i>Public gists: {{ userPublicGists }}
      </span>
      <span class="stats">
        <i class="material-icons">public</i>Public repos: {{ userPublicRepos }}
      </span>
      <span class="stats">
        <i class="material-icons">person</i>Followers: {{ followers }}
      </span>
      <span class="stats">
        <i class="material-icons">people</i>Following: {{ following }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "user",
  props: ["user"],
  data() {
    return {
      image_url: "",
      user_name: "",
      alias_name: ""
    };
  },
  computed: {
    ...mapGetters([
      "authorized",
      "avatar",
      "alias",
      "location",
      "followers",
      "following",
      "name",
      "userPublicGists",
      "userPublicRepos"
    ]),
    image() {
      return this.image_url;
    },
    username() {
      return this.user_name;
    },
    aliasName() {
      return this.user ? this.user : this.alias;
    }
  },
  methods: {
    ...mapActions(["toggleSettings", "logout"]),
    async getUser(user) {
      const res = await fetch(`https://api.github.com/users/${user}`);
      return await res.json();
    }
  },
  async created() {
    let data = {};
    if (this.user && this.user != this.alias) {
      data = await this.getUser(this.user);
      this.image_url = data.avatar_url;
      this.user_name = data.name;
    } else {
      this.image_url = this.avatar;
      this.user_name = this.name;
      this.alias_name = this.alias;
    }
  }
};
</script>

<style scoped lang="scss">
.my-account {
  background: #0e0e0e;
  width: 100%;
  padding: 1rem 0.7rem;
  @extend %typo-koho;
  @extend %flex-start;
  flex-wrap: wrap;
  color: #ababab;
  img {
    margin-left: 0.6rem;
    width: 64px;
  }
  h5 {
    color: $lines-focused;
    margin: 0 1rem;
    @extend %typo-big;
    span {
      margin: 0 0.3rem 0 0;
    }
  }
  span {
    margin: 0 1rem;
    &.name {
      color: $comment--header;
    }
  }
  .spacer {
    flex: 1 1 auto;
  }
  .more {
    @extend %flex-end;
    flex-wrap: wrap;
    width: 380px;
    flex-direction: row;
    max-height: 2.5rem;
    .stats {
      margin: 0.3rem 0 0 1rem;
      font-weight: 900;
      color: $lines-color;
      flex-wrap: nowrap;
      word-break: keep-all;
      flex: 0 0 auto;
      @extend %typo-small;
      @extend %flex-center;
      @extend %noselect;
      &-button {
        border-radius: 5px;
        border: 2px solid $compact--button-bg;
        padding: 0.1rem 0.3rem;
        @extend %pointer;
        &:hover {
          background: #2d2d2d;
        }
      }
      i {
        margin: 0 0.2rem 0 0;
        &.starred {
          color: $comment--header;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .my-account {
    .more {
      padding: 0.5rem 0;
      justify-content: flex-start;
      align-items: flex-start;
      align-content: flex-start;
    }
  }
}
</style>
