<template>
  <div
    class="bar bar--files"
    v-if="files.length > 0"
    @dragenter="dragEnt"
    @dragleave="dragLv"
    @dragend="dragEn"
    @dragover="dragOvr"
    @drop="drop"
    ref="panelFiles"
  >
    <div class="scroller">
      <i class="material-icons" @click="scrollLeft">
        keyboard_arrow_left
      </i>
      <i class="material-icons" @click="scrollRight">
        keyboard_arrow_right
      </i>
      <i class="material-icons showMore" @click.stop="showMore(!moreDialog)">
        more_horiz
      </i>
    </div>
    <div class="more" v-if="moreDialog">
      <div class="moreBtn" @click="returnToPrevious">Load last save</div>
      <div class="moreBtn" @click.stop="showFilesDialog(!filesDialog)">
        Show Opened
      </div>
      <div class="moreBtn">Remove All</div>
    </div>
    <file
      :class="activeFile == file.name ? 'file-active' : ''"
      v-for="(file, i) in files"
      :key="file.name"
      :index="i"
      :name="file.name"
      @click.native="openFile($event, file.name)"
    >
      {{
        activeFile == file.name
          ? file.name
          : file.name.length > 25
          ? `${file.name.substring(0, 23)}...`
          : file.name
      }}
    </file>
  </div>
</template>

<script>
import file from "@/components/buttons/file.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "barFiles",
  components: {
    file
  },
  computed: {
    ...mapGetters([
      "files",
      "activeFile",
      "fileIsSaved",
      "fileMode",
      "fileData",
      "moreDialog",
      "filesDialog"
    ])
  },
  methods: {
    ...mapActions([
      "switchFile",
      "addFile",
      "activeFileData",
      "saveFile",
      "showMore",
      "showFilesDialog"
    ]),
    openFile(ev, name) {
      if (this.fileIsSaved || this.fileMode().includes("image/"))
        this.switchFile(name);
      else alert("yee");
    },
    dragEnt(ev) {
      ev.preventDefault();
      this.$refs.panelFiles.style.background = "#3d3d3d";
    },
    dragLv(ev) {
      ev.preventDefault();
      this.$refs.panelFiles.removeAttribute("style");
    },
    dragOvr(ev) {
      ev.preventDefault();
      this.$refs.panelFiles.style.background = "#3d3d3d";
    },
    dragEn(ev) {
      ev.preventDefault();
      this.$refs.panelFiles.removeAttribute("style");
    },
    drop(ev) {
      ev.preventDefault();
      const $this = this;
      this.$refs.panelFiles.removeAttribute("style");
      const files = ev.dataTransfer.files;
      for (let file of files) {
        const fileR = new FileReader();
        fileR.onloadend = function(e) {
          const text = e.target.result;
          $this.addFile({
            name: file.name,
            data: text,
            mode: file.type,
            last: new Date(file.lastModified)
              .toJSON()
              .substring(0, 19)
              .replace("T", " ")
          });
        };
        if (!file.type.includes("image/")) {
          fileR.readAsText(file, "utf-8");
        } else {
          fileR.readAsDataURL(file);
        }
      }
    },
    scrollLeft() {
      this.$refs.panelFiles.scrollBy({
        top: 0,
        left: -100,
        behavior: "smooth"
      });
    },
    scrollRight() {
      this.$refs.panelFiles.scrollBy({
        top: 0,
        left: 100,
        behavior: "smooth"
      });
    },
    scrollHoriz(e) {
      e.preventDefault();
      const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      this.$refs.panelFiles.scrollLeft -= delta * 25;
    },
    returnToPrevious() {
      this.activeFileData(this.fileData(), "saveFile");
    },
    removeAll() {
      // Show modal;
    }
  },
  updated() {
    const $this = this;
    if (this.files.length > 0) {
      this.$refs.panelFiles.addEventListener(
        "mousewheel",
        $this.scrollHoriz,
        false
      );
      this.$refs.panelFiles.addEventListener(
        "DOMMouseScroll",
        $this.scrollHoriz,
        false
      );
    }
  }
};
</script>

<style scoped lang="scss">
.bar--files {
  position: relative;
  flex: 0 0 auto;
  padding: 0;
  overflow-x: auto;
  overflow-y: hidden;
  transition: background 0.2s;
  background: $panel-files-bg;
  @include rectangle(calc(100% - 5rem), calc(2rem + 2px));
  @extend %flex-start;
  .scroller {
    position: fixed;
    right: 0;
    width: 5rem;
    height: calc(2rem + 2px);
    background: #1d1d1d;
    @extend %flex-center;
    @extend %noselect;
    i {
      margin: 0 0.1rem;
      color: #ababab;
      @extend %pointer;
      @extend %typo-medium;
    }
    i:hover {
      color: #fefefe;
    }
  }
}
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
.bar--files::-webkit-scrollbar {
  display: block;
  width: 2px;
  height: 2px;
  padding: 5px;
  overflow: auto;
  background-color: #1d1d1d;
}

.bar--files::-webkit-scrollbar-thumb {
  background: $panel-top--header;
  border: 2px solid #0000;
}
</style>
