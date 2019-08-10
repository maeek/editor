<template>
  <div
    class="file"
    :class="{ obj, 'file-name': name }"
    :title="obj || name"
    v-if="fileByName(name) || fileById(obj)"
  >
    <span
      :class="{
        name: true,
        'name-side': obj,
        'name-name': !obj
      }"
    >
      <slot></slot>
    </span>
    <i
      class="material-icons close"
      :title="name ? `Delete ${name}` : `Close ${obj}`"
      @click.stop="remove"
      >{{ name ? "delete" : "close" }}</i
    >
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "file",
  props: {
    name: String,
    obj: String,
    id: String
  },
  computed: mapGetters(["fileByName", "fileById"]),
  methods: {
    ...mapActions(["removeFile", "closeById"]),
    remove() {
      (this.name && this.removeFile({ name: this.name, id: this.id })) ||
        (this.obj && this.closeById(this.obj));
    }
  }
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
  border: 1px solid #4a4a4a;
  @extend %pointer;
  @extend %flex-btw-center;
  &.obj {
    white-space: wrap !important;
  }
  &-name {
    white-space: nowrap;
  }
  .name {
    word-break: keep-all;
    width: auto;
    z-index: 2;
    font-weight: 400;
    color: $file-name-color;
    &-side {
      word-break: break-all;
      white-space: wrap;
    }
    @extend %typo-roboto;
    @extend %typo-small;
    @extend %noselect;
  }

  .close {
    border-radius: 50%;
    flex: 0 0 1rem;
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
