<template>
  <nav class="bar bar--top">
    <siteHeader
      ><i class="material-icons">{{
        $route.params.id ? "arrow_back" : "waves"
      }}</i>
      {{ $route.params.id ? "Back" : "EDITOR" }}</siteHeader
    >
    <div class="options">
      <slot></slot>
    </div>
  </nav>
</template>

<script>
import siteHeader from "@/components/panels/panel-top/siteHeader.vue";

export default {
  name: "barTop",
  components: {
    siteHeader,
  },
};
</script>

<style scoped lang="scss">
nav {
  padding: 0.5rem 0;
  background: $panel-top;
  @include rectangle(100%, auto);
  @extend %flex-btw-center;
  .options {
    margin: 0 0.5rem;
    @extend %flex-end-center;
  }
}
</style>
