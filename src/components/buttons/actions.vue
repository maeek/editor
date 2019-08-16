<template>
  <div class="actions" @click.stop>
    <transition name="width-to-left">
      <div class="container" v-if="showContainer">
        <compact
          :hide="false"
          :title="'Upload files'"
          name="Upload files"
          @click.native="openFile() && closeContainer(false)"
        >
          move_to_inbox
        </compact>
        <compact
          :hide="false"
          :title="'New gist'"
          name="Create new gist"
          @click.native="newFileModal(true) && closeContainer(false)"
        >
          add_box
        </compact>
        <compact
          :hide="false"
          title="Keybinds"
          name="Show keybinds"
          @click.native="showHelpModal(true) && closeContainer(false)"
        >
          keyboard
        </compact>
        <compact
          :hide="false"
          title="Github page"
          name="Show on github"
          @click.native="
            goTo(
              `https://github.com/${$route.params.user || 'maeek'}` ||
                profile_link ||
                'https://github.com/maeek/editor'
            )
          "
        >
          <img
            class="svg_logo"
            dragabble="false"
            src="@/assets/icons/github_logo.svg"
          />
        </compact>
      </div>
    </transition>
    <i
      class="material-icons"
      :class="{ showContainer }"
      @click="showContainer = !showContainer"
      >more_horiz</i
    >
  </div>
</template>

<script>
import compact from "@/components/buttons/button-compact.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "actions",
  components: {
    compact
  },
  data() {
    return {
      showContainer: false
    };
  },
  computed: {
    ...mapGetters(["profile_link"])
  },
  methods: {
    ...mapActions(["showHelpModal", "newFileModal"]),
    closeContainer(val) {
      this.showContainer = val;
    },
    login() {
      this.authorize();
    },
    goTo(link) {
      window.open(link, "_blank");
    },
    openFile() {
      this.$router.push({ path: "/edit/" });
    },
    hideButtons() {
      this.showContainer = false;
    }
  },
  mounted() {
    document.addEventListener("click", this.hideButtons);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideButtons);
  }
};
</script>

<style scoped lang="scss">
.actions {
  position: fixed;
  bottom: 1.5rem;
  right: 2rem;
  z-index: 8;
  @extend %flex-end;
  @extend %noselect;
  flex-direction: column;
  i {
    width: 3rem;
    height: 3rem;
    background: #151515;
    border: 3px solid #2d2d2d;
    border-radius: 50%;
    border-bottom-right-radius: 0;
    color: $panel-top--header;
    @extend %typo-big;
    @extend %pointer;
    @extend %flex-center;
    transition: 0.2s;
    &.showContainer {
      transform: rotate(180deg);
    }
  }
  .container {
    background: $panel-bottom;
    border: 2px solid #2d2d2d;
    border-radius: 5px;
    margin: 0.5rem 1.5rem;
    padding: 0.5rem 0.3rem;
    position: relative;
    @extend %flex-start;
    flex-direction: column;
    button {
      white-space: nowrap;
      justify-content: flex-start;
      width: calc(100% - 0.2rem);
      margin: 0.1rem;
      .svg_logo {
        // transform: scale(0.65);
        width: 0.8rem;
      }
    }
  }
}
</style>
