<template>
  <footer :class="{ wide }">
    <div :class="{ wrapper: true, wide: wide }">
      <div class="column">
        <h3><i class="material-icons">waves</i>{{ version }}</h3>
        <span
          >Do you like Editor? Give it a star on
          <a target="_blank" href="https://github.com/maeek/editor"
            >Github</a
          ></span
        >
        <span>License MIT</span>
      </div>
      <div class="column">
        <slot></slot>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "foot",
  computed: mapGetters(["version"]),
  props: {
    wide: Boolean,
  },
};
</script>

<style scoped lang="scss">
footer {
  width: 100%;
  min-height: 200px;
  padding: 2rem 1rem;
  background: #0e0e0e;
  color: #aaa;
  &.wide {
    // background: #151515;
    .wrapper {
      max-width: 95%;
    }
  }
  @extend %typo-koho;
  .wrapper {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    .column {
      width: 80%;
      @extend %flex-start;
      flex-direction: column;
      &:nth-of-type(2) {
        align-items: flex-end;
        width: 20%;
      }
    }
    span {
      margin: 0.5rem 0;
    }
    a {
      color: $panel-top--header;
      margin-bottom: 1rem;
      text-decoration: underline $comment--header;
    }
    h3 {
      margin: 0 0 1rem 0;
      color: $panel-top--header;
      @extend %typo-medium;
      font-weight: 900;
      @extend %flex-center;
      @extend %noselect;
      i {
        font-size: 1.5rem;
        margin: 0 0.5rem 0 0;
        color: $comment--header;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  footer {
    padding: 1rem;
    height: auto;
    .wrapper {
      justify-content: center;
      align-items: center;
      flex-direction: column-reverse;

      .column {
        width: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        &:nth-of-type(2) {
          flex-direction: row;
        }
      }

      h3 {
        margin: 2rem 0;
        flex-direction: column;
        i {
          margin: 0.5rem 0;
        }
      }
    }
  }
}
</style>
