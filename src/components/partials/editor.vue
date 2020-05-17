<template>
  <main class="editor" ref="editorWrapper">
    <div
      class="editorFields"
      v-if="
        files.length > 0 && activeFile && activeFileData != null && !gistLoading
      "
    >
      <revisions
        v-if="showRevisions"
        ref="revs"
        :scroll="scroll"
        @scrolled="scrolled = false"
        @next="revPage"
      />
      <error-boundary>
        <codemirror
          ref="codeMrr"
          :key="activeFile"
          :value="activeFileData"
          :options="cmOption"
          placeholder="Type here..."
          @ready="onReady"
          @input="triggerSave"
        >
        </codemirror>
      </error-boundary>
      <user :wide="true" :user="user" />
      
      <comments
        v-if="comments"
        ref="applet"
        :scroll="scroll"
        @scrolled="scrolled = false"
      />
      <footer-component class="footer" :wide="true">
        <compact title="Home" name="Home" class="save rev">
          home
        </compact>
        <compact title="Settings" name="Settings" class="save rev">
          device_hub
        </compact>
        <compact title="Contact" name="Contact" class="save rev">
          chat
        </compact>
        <compact title="Report issue" name="Report issue" class="save rev">
          bug_report
        </compact>
      </footer-component>
    </div>
    <div class="loader" v-if="gistLoading && $route.params.id">
      <h5>
        <span>{{ $route.params.id }}</span>
      </h5>
      <div class="bar"></div>
    </div>
    <input type="file" name="openFile" @input="loadFile" multiple ref="input" />
    <div
      class="addFile"
      v-if="(!activeFile || activeFileData == null) && !gistLoading"
      ref="dropArea"
      @dragenter="dropActive"
      @dragover="dropActive"
      @dragleave="dropInactive"
      @dragend="dropInactive"
      @drop="drop"
    >
      <i class="material-icons" ref="addFile" @click="openFile">note_add</i>
      <span @click="openFile"
        >Click on the icon or drop files here to create new gist</span
      >
    </div>
  </main>
</template>

<script>
import(/* webpackPrefetch: true, webpackChunkName: "codemirror-modules" */ "@/editorLoader.js");
import { codemirror } from "vue-codemirror";
import { mapGetters, mapActions } from "vuex";
import errorBoundary from "@/components/error-boundary.vue";
import /* webpackPrefetch: true, webpackChunkName: "codemirror-keymap-sublime" */ "codemirror/keymap/sublime.js";
import /* webpackPrefetch: true, webpackChunkName: "codemirror-keymap-vim" */ "codemirror/keymap/vim.js";
import revisions from "@/components/partials/revisions.vue";
import comments from "@/components/partials/comments.vue";
import user from "@/components/panels/user.vue";
import compact from "@/components/buttons/button-compact.vue";
import footerComponent from "@/components/partials/footer.vue";

