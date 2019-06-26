<template>
  <main class="editor">
    <div class="editorFields" v-if="files.length > 0">
      <codemirror
        :key="activeFile"
        :value="code"
        :options="cmOption"
        @ready="onready"
        @input="save_file"
      >
      </codemirror>
    </div>
    <div class="addFile" v-else>
      <i class="material-icons" @click="openFile">note_add</i>
      <span>Open local file</span>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
//Languages
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/markdown/markdown.js";

// import "codemirror/addon/mode/loadmode.js";

// theme css
import "codemirror/theme/base16-dark.css";
// import "codemirror/theme/shadowfox.css";

// active-line.js
import "codemirror/addon/selection/active-line.js";
// styleSelectedText
import "codemirror/addon/selection/mark-selection.js";
import "codemirror/addon/search/searchcursor.js";
// highlightSelectionMatches
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/match-highlighter.js";
// keyMap
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/keymap/sublime.js";
// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";
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
          completeSingle: false
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
    save_file(newcode) {
      this.code = newcode;
      this.saveFile(newcode);
    },
    onready() {
      this.$data.code = this.$store.getters.fileData();
      this.$data.cmOption.mode = this.fileMode;
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
    width: 100%;
    height: 100%;
  }
  flex: 1 1 auto;
  overflow: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .editorFields {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }
  .addFile {
    width: 100%;
    height: 100%;
    @extend %flex-center;
    @extend %typo-roboto;
    @extend %typo-normal;
    flex-direction: column;
    color: #272727;
    i {
      margin: 0 0 0.5rem 0;
      font-size: 10rem;
      cursor: pointer;
      transition: color 0.1s;
    }
    span {
      color: $comment--description;
    }
    i:hover {
      color: $comment--header;
    }
    i:hover ~ span {
      color: $lines-color;
    }
  }
}
</style>
