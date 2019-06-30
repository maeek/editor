<template>
  <div class="page-editor">
    <panelTop />
    <panelFiles ref="panelFiles" />
    <editor />
    <panelBottom />
    <transition name="scale" mode="out-in">
      <newFile v-if="newFileModal" />
    </transition>
    <transition name="from-up" mode="out-in">
      <settings v-if="showSettings" />
    </transition>
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
  </div>
</template>

<script>
import panelTop from "@/components/panel-top.vue";
import panelFiles from "@/components/panel-files.vue";
import editor from "@/components/editor.vue";
import panelBottom from "@/components/panel-bottom.vue";
import newFile from "@/components/modals/newfile.vue";
import settings from "@/components/modals/settings.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "app",
  page: {
    title: "Note"
  },
  components: {
    panelTop,
    panelFiles,
    editor,
    panelBottom,
    newFile,
    settings
  },
  computed: mapGetters([
    "newFileModal",
    "showSettings",
    "activeFile",
    "files",
    "filesDialog"
  ]),
  methods: {
    ...mapActions(["switchFile", "showFilesDialog"]),
    opnFile(name) {
      this.switchFile(name);
      this.showFilesDialog(false);
    }
  },
  mounted() {
    const $this = this;
    window.addEventListener("click", function() {
      $this.showFilesDialog(false);
    });
  }
};
</script>

<style scoped lang="scss">
.page-editor {
  flex-direction: column;
  @include rectangle(100%, 100%);
  @extend %flex-start;
}

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
</style>
