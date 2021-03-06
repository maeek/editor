<template>
  <div
    :class="{ 'my-account': true, wide }"
    v-if="!queryFailed && !queryActive"
  >
    <div class="wrapper">
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
        v-if="
          (!$route.params.user && !$route.params.id) ||
          ($route.params.user && $route.params.user === alias) ||
          alias === user
        "
      >
        <span class="stats">
          <i class="material-icons">location_on</i>Location: {{ location }}
        </span>
        <span class="stats">
          <i class="material-icons">public</i>Public gists:
          {{ userPublicGists }}
        </span>
        <span class="stats">
          <i class="material-icons">public</i>Public repos:
          {{ userPublicRepos }}
        </span>
        <span class="stats">
          <i class="material-icons">person</i>Followers: {{ followers }}
        </span>
        <span class="stats">
          <i class="material-icons">people</i>Following: {{ following }}
        </span>
      </div>
      <div class="more" v-else>
        <a
          class="stats stats-button"
          target="_blank"
          :href="`https://github.com/${aliasName}`"
        >
          <i class="material-icons">exit_to_app</i>Open on Github
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "user",
  props: ["user", "wide"],
  data() {
    return {
      image_url: "",
      user_name: "",
      alias_name: "",
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
      "userPublicRepos",
      "queryFailed",
      "queryActive",
    ]),
    image() {
      return this.image_url;
    },
    username() {
      return this.user_name;
    },
    aliasName() {
      return this.user ? this.user : this.alias;
    },
  },
  methods: {
    ...mapActions(["toggleSettings", "logout"]),
    async getUser(user) {
      const res = await fetch(`https://api.github.com/users/${user}`);
      return await res.json();
    },
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
  },
};
</script>

<style scoped lang="scss">
.my-account {
  background: #0e0e0e;
  width: 100%;
  flex: 0 0 auto;
  @extend %typo-koho;
  color: #ababab;
  &.wide {
    // background: #151515;
    .wrapper {
      padding: 1rem 0;
      max-width: 95%;
      img {
        margin: 0;
      }
    }
  }
  .wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 1rem auto;
    @extend %flex-start;
    padding: 1rem 0.7rem;
    flex-wrap: wrap;
  }
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
        text-decoration: none;
        @extend %pointer;
        i {
          color: $comment--header;
        }
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

    h5 {
      font-size: 1.5rem;
    }
  }
}
</style>
