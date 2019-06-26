<template>
  <div class="page-editor">
    <panelTop />
    <panelFiles />
    <editor />
    <panelBottom />
    <transition name="from-up" mode="out-in">
      <newFile v-if="newFileModal" />
    </transition>
  </div>
</template>

<script>
import panelTop from "@/components/panel-top.vue";
import panelFiles from "@/components/panel-files.vue";
import editor from "@/components/editor.vue";
import panelBottom from "@/components/panel-bottom.vue";
import newFile from "@/components/modals/newfile.vue";
import { mapGetters } from "vuex";

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
    newFile
  },
  computed: {
    ...mapGetters(["newFileModal"])
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
