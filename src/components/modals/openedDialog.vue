<template>
  <div class="opened" ref="opened" v-if="files.length > 0 && filesDialog">
    <button
      class="openedFile"
      v-for="(file, i) in files"
      :key="file.name"
      :class="file.name == activeFile ? 'isActive' : ''"
      @click.stop="opnFile(file.name)"
      :tabindex="i"
    >
      <div>{{ file.name }}</div>
      <div>{{ file.mode }}</div>
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "modal",
  computed: mapGetters(["activeFile", "files", "filesDialog"]),
  methods: {
    ...mapActions(["switchFile", "showFilesDialog"]),
    opnFile(name) {
      this.switchFile(name);
      this.showFilesDialog(false);
    },
  },
};
</script>

<style scoped lang="scss">
.opened {
  position: fixed;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  max-width: 98%;
  width: 400px;
  top: calc(4.5rem + 2px);
  height: auto;
  max-height: 80vh;
  overflow: auto;
  padding: 0.3rem;
  background: #1d1d1d;
  border: 1px dashed #3d3d3d;
  .openedFile {
    color: #aaa;
    border: 1px dashed transparent;
    padding: 0.3rem;
    width: 100%;
    background: transparent;
    @extend %typo-roboto;
    @extend %flex-start-end;
    @extend %typo-small;
    @extend %pointer;
    div {
      text-align: left;
    }
    div:last-child {
      @extend %typo-tiny;
      margin: 0 0.5rem;
      color: #888;
    }
  }
  .openedFile:hover,
  .openedFile:focus {
    border: 1px dashed #555;
  }
  .isActive {
    color: #fefefe;
    border: 1px dashed #555;
  }
}
@media screen and (max-width: 768px) {
  .opened {
    width: 100%;
    max-width: 100%;
    .openedFile {
      word-break: break-all;
      div:last-child {
        white-space: nowrap;
      }
    }
  }
}
</style>
