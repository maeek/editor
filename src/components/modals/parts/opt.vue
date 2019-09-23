<template>
  <label>
    <span class="name">
      <slot></slot>
    </span>
    <input type="checkbox" :checked="checked" />
    <div class="checkbox--wrapper"></div>
  </label>
</template>

<script>
export default {
  name: "opt",
  props: {
    checked: Boolean
  }
};
</script>

<style scoped lang="scss">
label {
  color: $option--label;
  flex-direction: row;
  flex-wrap: nowrap;
  background: #282828;
  width: 100%;
  padding: 0 1rem;
  @extend %flex-btw-center;
  &:nth-of-type(odd) {
    background: #2f2f2f;
  }
  input {
    display: none;
  }
  input ~ .checkbox--wrapper {
    @include rectangle(24px, 24px);
    transition: 0.3s background, 0.3s color;
    @extend %flex-start;
    flex-direction: row;
    background: $option--bg;
    border-radius: 50%;
    position: relative;
  }
  input:checked ~ .checkbox--wrapper {
    color: $option--checked-color;
    background: $option--checked-bg;
    &::after {
      position: absolute;
      content: "done";
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      @extend %typo-small;
      @extend %flex-center;
      @include rectangle(100%, 100%);
      z-index: 5;
      -webkit-font-feature-settings: "liga";
      font-family: "Material Icons";
      color: #111;
      font-size: 1rem;
      font-weight: 900;
    }
  }
  .name {
    color: inherit;
    margin: 0.5rem 1.2rem 0.5rem 0;
    @extend %typo-normal;
  }
}
</style>
