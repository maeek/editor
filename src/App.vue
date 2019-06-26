<template>
  <div id="app">
    <panelTop />
    <panelFiles />
    <editor />
    <panelBottom />
  </div>
</template>

<script>
import editor from "@/pages/editor.vue";

export default {
  name: "app",
  components: {
    editor
  }
};
</script>

<style lang="scss">
@import "@/design/index.scss";

#app {
  height: 100%;
}
</style>
