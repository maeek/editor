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
  name: "buttonCompact",
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
  border-radius: 4px;
  margin: 0 0.2rem;
  color: $compact--button-color;
  color: #fefefe;
  background: transparent;
  // background: $compact--button-bg;
  @include rectangle(auto, 1.5rem);
  @extend %pointer;
  @extend %noselect;
  @extend %flex-center;
  i {
    margin: 0 0.2rem 0 0;
    color: $compact--button--bg-hover;
    @extend %typo-normal;
  }
  span {
    color: inherit;
    @include rectangle(auto, 100%);
    @extend %typo-tiny;
    @extend %flex-center;
  }
  &.active {
    color: $compact--button-bg;
    background: $compact--button--bg-hover;
    i {
      color: $compact--button-bg;
    }
  }
  &[title="Cancel"] {
    background: #333;
  }
  &.close,
  &.login {
    background: $compact--button-bg;
  }
  @media screen and (max-width: 768px) {
    .hidden {
      margin: 0;
    }
    .hide {
      display: none;
    }
  }
}
button:hover {
  color: $compact--button-bg;
  background: $compact--button--bg-hover;
  i {
    color: $compact--button-bg;
  }
}
@media screen and (max-width: 768px) {
  button {
    background: $compact--button-bg;
  }
}
</style>
