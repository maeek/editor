<template>
  <div class="file">
    <span class="name">
      <slot></slot>
    </span>
    <i class="material-icons close">close</i>
  </div>
</template>

<script>
export default {
  name: "file",
  components: {}
};
</script>

<style scoped lang="scss">
.file {
  height: calc(100% - 2px);
  padding: 0 0.3rem 0 0.8rem;
  @extend %flex-center;
  justify-content: space-between;
  cursor: pointer;
  transition: backround 0.15s;
  border: 1px solid $panel-files-bg;
  .name {
    @extend %typo-small;
    @extend %typo-roboto;
    color: $file-name-color;
    font-weight: 400;
  }
  .close {
    color: $file-exit-color;
    background: $file-exit-bg;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    margin: 0 0 0 0.4rem;
    @extend %flex-center;
    @extend %typo-small;
    opacity: 0;
    transition: opacity 0.15s;
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
