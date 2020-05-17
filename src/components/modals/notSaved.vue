<template>
  <div class="modal" @click="setNotSaved(false)" ref="modal">
    <transition name="scale" mode="out-in">
      <div class="wrap row" @click.stop>
        <div class="material-icons leading">hourglass_empty</div>
        <div class="wrap" @click.stop>
          <h3>
            You have unsaved changes!
          </h3>
          <p class="pending">- {{ activeFile }}</p>
          <div class="options">
            <button-modal
              :hide="false"
              :title="'Go back'"
              name="Back to file"
              @click.native="setNotSaved(false)"
              class="active public"
            >
              arrow_back
            </button-modal>
            <button-modal
              :hide="false"
              :title="'Leave without saving'"
              name="Leave without saving"
              @click.native="proceed"
              class="active secret"
            >
              exit_to_app
            </button-modal>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import buttonModal from "@/components/buttons/button-modal.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "modal",
  components: {
    buttonModal
  },
  data() {
    return {
      filename: "",
      pending: false
    };
  },
  computed: {
    ...mapGetters([
      "tokenType",
      "token",
      "authorized",
      "activeFile",
      "showNotSaved",
      "files"
    ])
  },
  methods: {
    ...mapActions([
      "newFileModal",
      "addFile",
      "newGist",
      "setHeaders",
      "saveFile",
      "setNotSaved"
    ]),
    proceed() {
      this.$store.dispatch("activeFileData", this.$store.getters.fileData());
      this.$router.push(this.showNotSaved);
    }
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
  @extend %typo-koho;
  .wrap {
    max-width: 95%;
    @extend %flex-center;
    flex-direction: column;
    border-radius: 5px;
    @include rectangle(600px, 100%);
    background: #1d1d1d;
    max-width: 95%;
    position: relative;
    &.row {
      padding: 0;
      flex-direction: row;
      justify-content: center;
      align-content: flex-start;
      align-items: flex-start;
      height: auto;
    }
    &:not(.row) {
      padding: 2.5rem 1rem;
      background: $panel-files-bg;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
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
      position: absolute;
      top: 0.2rem;
      right: 0.5rem;
      padding: 0;
      height: auto;
      color: #aaa;
      z-index: 20;
    }
    .pending {
      padding: 0.5rem;
      width: 100%;
      background: #1d1d1d;
      font-family: monospace;
      color: #fff;
      margin: 0;
      border-radius: 4px;
      margin-top: 1rem;
      border: 2px solid #2d2d2d;
      @extend %flex-start-center;
      &.error {
        color: lighten(red, 20);
      }
    }
    .options {
      margin: 2rem 0 0 0;
      width: 100%;
      @extend %flex-end;
      align-items: stretch;
    }
    h3 {
      margin: 0 0 0.7rem 0;
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
