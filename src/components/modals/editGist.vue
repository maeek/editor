<template>
  <div class="modal" @click="editModal(false)" ref="modal">
    <transition name="scale" mode="out-in">
      <div class="wrap row" @click.stop v-if="pending">
        <div class="material-icons leading">hourglass_empty</div>
        <div class="wrap" @click.stop>
          <h3>Operation pending:</h3>
          <p class="pending">
            +/- Editing {{ filename }}
            {{ $route.params.id ? `to ${$route.params.id}` : `` }}
          </p>
          <p class="pending error" v-if="typeof pending != 'boolean'">
            Error {{ pending }}
          </p>
        </div>
      </div>
      <div class="wrap row" @click.stop v-else>
        <div
          class="material-icons leading close-modal"
          @click="editModal(false)"
        >
          close
        </div>
        <div class="material-icons leading">edit</div>
        <div class="wrap">
          <h3>Edit gist</h3>
          <p class="pending" v-if="$route.params.id">
            +/- Editing {{ $route.params.id }}
          </p>
          <p class="pending" v-if="$route.params.id">+/- {{ editGist }}</p>
          <label>
            <span class="label"
              ><i class="material-icons">edit</i> Filename</span
            >
            <input
              name="editFile"
              placeholder="Type gist name with extension, i.e. README.md"
              :value="editGist"
              ref="newFile"
              @keyup="modifyFileEnter"
            />
            <div class="material-icons clear" @click="clearInput">clear</div>
          </label>
          <div class="options">
            <button-modal
              :hide="false"
              :title="'Cancel'"
              name="Cancel"
              @click.native="editModal(false)"
              class="active secret"
            >
              cancel
            </button-modal>
            <button-modal
              :hide="false"
              :title="'Edit'"
              name="Apply"
              @click.native="modifyGist"
              class="active public"
            >
              done
            </button-modal>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import buttonModal from "@/components/buttons/button-modal.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "modal",
  components: {
    buttonModal,
  },
  data() {
    return {
      filename: "",
      gist: null,
      pending: false,
    };
  },
  computed: {
    ...mapGetters(["tokenType", "token", "authorized", "files", "editGist"]),
  },
  methods: {
    ...mapActions([
      "editModal",
      "addFile",
      "newGist",
      "setHeaders",
      "saveFile",
      "patchGist",
    ]),
    ...mapMutations(["CHANGE_NAME", "GIST_FIRST"]),
    modifyGist() {
      const id = this.$route.params.id;
      const files = {};
      const oldFilename = this.editGist;
      const newFilename = this.$refs.newFile.value;
      if (newFilename.length > 0) {
        files[oldFilename] = {
          filename: newFilename,
        };
        this.pending = true;
        this.patchGist({
          id,
          files,
          public: this.gist.public,
        }).then(() => {
          this.CHANGE_NAME({ name: oldFilename, newName: newFilename });
          this.GIST_FIRST(newFilename);
          this.$router.replace({
            path: `/edit/${this.$route.params.id || ""}`,
            query: {
              target: newFilename,
            },
          });
          this.pending = false;
          this.editModal(false);
        });
      }
    },
    clearInput() {
      this.$refs.newFile.value = "";
    },
    async getGist(headers) {
      return fetch(`https://api.github.com/gists/${this.$route.params.id}`, {
        headers: await headers,
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then((ms) => {
          if (!ms.message) {
            return ms;
          } else {
            this.pending = ms.message;
            return null;
          }
        })
        .catch((e) => {
          this.pending = e;
        });
    },
    modifyFileEnter(e) {
      if (e.code == "Enter") {
        this.modifyGist();
      } else if (e.code == "Escape") {
        this.editModal(false);
      }
    },
    esc_close(e) {
      e.code === "Escape" && this.editModal(false);
    },
  },
  mounted() {
    this.$refs.modal.addEventListener("keyup", this.esc_close);
    this.getGist(this.setHeaders()).then((data) => {
      this.gist = data;
    });
  },
  beforeDestroy() {
    this.$refs.modal.removeEventListener("keyup", this.esc_close);
  },
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
    label {
      position: relative;
      width: 100%;
      .clear {
        position: absolute;
        right: 0.3rem;
        bottom: 0.15rem;
        font-size: 2rem;
        color: #6e6e6e;
        @extend %pointer;
        @extend %noselect;
      }
      span {
        display: block;
        margin: 1rem 0 0 0;
        color: $file-name-color;
        font-size: 0.8rem;
      }
    }
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
      margin-top: 0.4rem;
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
