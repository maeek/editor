<template>
  <h1 @click="$router.push('/')">
    <slot></slot>
  </h1>
</template>

<script>
export default {
  name: "siteHeader",
};
</script>

<style scoped lang="scss">
h1 {
  font-weight: 400;
  margin: 0 0.5rem;
  color: $panel-top--header;
  @extend %typo-roboto;
  @extend %typo-normal;
  @extend %flex-center;
  @extend %noselect;
  i {
    margin-right: 0.3rem;
    color: $comment--header;
  }
}
</style>
