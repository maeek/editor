<template>
  <div class="bar bar--bottom">
    <div>
      <bottomButton>
        <i class="material-icons">signal_wifi_4_bar</i> Connected
      </bottomButton>
      <bottomButton>
        <i
          class="material-icons"
          title="Waiting for save"
          v-if="!fileIsSaved() && fileIsSaved() != null"
        >
          lens
        </i>
        {{ saveStatus }}
      </bottomButton>
    </div>
    <div>
      <div class="list">
        <ul></ul>
      </div>
      <bottomButton>
        {{ fileMode }}
      </bottomButton>
      <bottomButton
        >Ln: {{ fileMode.includes("image/") ? 0 : fileLines }}</bottomButton
      >
      <bottomButton :class="'interactive'">
        <a href="https://github.com/maeek/">Github</a>
      </bottomButton>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import bottomButton from "@/components/buttons/bottom-panel-element.vue";

export default {
  name: "barBottom",
  components: {
    bottomButton
  },
  computed: {
    ...mapGetters([
      "fileMode",
      "fileLines",
      "fileIsSaved",
      "fileLastSaved",
      "activeFile"
    ]),
    saveStatus: function() {
      if (this.fileIsSaved())
        return `All saved , last save - ${this.fileLastSaved()}`;
      else if (this.fileIsSaved() == null) return "No file";
      else return "Not saved , last save - " + this.fileLastSaved();
    }
  }
};
</script>

<style scoped lang="scss">
.bar--bottom {
  flex: 0 0 auto;
  background: $panel-bottom;
  @include rectangle(100%, 1.3rem);
  @extend %flex-btw-end;
  .list {
    display: none;
  }
  div {
    @include rectangle(auto, 100%);
    @extend %flex-start-center;
  }
}
</style>
