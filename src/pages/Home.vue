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
      <panel-left v-if="files.length > 0" ref="panelLeft"></panel-left>
      <div class="wrapper wrapper-column" ref="wrapper">
        <landing-greeter
          :class="{ authorized }"
          v-if="!authorized && !starred && !user && !shwPublic"
        ></landing-greeter>
        <user-panel v-if="user || (authorized && !shwPublic)" :user="user" />
        <div class="switch" v-if="authorized">
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
          ref="gists"
        />
      </div>
    </div>
    <actions-button v-if="authorized"></actions-button>
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
  props: ["user", "shwPublic", "starred"],
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
