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
      width: 50px;
      height: 50px;
      background: $option--bg;
      transition: .3s background, .3s color;
    }
    input:checked ~ .checkbox--wrapper {
      background: $option--checked-bg;
      color: $option--checked-color;
    }
    .name {
      color: inherit;
      @extend %typo-medium;
    }
  }
</style>
