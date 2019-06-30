<template>
  <div class="modal" @click="newFileModal(false)">
    <div class="wrap" @click.stop>
      <h3>
        <i class="material-icons">note_add</i>
        Create new file
      </h3>
      <input
        ref="input"
        name="newfile"
        v-model="filename"
        placeholder="Type file name, i.e. README.md"
        @keyup="createFileEnter"
      />
      <div class="options">
        <compact
          :title="'Cancel'"
          name="Cancel"
          @click.native="newFileModal(false)"
        >
          close
        </compact>
        <compact :title="'Add file'" name="Add" @click.native="createFile">
          add
        </compact>
      </div>
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
    ...mapActions(["newFileModal", "addFile"]),
    createFile() {
      const name = document.querySelector("input[name='newfile']").value;
      if (name.length > 0) {
        this.addFile({ name: name });
        this.newFileModal(false);
      } else {
        this.$refs.input.focus();
      }
    },
    createFileEnter(e) {
      if (e.code == "Enter") {
        this.createFile();
      } else if (e.code == "Escape") {
        this.newFileModal(false);
      }
    }
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
    max-width: 97%;
    border-radius: 5px;
    padding: 1rem 0.5rem;
    background: $panel-files-bg;
    @include rectangle(500px, auto);
    .options {
      margin: 1rem 0 0 0;
      @extend %flex-end-center;
    }
    h3 {
      margin: 0 0 0.7rem 0;
      font-weight: 400;
      color: $panel-top--header;
      @extend %typo-big;
      @extend %noselect;
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
