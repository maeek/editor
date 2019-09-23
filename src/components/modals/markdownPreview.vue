<template>
  <div class="modal" @click="setMarkdown(false)" ref="modal">
    <transition name="scale" mode="out-in">
      <div class="wrap row" @click.stop>
        <div
          class="material-icons leading close-modal"
          @click="setMarkdown(false)"
        >
          close
        </div>
        <div class="wrap in">
          <h3>Preview</h3>
          <VueShowdown class="pre" :markdown="activeFileData" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "markdownPreview",
  computed: {
    ...mapGetters(["activeFileData"])
  },
  methods: {
    ...mapActions(["setMarkdown"])
  }
};
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  @include rectangle(100%, 100%);
  justify-content: flex-start !important;
  align-items: flex-start !important;
  @extend %typo-koho;
  .wrap {
    width: 100%;
    max-height: 100%;
    padding: 1rem;
    &.in {
      width: 100%;
      height: 100%;
      max-width: initial;
      max-height: initial;
      align-items: flex-start;
      margin: auto;
      align-content: flex-start;
    }
    justify-content: flex-start !important;
    align-items: flex-start !important;
    flex-direction: column;
    border-radius: 5px;
    @include rectangle(auto, 100%);
    background: #1d1d1d;
    color: #dadada;
    position: relative;
    .pre {
      width: 100%;
      height: auto;
      margin: auto;
    }
    &.row {
      padding: 0;
      justify-content: flex-start;
      align-content: flex-start;
      align-items: flex-start;
      height: 100%;
      width: 100%;
    }
    .leading {
      font-weight: 400;
      font-size: 2.5rem;
      color: $panel-top--header;
      @extend %noselect;
      padding: 1rem 2rem;
      margin: 0;
      height: 100%;
      @extend %flex-start;
    }
    .close-modal {
      @extend %pointer;
      @extend %noselect;
      position: fixed;
      top: 0.2rem;
      right: 0.5rem;
      padding: 0;
      height: auto;
      color: #aaa;
      z-index: 20;
    }
    h3 {
      margin: 1rem 0 0.7rem 0;
      width: 100%;
      font-weight: 400;
      color: $panel-top--header;
      @extend %typo-header;
      @extend %noselect;
      @extend %flex-start-center;
    }
    input {
      border-radius: 5px;
      margin-top: 1rem;
      padding: 0.6rem 0.8rem;
      color: $file-name-color;
      background: $compact--button-bg;
      @include rectangle("100%", "auto");
      @extend %typo-normal;
    }
  }
}
@media screen and (max-width: 768px) {
  .modal {
    .wrap {
      &.row {
        flex-direction: column;
        align-items: center;
        align-content: center;
      }
      .leading {
        padding: 1.5rem 0;
      }
      .close-modal {
        top: -0.5rem;
      }
      &:not(.row) {
        padding: 2.5rem 1rem;
        max-width: 100%;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
  }
}
</style>
