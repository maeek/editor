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
  // width: 1.8rem;
  height: 1.5rem;
  background: $compact--button-bg;
  outline: none;
  border: 0;
  border-radius: 5px;
  color: $compact--button-color;
  margin: 0 0.2rem;
  cursor: pointer;
  @extend %flex-center;
  i {
    @extend %typo-normal;
    color: $compact--button--bg-hover;
    margin: 0 0.2rem 0 0;
  }
  span {
    height: 100%;
    color: #fefefe;
    @extend %typo-tiny;
    @extend %flex-center;
  }
  @media screen and (max-width: 768px) {
    i {
      color: inherit;
      margin: 0;
    }
    span {
      display: none;
    }
  }
}
button:hover {
  background: $compact--button--bg-hover;
  color: $compact--button--color-hover;
  i {
    color: $compact--button-bg;
  }
}
</style>
