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
    <div class="blank"></div>
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
    ...mapGetters(["files", "activeFile"])
  },
  methods: {
    ...mapActions(["switchFile", "addFile"]),
    openFile(ev, name) {
      this.switchFile(name);
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
          console.log("image");
          fileR.readAsDataURL(file);
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.bar--files {
  position: relative;
  flex: 0 0 auto;
  padding: 0;
  transition: background 0.2s;
  background: $panel-files-bg;
  @include rectangle(100%, calc(2rem + 2px));
  @extend %flex-start;
  ::-webkit-scrollbar {
    display: block;
    width: 10px;
    height: 10px;
    padding: 5px;
    overflow: auto;
    background-color: #1d1d1d;
  }

  ::-webkit-scrollbar-thumb {
    background: #3d3d3d;
    border: 2px solid #0000;
  }
}
</style>
