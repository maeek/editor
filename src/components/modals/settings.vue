<template>
  <div class="modal" @click="toggleSettings(false)">
    <div class="wrap modal-wrap--full" @click.stop>
      <h3>
        <i class="material-icons">settings</i>
        Settings
      </h3>
      <compact
        :class="'close'"
        :title="'Close'"
        name="Close"
        @click.native="toggleSettings(false)"
      >
        close
      </compact>
      <div class="data">
        <div class="region">
          <h5>Editor</h5>
          <div class="options">
            <optionCheck :key="'scrollPastEnd'">Auto save</optionCheck>
            <optionCheck :key="'lineNums'">Line numbers</optionCheck>
            <optionCheck :key="'lineWrap'">Line wrapping</optionCheck>
            <optionCheck :key="'closeBrackets'">
              Auto close brackets
            </optionCheck>
            <optionCheck :key="'scrollPastEnd'">Scroll past end</optionCheck>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import compact from "@/components/buttons/button-compact.vue";
import optionCheck from "@/components/modals/parts/opt.vue";
import { mapActions } from "vuex";
export default {
  name: "modal",
  components: {
    compact,
    optionCheck
  },
  methods: {
    ...mapActions(["toggleSettings"])
  }
};
</script>

<style scoped lang="scss">

  .wrap {
    padding: 0.5rem;
    background: rgba(41, 41, 41, 0.75);
    position: relative;
    @include rectangle(100%, 100%);
    .data {
      margin: 1rem 0 0 0;
      padding: 1rem;
      flex-wrap: wrap;
      @extend %flex-center-start;
      .region {
        margin: 1rem 3rem;
        flex-direction: column;
        flex: 1 0 auto;
        @extend %flex-start;
        display: inline-flex;
        .options {
          @extend %flex-start;
          margin: 1rem 0 0 0;
          padding: 0 0.5rem;
          width: 450px;
          max-width: 100%;
          max-height: 600px;
          flex-direction: column;
          flex-wrap: wrap;
        }
        h5 {
          color: $comment--header;
        }
      }
    }
    .close {
      position: absolute;
      width: 4.3rem;
      top: 0.5rem;
      right: 0.5rem;
    }

    h3 {
      margin: 0 0 0.7rem 0;
      font-weight: 400;
      color: $panel-top--header;
      @extend %typo-header;
      @extend %flex-start-center;
      i {
        font-size: inherit;
        margin: 0 0.3rem 0 0;
      }
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
@media screen and (max-width: 768px) {
  .modal {
    .wrap {
      .close {
        right: 0.5rem;
        width: auto;
        i {
          margin: 0;
        }
        span {
          display: none;
          width: 1rem !important;
        }
      }
    }
  }
}
</style>
