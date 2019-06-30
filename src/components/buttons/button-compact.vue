<template>
  <button>
    <i class="material-icons">
      <slot></slot>
    </i>
    <span>{{ name }}</span>
  </button>
</template>

<script>
export default {
  name: "buttonCompact",
  props: {
    name: String
  }
};
</script>

<style scoped lang="scss">
button {
  border-radius: 5px;
  margin: 0 0.2rem;
  color: $compact--button-color;
  background: $compact--button-bg;
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
    color: #fefefe;
    @include rectangle(auto, 100%);
    @extend %typo-tiny;
    @extend %flex-center;
  }
  @media screen and (max-width: 768px) {
    i {
      margin: 0;
    }
    span {
      display: none;
    }
  }
}
button:hover {
  color: $compact--button--color-hover;
  background: $compact--button--bg-hover;
  i {
    color: $compact--button-bg;
  }
}
</style>
