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
    ...mapActions(["switchFile"]),
    openFile(ev, name) {
      this.switchFile(name);
    }
  }
};
</script>

<style scoped lang="scss">
.bar--files {
  position: relative;
  flex: 0 0 auto;
  padding: 0;
  background: $panel-files-bg;
  @include rectangle(100%, calc(2rem + 2px));
  @extend %flex-start;
}
</style>
