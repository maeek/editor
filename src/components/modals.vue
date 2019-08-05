<template>
  <div class="modals">
    <transition name="scale" mode="out-in">
      <new-file v-if="newFileModal" />
    </transition>
    <transition name="scale" mode="out-in">
      <remove-file v-if="removeFileModal" />
    </transition>
    <transition name="scale" mode="out-in">
      <help v-if="helpModal" />
    </transition>
    <transition name="scale" mode="out-in">
      <settings v-if="showSettings" />
    </transition>
    <transition name="scale-w-center" mode="out-in">
      <opened />
    </transition>
  </div>
</template>

<script>
import newFile from "@/components/modals/newfile.vue";
import removeFile from "@/components/modals/removeFile.vue";
import settings from "@/components/modals/settings.vue";
import help from "@/components/modals/help.vue";
import opened from "@/components/modals/openedDialog.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Modals",
  components: {
    newFile,
    settings,
    help,
    opened,
    removeFile
  },
  computed: mapGetters([
    "removeFileModal",
    "newFileModal",
    "showSettings",
    "helpModal"
  ]),
  methods: mapActions(["showFilesDialog"]),
  mounted() {
    const $this = this;
    window.addEventListener("click", function() {
      $this.showFilesDialog(false);
    });
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
