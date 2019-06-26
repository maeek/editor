<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "numLine"
};
</script>

<style scoped lang="scss">
div {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem 0.2rem;
  flex: 0 0 auto;
  width: 3.1rem;
  background: $lines-bg;
  @extend %typo-normal;
  @extend %typo-roboto;
  line-height: 1rem;
  color: #ababab;
  height: calc(100% - 1rem);
}
</style>
