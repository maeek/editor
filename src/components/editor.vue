<template>
  <main class="editor">
    <div class="editorFields" v-if="files.length > 0">
      <codemirror
        ref="editor"
        :key="activeFile"
        :value="code"
        :options="cmOption"
        @ready="onReady"
        @input="triggerSave"
      >
      </codemirror>
    </div>
    <div class="addFile" v-else>
      <i class="material-icons" @click="openFile">note_add</i>
      <span @click="openFile">Click here to open local file</span>
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
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        foldGutter: true,
        styleSelectedText: true,
        mode: "text/plain",
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: "base16-dark",
        extraKeys: { Ctrl: "autocomplete" },
        hintOptions: {
          completeSingle: true
        }
      }
    };
  },
  components: {
    codemirror
  },
  computed: {
    ...mapGetters(["fileMode", "activeFile", "files"])
  },
  methods: {
    ...mapActions(["saveFile"]),
    triggerSave(newcode) {
      this.code = newcode;
      this.saveFile(newcode);
    },
    onReady() {
      this.$data.code = this.$store.getters.fileData();
      this.$data.cmOption.mode = this.fileMode;
      this.$refs.editor.focus();
    },
    openFile() {
      document.querySelector("input[type='file']").click();
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
    @include rectangle(100%, 100%);
    @extend %flex-start;
  }
  .addFile {
    flex-direction: column;
    color: $active--line;
    @include rectangle(100%, 100%);
    @extend %flex-center;
    @extend %typo-roboto;
    @extend %typo-normal;
    i {
      margin: 0 0 0.5rem 0;
      font-size: 10rem;
      transition: color 0.1s;
      @extend %pointer;
    }
    span {
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
