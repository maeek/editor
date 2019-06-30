<template>
  <div class="file" :title="name">
    <span class="name">
      <slot></slot>
    </span>
    <i class="material-icons close" @click.stop="removeFile(name)">delete</i>
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
.saveFile {
  background: rgb(92, 92, 92);
}
.file {
  height: 100%;
  position: relative;
  width: auto;
  padding: 0 0.3rem 0 0.8rem;
  transition: background 0.15s;
  border: 1px solid #4a4a4a;
  @extend %pointer;
  @extend %flex-btw-center;
  .name {
    word-break: keep-all;
    white-space: nowrap;
    width: auto;
    z-index: 2;
    font-weight: 400;
    color: $file-name-color;
    @extend %typo-roboto;
    @extend %typo-small;
    @extend %noselect;
  }
  .close {
    border-radius: 50%;
    margin: 0 0 0 0.4rem;
    opacity: 0;
    z-index: 2;
    transition: opacity 0.15s;
    color: $file-exit-color;
    background: $file-exit-bg;
    @include rectangle(1rem, 1rem);
    @extend %flex-center;
    @extend %typo-small;
    @extend %noselect;
  }
}
.file:before {
  content: "";
  position: absolute;
  left: 2px;
  top: 2px;
  @include rectangle(calc(100% - 6px), calc(100% - 6px));
  opacity: 0;
  z-index: 1;
  border: 1px dashed #4d4d4d;
}

@media screen and (max-width: 768px) {
  .file {
    .close {
      opacity: 1;
    }
  }
}

.file:hover {
  .close {
    opacity: 1;
  }
}

.file:hover:before {
  opacity: 1;
}

.file-active {
  background: $file-active-bg;
  .close {
    opacity: 1;
  }
}
.file-active::before {
  opacity: 1;
}
</style>
