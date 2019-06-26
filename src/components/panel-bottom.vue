<template>
  <div class="bar bar--bottom">
    <div>
      <bottomButton>All saved, last save - 24.06.2019</bottomButton>
    </div>
    <div>
      <bottomButton>{{ mode }}</bottomButton>
      <bottomButton>Ln: {{ lines }}</bottomButton>
      <bottomButton :class="'interactive'">
        <a href="https://github.com/maeek/">Github</a>
      </bottomButton>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import bottomButton from "@/components/panel-bottom/bottom-panel-element.vue";

export default {
  name: "barBottom",
  components: {
    bottomButton
  },
  computed: {
    ...mapGetters(["mode", "lines"])
  }
};
</script>

<style scoped lang="scss">
.bar--bottom {
  width: 100%;
  height: 1.3rem;
  background: $panel-bottom;
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  align-content: flex-end;
  div {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
  }
}
</style>
