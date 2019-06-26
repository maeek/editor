<template>
  <div class="line">
    <numLine>
      <slot></slot>
    </numLine>
    <lineEdit />
  </div>
</template>

<script>
import numLine from "@/components/editor/numline.vue";
import lineEdit from "@/components/editor/lineEdit.vue";

export default {
  name: "newLine",
  components: {
    numLine,
    lineEdit
  }
};
</script>

<style scoped lang="scss">
.line {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  flex: 0 0 auto;
  .lineEdit {
    height: auto;
    width: calc(100% - 4.5rem);
    line-height: 1rem;
    color: #fff;
    padding: 0.5rem;
    outline: none;
    -webkit-user-modify: read-write-plaintext-only;
  }
  .lineEdit:focus {
    background: #272727;
  }
}
</style>
