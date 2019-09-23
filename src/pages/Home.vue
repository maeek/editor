<template>
  <div class="page-editor" :key="key">
    <panel-top>
      <login-compact
        :title="'Log in'"
        name="Log in with Github"
        v-if="!authorized"
        class="login"
        :hide="false"
      />
      <compact
        :hide="false"
        :title="'Log out'"
        name="Log out"
        @click.native="logout"
        class="login"
        v-else
      >
        lock
      </compact>
      <compact
        :title="'Open settings'"
        name="Settings"
        @click.native="toggleSettings(true)"
      >
        settings
      </compact>
    </panel-top>
    <div class="wrapper">
      <panel-left
        v-if="files.length > 0 && !not_found"
        ref="panelLeft"
      ></panel-left>
      <div class="wrapper wrapper-column" ref="wrapper">
        <landing-greeter
          :class="{ authorized }"
          v-if="!authorized && !starred && !user && !shwPublic && !not_found"
        ></landing-greeter>
        <user-panel
          v-if="
            (user && !not_found) || (authorized && !shwPublic && !not_found)
          "
          :user="user"
        />
        <div class="switch" v-if="authorized && !not_found">
          <compact
            :class="{ active: !shwPublic && !user && !starred }"
            @click.native="$router.push({ path: '/' })"
            :title="'My Gists'"
            name="My Gists"
            :hide="false"
          >
            code
          </compact>
          <compact
            @click.native="$router.push('/public/')"
            :title="'Public Gists'"
            name="Public Gists"
            :class="{ active: shwPublic }"
            :hide="false"
          >
            all_inclusive
          </compact>
          <compact
            :title="'Starred'"
            :class="{ active: starred }"
            :hide="false"
            @click.native="
              $router.push({ path: '/starred/', props: { starred: true } })
            "
            name="Starred Gists"
          >
            star
          </compact>
          <compact
            :title="'Add new gist'"
            name="New gist"
            @click.native="newFileModal(true)"
          >
            add
          </compact>
        </div>
        <gists
          :user="user"
          :starred="starred"
          :shwPublic="shwPublic"
          :not_found="not_found"
          v-if="!not_found"
          ref="gists"
        />
        <div v-if="not_found" class="fetchError">
          <pre>
                _____
             ,-"     "-.
            / o       o \
           /   \     /   \
          /     )-"-(     \
         /     ( 6 6 )     \
        /       \ " /       \
       /         )=(         \
      /   o   .--"-"--.   o   \
     /    I  /  -   -  \  I    \
 .--(    (_}y/\       /\y{_)    )--.
(    ".___l\/__\_____/__\/l___,"    )
 \                                 /
  "-._      o O o O o O o      _,-"
      `--Y--.___________.--Y--'
         |==.___________.==| 
         `==.___________.==' 
            
            /           \
           /             \
          </pre>
          <span class="code">404</span>
          <span class="text">Resource not found</span>
        </div>
      </div>
    </div>
    <actions-button v-if="authorized && !not_found"></actions-button>
  </div>
</template>

<script>
import panelTop from "@/components/panels/panel-top.vue";
import panelLeft from "@/components/panels/panel-left.vue";
import compact from "@/components/buttons/button-compact.vue";
import loginCompact from "@/components/buttons/login-button.vue";
import gists from "@/components/partials/gists.vue";
import landingGreeter from "@/components/partials/landing-greeter.vue";
import userPanel from "@/components/panels/user.vue";
import actionsButton from "@/components/buttons/actions.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    panelTop,
    panelLeft,
    loginCompact,
    compact,
    gists,
    userPanel,
    landingGreeter,
    actionsButton
  },
  data() {
    return {
      groups: []
    };
  },
  props: ["user", "shwPublic", "starred", "not_found"],
  computed: {
    ...mapGetters(["authorized", "avatar", "alias", "name", "files"]),
    key() {
      return `${this.user}+${this.authorized ? "ac" : "nac"}+${
        this.shwPublic ? "yee" : "ney"
      } ${this.starred ? "yee" : "ney"}`;
    }
  },
  methods: {
    ...mapActions(["toggleSettings", "logout", "newFileModal"]),
    resize() {
      if (this.authorized) {
        if (document.body.clientWidth <= 768 && this.$refs.panelLeft) {
          this.$refs.panelLeft.$el.style["padding-top"] = "2.1rem";
          this.$refs.wrapper.style["padding-top"] = "0";
        } else {
          this.$refs.wrapper.style["padding-top"] = "2rem";
        }
      }
    }
  },
  updated() {
    this.resize();
  },
  mounted() {
    const $this = this;
    $this.resize();
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  }
};
</script>

<style scoped lang="scss">
.page-editor {
  flex-direction: column;
  @include rectangle(100%, 100%);
  @extend %flex-start;
  .wrapper {
    @extend %flex-start;
    @include rectangle(100%, 100%);
    overflow: hidden;
    &-column {
      overflow: auto;
      @include rectangle(100%, 100%);
      flex-direction: column;
    }
    .switch {
      width: 100%;
      position: fixed;
      top: 2.5rem;
      left: 0;
      z-index: 7;
      background: $option--bg;
      padding: 0.3rem;
      @extend %flex-start;
    }
  }
}
.fetchError {
  width: 100%;
  min-height: 60%;
  color: $comment--header;
  pre {
    font-family: monospace;
    white-space: pre-wrap;
    font-size: 1rem;
    font-weight: 900;
  }
  span {
    font-weight: 900;
  }
  .code {
    font-size: 2rem;
  }
  .text {
    margin: 0.5rem 0;
    width: 400px;
    max-width: 95%;
    text-align: center;
    color: $compact--button-color;
  }
  @extend %flex-center;
  @extend %typo-koho;
  flex-direction: column;
}
@media screen and (max-width: 768px) {
  .page-editor {
    .wrapper {
      &-column {
        padding-top: 0;
      }
      flex-direction: column;
    }
  }
}
</style>
