<template>
  <button>
    <i :class="{ hidden: hide }" class="material-icons">
      <slot></slot>
    </i>
    <span :class="{ hide }">{{ name }}</span>
  </button>
</template>

<script>
export default {
  name: "buttonModal",
  props: {
    name: {
      default: "",
      type: String
    },
    hide: {
      default: true,
      type: Boolean
    }
  }
};
</script>

<style scoped lang="scss">
button {
  border-radius: 5px;
  margin: 0 0.2rem;
  color: #fefefe;
  background: transparent;
  padding: 0.5rem 1rem;
  @include rectangle(auto, auto);
  @extend %pointer;
  @extend %noselect;
  @extend %flex-start-center;
  border: 1px solid $compact--button-color;
  i {
    margin: 0 0.5rem 0 0;
    color: $compact--button--bg-hover;
    @extend %typo-medium;
  }
  span {
    color: inherit;
    @include rectangle(auto, 100%);
    @extend %typo-small;
    @extend %flex-start;
    font-weight: 900;
  }
  &.active {
    color: $compact--button--bg-hover;
    border: 1px solid $compact--button--bg-hover;
  }
  &[title="Cancel"],
  &.secret {
    color: #ababab;
    border: 1px solid #333;
  }
  &:hover {
    color: $compact--button-bg;
    background: $compact--button--bg-hover;
    &[title="Cancel"],
    &.secret {
      background: #ababab;
    }
    i {
      color: $compact--button-bg;
    }
  }
}
</style>
