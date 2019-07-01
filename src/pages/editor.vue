<template>
  <div class="page-editor">
    <panelTop />
    <panelFiles ref="panelFiles" />
    <editor />
    <panelBottom />
    <modals />
  </div>
</template>

<script>
import panelTop from "@/components/panel-top.vue";
import panelFiles from "@/components/panel-files.vue";
import editor from "@/components/editor.vue";
import panelBottom from "@/components/panel-bottom.vue";
import modals from "@/components/modals.vue";

export default {
  name: "app",
  page: {
    title: "Note"
  },
  components: {
    panelTop,
    panelFiles,
    editor,
    panelBottom,
    modals
  }
};
</script>

<style scoped lang="scss">
.page-editor {
  flex-direction: column;
  @include rectangle(100%, 100%);
  @extend %flex-start;
}
</style>
