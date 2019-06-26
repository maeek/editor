<template>
  <div class="bar bar--files" v-if="files.length > 0">
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
import file from "@/components/panel-files/file.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "barFiles",
  components: {
    file
  },
  computed: {
    ...mapGetters(["files", "activeFile", "files"])
  },
  methods: {
    ...mapActions(["switchFile"]),
    openFile(ev, name) {
      // this.$forceUpdate();
      this.switchFile(name);
    }
  }
};
</script>

<style scoped lang="scss">
.bar--files {
  background: $panel-files-bg;
  width: 100%;
  height: calc(2rem + 2px);
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
  position: relative;
}
</style>
