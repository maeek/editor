<template>
  <div class="page-editor" :key="'edtID' + id">
    <panel-top :show="false">
      <compact
        :title="'Save file'"
        name="Save"
        @click.native="saveFile()"
        v-if="activeFile"
      >
        save
      </compact>
      <compact
        :title="'Add new file'"
        name="New file"
        @click.native="newFileModal(true)"
        v-if="authorized"
      >
        add
      </compact>
      <compact :title="'Open file'" name="Open file" @click.native="openFile">
        file_copy
      </compact>
      <input type="file" name="openFile" @input="loadFile" multiple />
      <compact :title="'Download file'" name="Download" v-if="activeFile">
        save_alt
      </compact>
      <compact
        :title="'Star this gist'"
        name="Star gist"
        v-if="authorized && !star"
        @click.native="setStarClick(id)"
      >
        star
      </compact>
      <compact
        :title="'Enable fullscreen'"
        :name="fullscreenIndicator"
        v-if="fullscreen"
        :key="'enbFullscreen'"
        @click.native="toggleFullscreen"
      >
        fullscreen
      </compact>
      <compact
        :title="'Show Keybinds'"
        name="Keybinds"
        @click.native="showHelpModal(true)"
      >
        keyboard
      </compact>
      <compact
        :title="'Open settings'"
        name="Settings"
        @click.native="toggleSettings(true)"
      >
        settings
      </compact>
    </panel-top>
    <panelFiles ref="panelFiles" />
    <editor v-if="!fetchError" />
    <panelBottom v-if="!fetchError" />
    <div v-if="fetchError" class="fetchError">
      <pre>
                _____
             ,-"     "-.
            / o       o \
           /   \     /   \
          /     )-"-(     \
         /     ( 6 6 )     \
        /       \ " /       \
       /         )=(         \
      /   o   .--"-"--.   o   \
     /    I  /  -   -  \  I    \
 .--(    (_}y/\       /\y{_)    )--.
(    ".___l\/__\_____/__\/l___,"    )
 \                                 /
  "-._      o O o O o O o      _,-"
      `--Y--.___________.--Y--'
         |==.___________.==| 
         `==.___________.==' 
            
            /           \
           /             \
           </pre
      >
      <span class="code">{{ fetchError.code }}</span>
      <span class="text">{{ fetchError.text }}</span>
    </div>
  </div>
</template>

<script>
import panelTop from "@/components/panels/panel-top.vue";
import panelFiles from "@/components/panels/panel-files.vue";
import editor from "@/components/partials/editor.vue";
import panelBottom from "@/components/panels/panel-bottom.vue";
import compact from "@/components/buttons/button-compact.vue";
import { mapActions, mapGetters } from "vuex";
import { Promise } from "q";
export default {
  name: "app",
  data() {
    return {
      fullscreen: document.fullscreenEnabled,
      isFullscreen: null,
      fetchError: false,
      star: false
    };
  },
  components: {
    panelTop,
    panelFiles,
    editor,
    panelBottom,
    compact
  },
  computed: {
    ...mapGetters([
      "activeFile",
      "authorized",
      "token",
      "tokenType",
      "alias",
      "fileById",
      "files"
    ]),
    fullscreenIndicator: function() {
      return this.isFullscreen ? "Disable fullscreen" : "Enable fullscreen";
    }
  },
  props: {
    id: String,
    focus: Boolean
  },
  methods: {
    ...mapActions([
      "addFile",
      "newFileModal",
      "toggleSettings",
      "saveFile",
      "showHelpModal",
      "removeFile",
      "switchFile",
      "setLoading",
      "setHeaders",
      "setStar",
      "unStar"
    ]),
    openFile() {
      document.querySelector("input[name='openFile']").click();
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
    loadFile(ev) {
      const files = ev.target.files;
      this.file(files);
      document.querySelector("input[name='openFile']").removeAttribute("type");
      document
        .querySelector("input[name='openFile']")
        .setAttribute("type", "file");
    },
    toggleFullscreen() {
      let elem = document.querySelector("#app");
      if (!document.fullscreenElement) {
        elem.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    },
    async fetchGist(url, headers) {
      return await fetch(url, {
        method: "GET",
        headers: headers,
        cache: "no-cache"
      });
    },
    load(link) {
      const $this = this;
      let token = this.authorized ? `${this.tokenType} ${this.token}` : "";
      let headers = $this.authorized
        ? {
            Authorization: token
          }
        : {};
      this.fetchGist(`https://api.github.com/gists/${link}`, headers)
        .then(res => res.json())
        .then(res => {
          if (!res.message) {
            $this.addFile(res).then(() => {
              $this.switchFile(
                $this.$route.query.target || Object.keys(res.files)[0]
              );
            });
          }
          $this.setLoading(false);
        })
        .catch(e => {
          $this.setLoading(false);
          this.fetchError = {
            code: e.code || 424,
            text:
              e.text ||
              e ||
              "The method could not be performed on the resource because the requested action depended on another action and that action failed."
          };
        });
    },
    async setStarClick(id) {
      this.setStar(id)
        .then(res => {
          if (res.status === 204) {
            this.star = true;
            this.$emit("starred", { status: true, id: id });
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  beforeMount() {
    const $this = this;
    $this.isFullscreen = false;
    document.onfullscreenchange = function() {
      $this.isFullscreen = document.fullscreenElement;
    };
    if (this.$route.params.id) {
      this.load(this.$route.params.id);
      if (this.$route.query.target) this.switchFile(this.$route.query.target);
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.id && from.params.id && to.params.id != from.params.id) {
      this.load(to.params.id);
    }
    next();
  }
};
</script>

<style scoped lang="scss">
.page-editor {
  flex-direction: column;
  @include rectangle(100%, 100%);
  @extend %flex-start;
  .fetchError {
    width: 100%;
    min-height: 60%;
    color: $comment--header;
    pre {
      font-family: monospace;
      white-space: pre-wrap;
      font-size: 1rem;
      font-weight: 900;
    }
    span {
      font-weight: 900;
    }
    .code {
      font-size: 2rem;
    }
    .text {
      margin: 0.5rem 0;
      width: 400px;
      max-width: 95%;
      text-align: center;
      color: $compact--button-color;
    }
    @extend %flex-center;
    @extend %typo-koho;
    flex-direction: column;
  }
}
</style>
