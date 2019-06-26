<template>
  <main class="editor">
    <div class="fixedLabel"></div>
    <div class="editorFields">
      <codemirror v-model="code" :options="cmOption"></codemirror>
    </div>
  </main>
</template>

<script>
// import newLine from "@/components/editor/line.vue";
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript.js";
// theme css
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/shadowfox.css";
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
        mode: "text/javascript",
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
  }
};
</script>

<style scoped lang="scss">
@import "../../node_modules/codemirror/theme/base16-dark.css";
.editor {
  .vue-codemirror {
    width: 100%;
    height: 100%;
    .CodeMirror .cm-s-base16-dark {
      height: 100%;
    }
  }
  .fixedLabel {
    position: fixed;
    left: 0;
    top: 40px;
    width: 3.5rem;
    height: 100%;
    background: $lines-bg;
    z-index: -1;
  }
  flex: 1 1 auto;
  overflow: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  // @extend %typo-normal;
  // @extend %typo-roboto;
  .editorFields {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    // .line {
    //   display: flex;
    //   width: 100%;
    //   justify-content: flex-start;
    //   align-items: flex-start;
    //   flex-direction: row;
    //   .lineEdit {
    //     height: auto;
    //     width: calc(100% - 4.5rem);
    //     line-height: 1.2rem;
    //     color: #fff;
    //     padding: 0.5rem;
    //     outline: none;
    //     -webkit-user-modify: read-write-plaintext-only;
    //   }
    //   .lineEdit:focus {
    //     background: #272727;
    //   }
    // }
  }
}
</style>
