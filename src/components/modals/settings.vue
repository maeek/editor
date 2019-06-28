<template>
  <div class="modal" @click="toggleSettings(false)">
    <div class="wrap" @click.stop>
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
      <div class="options"></div>
    </div>
  </div>
</template>

<script>
import compact from "@/components/buttons/button-compact.vue";
import { mapActions } from "vuex";
export default {
  name: "modal",
  components: {
    compact
  },
  data() {
    return {
      filename: ""
    };
  },
  methods: {
    ...mapActions(["toggleSettings", "addFile"])
  },
  mounted() {
    this.$refs.input.focus();
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
  @extend %flex-center;
  @extend %typo-roboto;
  .wrap {
    padding: 0.5rem;
    background: $panel-files-bg;
    @include rectangle(100%, 100%);
    .close {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
    }
    .options {
      margin: 1rem 0 0 0;
      @extend %flex-end-center;
    }
    h3 {
      margin: 0 0 0.7rem 0;
      font-weight: 400;
      color: $panel-top--header;
      @extend %typo-big;
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
}
</style>
