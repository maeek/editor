<template>
  <div class="bar bar--bottom">
    <div>
      <bottomButton>
        <i class="material-icons">
          {{ offline ? "signal_wifi_off" : "signal_wifi_4_bar" }}
        </i>
        Connected
      </bottomButton>
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
      <bottomButton v-if="activeFileSize">
        {{ activeFileSize }}
      </bottomButton>
      <bottomButton>
        {{ fileMode }}
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
import { mapGetters, mapActions } from "vuex";
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
      "offline",
      "version"
    ]),
    displayNotSaved() {
      return (
        !this.fileIsSaved() &&
        this.fileIsSaved() != null &&
        !this.fileMode.includes("image/")
      );
    },
    saveStatus: function() {
      if (this.fileIsSaved())
        return `All saved , last save - ${this.fileLastSaved()}`;
      else if (this.fileIsSaved() == null) return "No file";
      else if (this.fileMode.includes("image/")) return "Save not possible";
      else return "Not saved , last save - " + this.fileLastSaved();
    },
    lines() {
      return this.fileMode.includes("image/")
        ? this.activeFileMediaSize
        : `Ln: ${this.fileLines}`;
    }
  },
  methods: mapActions(["changeOffline"]),
  mounted() {
    const $this = this;
    window.addEventListener("offline", function(e) {
      console.log("You're offline", e);
      if (e.type == "offline") $this.changeOffline("offline", true);
      else if (e.type == "online") $this.changeOffline("offline", false);
    });

    window.addEventListener("online", function(e) {
      console.log("You're online", e);
      if (e.type == "offline") $this.changeOffline("offline", true);
      else if (e.type == "online") $this.changeOffline("offline", false);
    });
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
