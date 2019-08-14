<template>
  <transition name="scale-w-center">
    <div class="starNotf" v-if="list.length > 0">
      <div
        class="star"
        v-for="(star, i) in list"
        :key="star.id + i"
        @click="list.shift()"
      >
        <i class="material-icons">{{ star.status ? "star" : "star_border" }}</i>
        <span>{{
          star.status ? `Starred ${star.id}` : `UnStarred ${star.id}`
        }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "starNotf",
  props: ["list"],
  methods: mapActions(["updateGists"])
};
</script>

<style scoped lang="scss">
@keyframes progress {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
.starNotf {
  position: fixed;
  top: 5rem;
  right: 1.5rem;
  z-index: 20;
  .star {
    background: #0e0e0e;
    margin: 0.5rem 0;
    color: #aaa;
    border-radius: 5px;
    border-bottom: 0.3rem solid darken($comment--header, 25);
    padding: 0.8rem 1rem;
    position: relative;
    @extend %typo-koho;
    @extend %typo-small;
    @extend %flex-start-center;
    i {
      @extend %noselect;
      margin-right: 1rem;
      font-size: 0.8rem;
      color: lighten($comment--header, 35);
    }
    &::before {
      position: absolute;
      content: "";
      bottom: -0.3rem;
      left: 0;
      height: 0.3rem;
      width: 0.5rem;
      background: lighten($comment--header, 25);
      animation-name: progress;
      animation-timing-function: linear;
      animation-duration: 3s;
      animation-fill-mode: both;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
</style>
