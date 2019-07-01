<template>
  <nav class="bar bar--top">
    <siteHeader><i class="material-icons">waves</i> NOTE</siteHeader>
    <div class="options">
      <compact :title="'Save file'" name="Save" @click.native="saveFile">
        save
      </compact>
      <compact
        :title="'Add file'"
        name="New file"
        @click.native="newFileModal(true)"
      >
        add
      </compact>
      <compact :title="'Open file'" name="Open file" @click.native="openFile">
        file_copy
      </compact>
      <input type="file" name="openFile" @input="loadFile" multiple />
      <compact :title="'Download file'" name="Download">
        save_alt
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
    </div>
  </nav>
</template>

<script>
import siteHeader from "@/components/panel-top/header.vue";
import compact from "@/components/buttons/button-compact.vue";
import { mapActions } from "vuex";

export default {
  name: "barTop",
  data() {
    return {
      fullscreen: document.fullscreenEnabled,
      isFullscreen: null
    };
  },
  components: {
    compact,
    siteHeader
  },
  computed: {
    fullscreenIndicator: function() {
      return this.isFullscreen ? "Disable fullscreen" : "Enable fullscreen";
    }
  },
  methods: {
    ...mapActions([
      "addFile",
      "newFileModal",
      "toggleSettings",
      "saveFile",
      "showHelpModal"
    ]),
    openFile() {
      document.querySelector("input[name='openFile']").click();
    },
    loadFile(ev) {
      const $this = this;
      const files = ev.target.files;
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
    }
  },
  mounted() {
    const $this = this;
    $this.isFullscreen = false;
    document.onfullscreenchange = function() {
      $this.isFullscreen = document.fullscreenElement;
    };
  }
};
</script>

<style scoped lang="scss">
nav {
  padding: 0.5rem 0;
  background: $panel-top;
  @include rectangle(100%, auto);
  @extend %flex-btw-center;
  .options {
    margin: 0 0.5rem;
    @extend %flex-end-center;
  }
}
</style>
