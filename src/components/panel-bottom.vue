<template>
  <div class="bar bar--bottom">
    <div>
      <div class="connectivity">
        <i class="material-icons">signal_wifi_4_bar</i> Connected
      </div>
      <bottomButton>
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
      return `${
        this.fileIsSaved()
          ? "All saved , last save - " + this.fileLastSaved()
          : "No file"
      }`;
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
  div {
    @include rectangle(auto, 100%);
    @extend %flex-start-center;
  }
  .connectivity {
    padding: 0 0.5rem;
    color: $bottom--button-color;
    background: $bottom--button-bg;
    @extend %flex-start-center;
    @extend %typo-roboto;
    @extend %typo-tiny;
    i {
      font-size: inherit;
      margin: 0 0.3rem 0 0;
    }
  }
}
</style>
