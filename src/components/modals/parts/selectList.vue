<template>
  <label>
    <span class="name">
      <slot></slot>
    </span>
    <span class="active">
      {{ keyMap }}
      <i class="material-icons">
        {{ show ? "keyboard_arrow_up" : "keyboard_arrow_down" }}
      </i>
      <ul class="listSelector" v-if="show">
        <li v-for="el of optList" :key="el" @click="setKeyMap(el)">
          {{ el }}
        </li>
      </ul>
    </span>
  </label>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "opt",
  props: {
    activeOpt: String,
    optList: Array,
    show: Boolean
  },
  methods: {
    ...mapActions(["setKeyMap"])
  },
  computed: {
    ...mapGetters(["keyMap"])
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
  padding: 0 1rem;
  @extend %flex-btw-center;
  &:nth-of-type(odd) {
    background: #2f2f2f;
  }
  .name {
    color: inherit;
    margin: 0.5rem 1.2rem 0.5rem 0;
    @extend %typo-normal;
  }
  .active {
    padding: 0.4rem 0.2rem;
    border: 1px solid $active--line;
    position: relative;
    width: 6rem;
    margin: 0.2rem 0;
    text-transform: capitalize;
    background: $option--bg;
    border-radius: 5px;
    @extend %flex-btw-center;
    @extend %noselect;
    @extend %pointer;
    i {
      margin: 0 0 0 1rem;
    }
    ul {
      position: absolute;
      right: 0;
      background: #131313;
      list-style: none;
      border: 1px solid $active--line;
      top: 0.9rem;
      border-radius: 5px;
      overflow: hidden;
      padding: 0;
      width: 6rem;
      li {
        @extend %flex-start;
        width: 100%;
        padding: 0.5rem 0.3rem;
        text-transform: capitalize;
        color: $file-exit-color;
        &:hover {
          background: #282828;
        }
      }
    }
  }
}
</style>
