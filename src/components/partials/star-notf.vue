<template>
  <transition name="scale-w-center">
    <div class="starNotf" v-if="list.length > 0">
      <div
        class="star"
        v-for="(star, i) in list"
        :key="star.id + i"
        @click="list.shift()"
      >
        <i class="material-icons">star</i>
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
  top: 3rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  .star {
    background: $comment--header;
    margin: 0.3rem 0;
    color: darken($comment--header, 25);
    border-radius: 5px;
    border-bottom: 0.3rem solid darken($comment--header, 25);
    padding: 0.2rem 1rem;
    position: relative;
    @extend %typo-koho;
    @extend %typo-small;
    @extend %flex-center;
    i {
      @extend %noselect;
      margin-right: 1rem;
      font-size: 1.5rem;
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
