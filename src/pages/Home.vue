<template>
  <div class="page-editor" :key="key">
    <panel-top>
      <login-compact
        :title="'Log in'"
        name="Log in with Github"
        v-if="!authorized"
        :hide="false"
      />
      <compact
        :hide="false"
        :title="'Log out'"
        name="Log out"
        @click.native="logout"
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
      <panel-left v-if="authorized && files.length > 0"></panel-left>
      <div class="wrapper wrapper-column" ref="wrapper">
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
        </div>
        <gists :user="user" :starred="starred" :shwPublic="shwPublic" />
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
    ...mapActions(["toggleSettings", "logout"])
  },
  mounted() {
    // const $this = this;
    // $this.$refs.wrapper.addEventListener("scroll", function() {
    //   console.log($this.$refs.wrapper.scrollTop ,$this.$refs.wrapper.clientHeight);
    //   if($this.$refs.wrapper.scrollHeight - $this.$refs.wrapper.scrollTop <= $this.$refs.wrapper.clientHeight + 50){
    //     console.log("YEEEE");
    //   }
    // });
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
    overflow: auto;
    &-column {
      padding-top: 2rem;
      flex-direction: column;
    }
    .panelLeft {
      width: 300px;
      height: 100%;
      background: $panel-files-bg;
      @extend %flex-start;
      @extend %typo-koho;
      flex-direction: column;
      .file {
        min-height: 2rem;
        height: auto;
        padding: 0.5rem;
        width: 100%;
        border: 0;
      }
      .noActive {
        color: darken($comment--header, 5);
        margin: 1rem auto;
      }
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
    .my-account {
      background: #0e0e0e;
      width: 100%;
      padding: 1rem 0.7rem;
      @extend %typo-koho;
      @extend %flex-start;
      color: #ababab;
      img {
        width: 45px;
      }
      h5 {
        color: $lines-focused;
        margin: 0 1rem;
        @extend %typo-header;
      }
      span {
        margin: 0 1rem;
      }
    }
  }
}
.panelLeft::-webkit-scrollbar {
  display: block;
  width: 2px;
  height: 2px;
  padding: 5px;
  overflow: auto;
  background-color: #1d1d1d;
}

.panelLeft::-webkit-scrollbar-thumb {
  background: $panel-top--header;
  border: 2px solid #0000;
}
@media screen and (max-width: 768px) {
  .page-editor {
    .wrapper {
      padding-top: 2.2rem;
      &-column {
        padding-top: 0;
      }
      flex-direction: column;
    }
  }
}
</style>
