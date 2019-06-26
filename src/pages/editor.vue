<template>
  <div class="page-editor">
    <panelTop />
    <panelFiles />
    <editor />
    <panelBottom />
  </div>
</template>

<script>
import panelTop from "@/components/panel-top.vue";
import panelFiles from "@/components/panel-files.vue";
import editor from "@/components/editor.vue";
import panelBottom from "@/components/panel-bottom.vue";

export default {
  name: "app",
  page: {
    title: "Note"
  },
  components: {
    panelTop,
    panelFiles,
    editor,
    panelBottom
  }
};
</script>

<style scoped lang="scss">
.page-editor {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
</style>
