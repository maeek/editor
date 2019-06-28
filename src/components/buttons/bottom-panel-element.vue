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
  padding: 0 1rem;
  background: $bottom--button-bg;
  color: $bottom--button-color;
  @include rectangle(auto, 100%);
  @extend %flex-center;
  @extend %typo-tiny;
  @extend %typo-roboto;
  a {
    color: inherit;
    text-decoration: none;
  }
}
.interactive:hover {
  background: $compact--button--bg-hover;
  color: $bottom--button-hover-color;
  @extend %pointer;
}

@media screen and (max-width: 768px) {
  div {
    padding: 0 0.3rem;
    font-size: 0.6rem;
  }
}
</style>
