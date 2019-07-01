<template>
  <label>
    <span class="name">
      <slot></slot>
    </span>
    <input type="text" v-model="val" @input="setTabSize(val)" />
  </label>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "numberOpt",
  data() {
    return {
      val: ""
    };
  },
  computed: mapGetters(["tabSize"]),
  methods: mapActions(["setTabSize"]),
  mounted() {
    this.val = this.tabSize;
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
  padding: 0 0.5rem;
  @extend %flex-btw-center;
  &:nth-of-type(odd) {
    background: #2f2f2f;
  }
  input {
    border: 0;
    border-radius: 5px;
    width: 3rem;
    background: #1e1e1e;
    padding: 0.5rem 1rem;
    color: $file-name-color;
    @extend %typo-small;
    @extend %typo-roboto;
  }
  .name {
    color: inherit;
    margin: 0.5rem 1.2rem 0.5rem 0;
    @extend %typo-normal;
  }
}
</style>
