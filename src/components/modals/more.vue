<template>
  <div class="more" v-if="moreDialog">
    <div class="moreBtn" @click="returnToPrevious">Load last save</div>
    <div class="moreBtn" @click.stop="showFilesDialog(!filesDialog)">
      Show opened
    </div>
    <div class="moreBtn" @click="removeAll">Close all</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "moreDialog",
  computed: {
    ...mapGetters(["fileData", "moreDialog", "filesDialog"])
  },
  methods: {
    ...mapActions(["activeFileData", "showFilesDialog", "removeAll"]),
    scrollLeft() {
      this.$parent.$refs.panelFiles.scrollBy({
        top: 0,
        left: -100,
        behavior: "smooth"
      });
    },
    scrollRight() {
      this.$parent.$refs.panelFiles.scrollBy({
        top: 0,
        left: 100,
        behavior: "smooth"
      });
    },
    returnToPrevious() {
      this.activeFileData(this.fileData(), "saveFile");
    }
  }
};
</script>

<style scoped lang="scss">
.more {
  position: fixed;
  top: calc(4.5rem + 2px);
  right: 0;
  background: #0e0e0e;
  z-index: 2;
  @include rectangle(auto, auto);
  .moreBtn {
    color: #a0a0a0;
    padding: 0.5rem 1rem;
    transition: color 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    @extend %typo-roboto;
    @extend %typo-small;
    @extend %pointer;
    @extend %noselect;
  }
  .moreBtn:last-child {
    margin-top: 1rem;
  }
  .moreBtn:hover {
    color: $panel-top--header;
  }
}
</style>
