<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "bottomPanelElement"
};
</script>

<style scoped lang="scss">
div {
  width: auto;
  height: 100%;
  padding: 0 1rem;
  background: $bottom--button-bg;
  color: $bottom--button-color;
  @extend %flex-center;
  @extend %typo-tiny;
  @extend %typo-roboto;
}
.interactive:hover {
  background: $compact--button--bg-hover;
  color: #000;
  cursor: pointer;
}
a {
  color: inherit;
  text-decoration: none;
}
@media screen and (max-width: 768px) {
  div {
    padding: 0 0.3rem;
    font-size: 0.6rem;
  }
}
</style>
