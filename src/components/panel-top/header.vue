<template>
  <h1>
    <slot></slot>
  </h1>
</template>

<script>
export default {
  name: "header"
};
</script>

<style scoped lang="scss">
h1 {
  @extend %typo-roboto;
  @extend %typo-normal;
  @extend %flex-center;
  color: $panel-top--header;
  font-weight: 400;
  margin: 0 0.5rem;
  i {
    margin-right: 0.3rem;
  }
}
</style>
