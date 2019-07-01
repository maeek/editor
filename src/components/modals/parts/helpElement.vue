<template>
  <div>
    <span>
      <slot></slot>
    </span>
    <i>
      {{ keys }}
    </i>
  </div>
</template>

<script>
export default {
  name: "helpElement",
  props: {
    keys: String
  }
};
</script>

<style scoped lang="scss">
div {
  margin: 0.3rem 0.5rem;
  @extend %flex-btw-center;
  @extend %typo-roboto;
  @extend %typo-normal;
  min-width: 300px;
  width: 100%;
  i {
    display: block;
    font-style: normal;
    border: 1px solid #555;
    background: #222;
    margin: 0 1rem 0 0;
    padding: 0.4rem 0.8rem;
    border-radius: 5px;
    color: #999;
    white-space: nowrap;
    color: $panel-top--header;
    @extend %noselect;
    @extend %typo-small;
    font-family: monospace;
    font-weight: 900;
  }
  span {
    color: #f0f0f0;
  }
}
@media screen and (max-width: 768px) {
  div {
    margin: 0.3rem;
    i {
      padding: 0.4rem;
    }
  }
}
</style>
