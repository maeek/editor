<template>
  <div class="bar bar--bottom">
    <div>
      <div class="connectivity">
        <i class="material-icons">signal_wifi_4_bar</i> Connected
      </div>
      <bottomButton>
        {{ fileIsSaved() ? "All saved" : "Not saved" }}, last save -
        {{ fileLastSaved() }}
      </bottomButton>
    </div>
    <div>
      <bottomButton>{{ fileMode }}</bottomButton>
      <bottomButton>Ln: {{ fileLines }}</bottomButton>
      <bottomButton :class="'interactive'">
        <a href="https://github.com/maeek/">Github</a>
      </bottomButton>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import bottomButton from "@/components/panel-bottom/bottom-panel-element.vue";

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
    ])
  }
};
</script>

<style scoped lang="scss">
.bar--bottom {
  width: 100%;
  height: 1.3rem;
  background: $panel-bottom;
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  align-content: flex-end;
  div {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
  }
  .connectivity {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: $bottom--button-bg;
    color: $bottom--button-color;
    @extend %typo-roboto;
    @extend %typo-tiny;
    padding: 0 0.5rem;
    i {
      font-size: inherit;
      margin: 0 0.3rem 0 0;
    }
  }
}
</style>
