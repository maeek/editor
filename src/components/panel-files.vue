<template>
  <div class="bar bar--files">
    <div class="blank"></div>
    <file :class="'file-active'">file.js</file>
    <file>notatnik.txt</file>
  </div>
</template>

<script>
import file from "@/components/panel-files/file.vue";

export default {
  name: "barFiles",
  components: {
    file
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
