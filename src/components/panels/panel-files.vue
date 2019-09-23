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
    <file
      :class="activeFile == file.name ? 'file-active' : ''"
      v-for="(file, i) in files"
      :key="file.name"
      :index="i"
      :name="file.name"
      @click.native="openFile($event, file)"
      :id="file.gistId"
    >
      {{
        activeFile == file.name
          ? file.name
          : file.name.length > 25
          ? `${file.name.substring(0, 23)}...`
          : file.name
      }}
    </file>
    <moreDialog />
  </div>
</template>

<script>
import file from "@/components/buttons/file.vue";
import moreDialog from "@/components/modals/more.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "barFiles",
  components: {
    file,
    moreDialog
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
      "showFilesDialog",
      "newFileModal"
    ]),
    openFile(ev, file) {
      console.log(file);
      if (
        this.fileIsSaved ||
        (this.activeFile && this.fileMode().includes("image/"))
      ) {
        this.switchFile(file.name);
        this.$router.push({
          path: `/edit/${file.gistId}`,
          query: {
            target: file.name
          }
        });
      }
      // else alert("yee");
      // file
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
    readFileAsync(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(file, "utf-8");
      });
    },
    async file(files) {
      const $this = this;
      const prepFiles = {
        files: {},
        uploaded_at: "",
        owner: {
          login: $this.alias
        },
        id: $this.$route.params.id || "",
        description: ""
      };
      if (!$this.$route.params.id && $this.authorized) {
        $this.newFileModal(true);
      } else {
        await Object.keys(files).forEach(async (file, i) => {
          let loadedFile = await $this.readFileAsync(files[file]);
          const text = loadedFile;
          prepFiles.files[files[file].name] = {
            filename: files[file].name,
            content: text,
            type: files[file].type,
            size: files[file].size
          };
          prepFiles.uploaded_at = new Date(files[file].lastModified)
            .toJSON()
            .substring(0, 19)
            .replace("T", " ");
          await $this.addFile(prepFiles);
          $this.$store.commit("SAVE");
          if (i == files.length - 1) {
            $this.$router.push({
              path: `/edit/${$this.$route.params.id || ""}`,
              query: {
                target: files[file].name
              }
            });
            await $this.switchFile(files[file].name);
            $this.authorized && $this.saveFile();
          }
        });
      }
    },
    drop(ev) {
      ev.preventDefault();
      this.$refs.panelFiles.removeAttribute("style");
      const files = ev.dataTransfer.files;
      this.file(files);
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
  mounted() {
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
    z-index: 5;
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
.file {
  .name {
    white-space: nowrap;
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
