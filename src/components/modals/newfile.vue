<template>
  <div class="modal" @click="closeModal">
    <div class="wrap" @click.stop>
      <h3>
        <i class="material-icons">insert_drive_file</i>
        Create new file
      </h3>
      <input name="newfile" v-model="filename" placeholder="Type file name" />
      <div class="options">
        <compact :title="'Cancel'" name="Cancel" @click.native="closeModal">
          close
        </compact>
        <compact :title="'Add file'" name="Add">
          add
        </compact>
      </div>
    </div>
  </div>
</template>

<script>
import compact from "@/components/panel-top/button-compact.vue";
import { mapActions } from "vuex";
export default {
  name: "modal",
  components: {
    compact
  },
  methods: {
    ...mapActions(["newFileModal"]),
    closeModal() {
      this.newFileModal(false);
    }
  },
  data() {
    return {
      filename: ""
    };
  }
};
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
  @extend %flex-center;
  @extend %typo-roboto;
  .wrap {
    max-width: 97%;
    width: 500px;
    height: auto;
    padding: 1rem 0.5rem;
    background: $panel-files-bg;
    border-radius: 5px;
    .options {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin: 1rem 0 0 0;
    }
    h3 {
      @extend %typo-big;
      @extend %flex-center;
      justify-content: flex-start;
      margin: 0 0 0.7rem 0;
      color: $panel-top--header;
      font-weight: 400;
      i {
        font-size: inherit;
        margin: 0 0.3rem 0 0;
      }
    }
    input {
      border-radius: 5px;
      width: 100%;
      background: $compact--button-bg;
      outline: none;
      border: 0;
      color: $file-name-color;
      margin-top: 1rem;
      padding: 0.6rem 0.8rem;
      @extend %typo-normal;
    }
  }
}
</style>
