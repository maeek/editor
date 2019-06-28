<template>
  <div class="page-editor">
    <panelTop />
    <panelFiles />
    <editor />
    <panelBottom />
    <transition name="scale" mode="out-in">
      <newFile v-if="newFileModal" />
    </transition>
    <transition name="from-up" mode="out-in">
      <settings v-if="showSettings" />
    </transition>
  </div>
</template>

<script>
import panelTop from "@/components/panel-top.vue";
import panelFiles from "@/components/panel-files.vue";
import editor from "@/components/editor.vue";
import panelBottom from "@/components/panel-bottom.vue";
import newFile from "@/components/modals/newfile.vue";
import settings from "@/components/modals/settings.vue";
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
    newFile,
    settings
  },
  computed: mapGetters(["newFileModal", "showSettings"])
};
</script>

<style scoped lang="scss">
.page-editor {
  flex-direction: column;
  @include rectangle(100%, 100%);
  @extend %flex-start;
}
</style>
