<template>
    <label>
      <input type="checkbox">
      <div class="checkbox--wrapper"></div>
      <span class="name">
        <slot></slot>
      </span>
    </label>
</template>

<script>
export default {
  name: 'option'
}
</script>

<style scoped lang="scss">
  label {
    color: $option--label;
    input {
      display: none;
    }
    input ~ .checkbox--wrapper {
      @include rectangle(50px, 50px);
      transition: .3s background, .3s color;
      background: $option--bg;
    }
    input:checked ~ .checkbox--wrapper {
      color: $option--checked-color;
      background: $option--checked-bg;
    }
    .name {
      color: inherit;
      @extend %typo-medium;
    }
  }
</style>
