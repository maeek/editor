<template>
  <div class="file">
    <span class="name">
      <slot></slot>
    </span>
    <i class="material-icons close" @click.stop="removeFile(name)">close</i>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "file",
  props: {
    name: String
  },
  methods: mapActions(["removeFile"])
};
</script>

<style scoped lang="scss">
.file {
  height: calc(100% - 2px);
  padding: 0 0.3rem 0 0.8rem;
  transition: backround 0.15s;
  border: 1px solid $panel-files-bg;
  @extend %pointer;
  @extend %flex-btw-center;
  .name {
    font-weight: 400;
    color: $file-name-color;
    @extend %typo-roboto;
    @extend %typo-small;
  }
  .close {
    border-radius: 50%;
    margin: 0 0 0 0.4rem;
    opacity: 0;
    transition: opacity 0.15s;
    color: $file-exit-color;
    background: $file-exit-bg;
    @include rectangle(1rem, 1rem);
    @extend %flex-center;
    @extend %typo-small;
  }
}
.file:hover {
  border: 1px dashed #24b474;
  .close {
    opacity: 1;
  }
}
.file-active {
  background: $file-active-bg;
  .close {
    opacity: 1;
  }
}
</style>
