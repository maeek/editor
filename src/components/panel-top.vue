<template>
  <nav class="bar bar--top">
    <siteHeader><i class="material-icons">waves</i> NOTE</siteHeader>
    <div class="options">
      <compact :title="'Add file'" name="New file" @click.native="openModal">
        add
      </compact>
      <compact :title="'Open file'" name="Open file" @click.native="openFile">
        file_copy
      </compact>
      <input type="file" @input="loadFile" multiple />
      <compact :title="'Download file'" name="Download">
        save_alt
      </compact>
      <compact :title="'Enable fullscreen'" name="Enable fullscreen">
        fullscreen
      </compact>
      <compact :title="'Show help'" name="Help">
        help
      </compact>
      <compact :title="'Open settings'" name="Settings">
        settings
      </compact>
    </div>
  </nav>
</template>

<script>
import siteHeader from "@/components/panel-top/header.vue";
import compact from "@/components/panel-top/button-compact.vue";
import { mapActions } from "vuex";

export default {
  name: "barTop",
  components: {
    compact,
    siteHeader
  },
  methods: {
    ...mapActions(["addFile", "newFileModal"]),
    openFile() {
      document.querySelector("input[type='file']").click();
    },
    openModal() {
      this.newFileModal(true);
    },
    loadFile(ev) {
      let $this = this;
      let files = ev.target.files;
      for (let file of files) {
        let fileR = new FileReader();
        fileR.onloadend = function(e) {
          const text = e.target.result;
          $this.addFile({
            name: file.name,
            data: text,
            mode: file.type
          });
        };
        fileR.readAsText(file, "utf-8");
      }
    }
  }
};
</script>

<style scoped lang="scss">
nav {
  background: $panel-top;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  width: 100%;
  .options {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 0.5rem;
  }
  input[type="file"] {
    display: none;
  }
}
</style>
