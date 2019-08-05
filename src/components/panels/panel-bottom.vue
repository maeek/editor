<template>
  <div class="bar bar--bottom">
    <div>
      <!-- <bottomButton :class="'interactive'">
        <a>
          <img
            class="svg_logo"
            dragabble="false"
            src="@/assets/icons/github_logo.svg"
          />
          Log out
        </a>
      </bottomButton> -->
      <bottomButton>
        <i
          class="material-icons"
          title="Waiting for save"
          v-if="displayNotSaved"
        >
          lens
        </i>
        {{ saveStatus }}
      </bottomButton>
    </div>
    <div>
      <div class="list">
        <ul></ul>
      </div>
      <bottomButton v-if="activeFile">
        {{ activeFileSize }}
      </bottomButton>
      <bottomButton>
        {{ fileMode ? fileMode : "" }}
      </bottomButton>
      <bottomButton>
        {{ lines }}
      </bottomButton>
      <bottomButton :class="'interactive'">
        <a href="https://github.com/maeek/editor">v{{ version }}</a>
      </bottomButton>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import bottomButton from "@/components/buttons/bottom-panel-element.vue";

export default {
  name: "barBottom",
  components: {
    bottomButton
  },
  computed: {
    ...mapGetters([
      "fileMode",
      "fileLines",
      "fileIsSaved",
      "fileLastSaved",
      "activeFile",
      "activeFileSize",
      "activeFileMediaSize",
      "version"
    ]),
    displayNotSaved() {
      return !this.fileIsSaved() || this.fileIsSaved() === null;
    },
    saveStatus: function() {
      if (this.fileIsSaved())
        return `All saved , last save - ${this.fileLastSaved()}`;
      else if (this.fileIsSaved() == null) return "No file";
      else return "Not saved , last save - " + this.fileLastSaved();
    },
    lines() {
      return `Ln: ${this.fileLines}`;
    }
  }
};
</script>

<style scoped lang="scss">
.bar--bottom {
  flex: 0 0 auto;
  background: $panel-bottom;
  @include rectangle(100%, 1.3rem);
  @extend %flex-btw-end;
  .list {
    display: none;
  }
  div {
    @include rectangle(auto, 100%);
    @extend %flex-start-center;
  }
}
</style>
