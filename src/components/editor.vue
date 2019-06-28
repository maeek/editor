<template>
  <main class="editor">
    <div class="editorFields" v-if="files.length > 0">
      <codemirror
        :key="activeFile"
        :value="code"
        :options="cmOption"
        @ready="onReady"
        @input="triggerSave"
        v-if="!isImage"
      >
      </codemirror>
      <img draggable="false" :src="image" v-else-if="isImage" />
    </div>
    <div
      class="addFile"
      v-else
      ref="dropArea"
      @dragenter="dragEnt"
      @dragleave="dragLv"
      @dragend="dragEn"
      @dragover="dragOvr"
      @drop="drop"
    >
      <i class="material-icons" ref="addFile" @click="openFile">note_add</i>
      <span @click="openFile">Click on the icon or drop files here</span>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { codemirror } from "vue-codemirror";
import "@/editorLoader.js";

export default {
  name: "editor",
  data() {
    return {
      code: "",
      cmOption: {
        autofocus: true,
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: false,
        line: true,
        foldGutter: true,
        lineWiseCopyCut: true,
        styleSelectedText: true,
        mode: "text/plain",
        keyMap: "sublime",
        matchBrackets: true,
        autoCloseBrackets: true,
        showCursorWhenSelecting: true,
        theme: "base16-dark",
        scrollPastEnd: true
      }
    };
  },
  components: {
    codemirror
  },
  computed: {
    ...mapGetters(["fileMode", "fileData", "activeFile", "files"]),
    editor() {
      return this.$refs.editor.codemirror;
    },
    isImage() {
      return this.fileMode.includes("image/");
    },
    image() {
      if (this.isImage) {
        console.log(this.fileData);
        return this.fileData();
      } else {
        return "";
      }
    }
  },
  methods: {
    ...mapActions(["saveFile", "addFile"]),
    triggerSave(newcode) {
      this.code = newcode;
      this.saveFile(newcode);
    },
    onReady() {
      if (!this.isImage) {
        this.$data.code = this.$store.getters.fileData();
      }
      this.$data.cmOption.mode = this.fileMode;
    },
    openFile() {
      document.querySelector("input[type='file']").click();
    },
    dragEnt(ev) {
      ev.preventDefault();
      this.$refs.addFile.style.color = "#24B474";
      this.$refs.dropArea.style.background = "#232323";
      this.$refs.addFile.innerText = "file_copy";
    },
    dragLv(ev) {
      ev.preventDefault();
      this.$refs.addFile.removeAttribute("style");
      this.$refs.dropArea.removeAttribute("style");
      this.$refs.addFile.innerText = "note_add";
    },
    dragOvr(ev) {
      ev.preventDefault();
      this.$refs.addFile.innerText = "file_copy";
      this.$refs.addFile.style.color = "#24B474";
      this.$refs.dropArea.style.background = "#232323";
    },
    dragEn(ev) {
      ev.preventDefault();
      this.$refs.addFile.removeAttribute("style");
      this.$refs.dropArea.removeAttribute("style");
      this.$refs.addFile.innerText = "note_add";
    },
    drop(ev) {
      ev.preventDefault();
      this.$refs.addFile.removeAttribute("style");
      this.$refs.dropArea.removeAttribute("style");
      const $this = this;
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
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../node_modules/codemirror/theme/base16-dark.css";
.editor {
  .vue-codemirror {
    @include rectangle(100%, 100%);
  }
  flex: 1 1 auto;
  overflow: auto;
  @include rectangle(100%, 100%);
  @extend %flex-start;
  .editorFields {
    flex-direction: column;
    background: $body--bg;
    @include rectangle(100%, 100%);
    @extend %flex-start;
  }
  .addFile {
    flex-direction: column;
    transition: background 0.2s;
    color: $active--line;
    background: #1d1d1d;
    @include rectangle(100%, 100%);
    @extend %flex-center;
    @extend %typo-roboto;
    @extend %typo-normal;
    i {
      margin: 0 0 0.5rem 0;
      font-size: 10rem;
      transition: color 0.2s;
      @extend %pointer;
    }
    span {
      transition: color 0.2s;
      color: $comment--description;
    }
    i:hover {
      color: $panel-top--header;
    }
    i:hover ~ span {
      color: $lines-color;
    }
  }
}
</style>