export default {
  name: "editorWrapper",
  data() {
    return {
      code: "",
      scrolled: false,
      loadedRev: null
    };
  },
  components: {
    codemirror,
    errorBoundary,
    revisions,
    comments,
    compact,
    footerComponent,
    user
  },
  computed: {
    ...mapGetters([
      "alias",
      "fileMode",
      "fileData",
      "activeFile",
      "files",
      "activeFile",
      "activeFileData",
      "keyMap",
      "autoClose",
      "scrollPastEnd",
      "smartIndent",
      "lineWrap",
      "lineNumbers",
      "tabSize",
      "gistLoading",
      "showRevisions",
      "comments",
      "commentsList",
      "showRevsList"
    ]),
    cmOption() {
      return {
        autofocus: true,
        tabSize: this.tabSize ? this.tabSize : 2,
        smartIndent: this.smartIndent || false,
        styleActiveLine: true,
        lineNumbers: this.lineNumbers || false,
        lineWrapping: this.lineWrap || false,
        line: true,
        foldGutter: true,
        lineWiseCopyCut: true,
        styleSelectedText: true,
        mode: this.fileMode || "text/plain",
        keyMap: this.keyMap,
        matchBrackets: true,
        autoCloseBrackets: this.autoClose || false,
        showCursorWhenSelecting: true,
        theme: "base16-dark",
        scrollPastEnd: this.scrollPastEnd || false
      };
    },
    editor() {
      return this.$refs.editor.codemirror;
    },
    codeMrr() {
      return this.$refs.codeMrr.codemirror;
    },
    scroll() {
      return this.scrolled;
    },
    loadedRevision() {
      return this.loadedRev;
    },
    user() {
      if (this.$store.getters.fileById(this.$route.params.id))
        return this.$store.getters.fileById(this.$route.params.id).owner;
      else return null;
    }
  },
  methods: {
    ...mapActions([
      "saveFile",
      "addFile",
      "switchFile",
      "newFileModal",
      "setRevisions",
      "closeById",
      "setComments",
      "setMarkdown"
    ]),
    triggerSave(newcode) {
      this.code = newcode ? newcode : "";
      this.$store.dispatch("activeFileData", newcode);
    },
    onReady() {
      this.$store.dispatch("activeFileData", this.$store.getters.fileData());
      this.$data.code = this.$store.getters.fileData();
      this.cmOption.mode = this.fileMode;
    },
    revPage(page) {
      this.fetchGist(
        `https://api.github.com/gists/${
          this.$route.params.id
        }/commits?page=${page}`
      ).then(data => {
        console.log(data);
        this.$store.commit("SET_REVS", [
          ...data.reverse(),
          ...this.showRevsList
        ]);
      });
    },
    openFile() {
      let input = this.$refs.input;
      input.click();
    },
    async fetchGist(link) {
      return fetch(link, {
        headers: await this.$store.dispatch("setHeaders"),
        cache: "no-cache"
      })
        .then(res => res.json())
        .then(ms => {
          if (!ms.message) {
            return ms;
          } else {
            return null;
          }
        });
    },
    closeRevs() {
      this.setComments(false);
      this.setRevisions(false);
      this.scrolled = false;
    },
    loadFile(ev) {
      const files = ev.target.files;
      this.file(files);
      document.querySelector("input[name='openFile']").removeAttribute("type");
      document
        .querySelector("input[name='openFile']")
        .setAttribute("type", "file");
    },
    dropActive(ev) {
      ev.preventDefault();
      this.$refs.addFile.style.color = "#24B474";
      this.$refs.dropArea.style.background = "#232323";
      this.$refs.addFile.innerText = "file_copy";
    },
    dropInactive(ev) {
      ev.preventDefault();
      this.$refs.addFile.removeAttribute("style");
      this.$refs.dropArea.removeAttribute("style");
      this.$refs.addFile.innerText = "note_add";
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
      this.$refs.addFile.removeAttribute("style");
      this.$refs.dropArea.removeAttribute("style");
      const $this = this;
      const files = ev.dataTransfer.files;
      $this.file(files);
    },
    saveS(e) {
      if (e.ctrlKey && e.keyCode == 83 && this.$route.params.id) {
        e.preventDefault();
        this.saveFile();
      }
    }
  },
  updated() {
    const $this = this;
    window.addEventListener("keydown", $this.saveS);
  },
  beforeUpdate() {
    const $this = this;
    window.removeEventListener("keydown", $this.saveS);
  },
  mounted() {
    const $this = this;
    if (this.gistLoading && !this.$route.params.id)
      this.$store.commit("SET_LOADING", false);
    this.$refs.editorWrapper.addEventListener("scroll", function() {
      if ($this.$refs.applet) {
        if (
          $this.$refs.editorWrapper.scrollTop + 70 >=
          $this.$refs.applet.$el.offsetTop
        ) {
          $this.scrolled = true;
        } else {
          $this.scrolled = false;
        }
      }
    });
    if (this.showRevisions) {
      this.fetchGist(
        `https://api.github.com/gists/${this.$route.params.id}/commits`
      ).then(data => {
        if (data) this.$store.commit("SET_REVS", data.reverse());
      });
    }
    if (this.comments) {
      this.fetchGist(
        `https://api.github.com/gists/${this.$route.params.id}/comments`
      ).then(data => {
        if (data) this.$store.commit("SET_COMMENTS", data);
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../node_modules/codemirror/lib/codemirror.css";
@import "../../../node_modules/codemirror/theme/base16-dark.css";
.footer {
  &.wide {
    padding: 2rem 0;
  }
  button.rev {
    margin: 0.3rem;
  }
}
.editor {
  scroll-behavior: smooth;
  .vue-codemirror {
    @include rectangle(100%, auto);
    @extend %flex-btw-start;
    background: #151515;
    flex-direction: column;
    flex: 1 0 auto;
    min-height: 80%;
  }
  flex: 1 1 auto;
  overflow: auto;
  @include rectangle(100%, 100%);
  @extend %flex-start;
  .editorFields {
    flex-direction: column;
    background: $body--bg;
    @include rectangle(100%, auto);
    min-height: 100%;
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
    @extend %noselect;
    i {
      margin: 0 0 0.5rem 0;
      font-size: 10rem;
      transition: color 0.2s;
      @extend %pointer;
    }
    span {
      max-width: 80%;
      text-align: center;
      transition: color 0.2s;
      color: $compact--button-color;
    }
    i:hover {
      color: $panel-top--header;
    }
    i:hover ~ span {
      color: $lines-color;
    }
  }
  .loader {
    @include rectangle(100%, 100%);
    @extend %flex-center;
    flex-direction: column;
    overflow: hidden;
    .bar {
      width: 400px;
      max-width: 95%;
      height: 5px;
      background: #666;
      margin: 1rem 0;
      position: relative;
      border-bottom: 2px solid rgb(117, 70, 17);
      &::after {
        width: 33%;
        height: 100%;
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        background: $comment--header;
        animation-name: progress;
        animation-duration: 60s;
        animation-fill-mode: both;
      }
    }
    h5 {
      font-size: 1.5rem;
      color: #ccc;
      @extend %typo-koho;
      margin: 0;
      text-align: center;
      span {
        font-size: 1rem;
        display: flex;
        text-decoration: underline wavy $comment--header;
        padding: 0.5rem 0;
        color: #ababab;
      }
    }
  }
}
input[type="file"] {
  display: none;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes progress {
  0% {
    width: 0%;
  }
  15% {
    width: 40%;
  }
  25% {
    width: 45%;
  }
  30% {
    width: 50%;
  }
  100% {
    width: 100%;
  }
}
</style>
