<template>
  <div class="wrapper placeholderWrapper" v-if="queryActive || queryFailed">
    <div v-for="n in count" :key="n" class="placeholder">
      <div class="placeholder-img"></div>
      <div class="placeholder-title"></div>
      <div class="spacer"></div>
      <div class="more"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "loadPlaceholder",
  props: ["count"],
  computed: mapGetters(["queryFailed", "queryActive"])
};
</script>

<style scoped lang="scss">
.wrapper {
  @include rectangle(100%, 100%);
}
.placeholderWrapper {
  margin-top: 1em;
}
.placeholder {
  color: #f0f0f0;
  border: 0;
  border-bottom: 3px solid #252525;
  border-radius: 0;
  width: calc(100% - 2rem);
  padding: 0.3rem 0.5rem;
  margin: 0.7rem auto;
  padding-bottom: 1.5rem;
  @extend %typo-koho;
  @extend %flex-start;
  .placeholder-img {
    width: 40px;
    height: 40px;
    flex: 0 0 40px;
    background: #363636;
  }
  .placeholder-title {
    background: #2d2d2d;
    margin: 0 1rem;
    width: 33%;
    height: 1.2rem;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      bottom: -1.3rem;
      height: 0.8rem;
      width: 40%;
      background: #2d2d2d;
    }
  }
  .spacer {
    flex: 1 0 auto;
  }
  .more {
    background: #2d2d2d;
    width: 10rem;
    max-width: 20%;
    transform: translateY(1rem);
    height: 1.2rem;
  }
}
</style>
