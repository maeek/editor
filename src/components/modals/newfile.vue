<template>
  <div class="modal" @click="newFileModal(false)" ref="modal">
    <transition name="scale" mode="out-in">
      <div class="wrap row" @click.stop v-if="pending">
        <div class="material-icons leading">hourglass_empty</div>
        <div class="wrap" @click.stop>
          <h3>Operation pending:</h3>
          <p class="pending">
            + Adding {{ filename }}
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
          @click="newFileModal(false)"
        >
          close
        </div>
        <div class="material-icons leading">note_add</div>
        <div class="wrap">
          <h3>Create new gist</h3>
          <p class="pending" v-if="$route.params.id">
            + Adding to {{ $route.params.id }}
          </p>
          <input
            ref="input"
            name="newfile"
            v-model="filename"
            placeholder="Type gist name with extension, i.e. README.md"
            @keyup="createFileEnter"
          />
          <div class="options">
            <button-modal
              :hide="false"
              :title="'Create secret gist'"
              name="Create secret gist"
              @click.native="createFile(false)"
              class="active secret"
            >
              add
            </button-modal>
            <button-modal
              :hide="false"
              :title="'Create public gist'"
              name="Create public gist"
              @click.native="createFile(true)"
              class="active public"
            >
              all_inclusive
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
    buttonModal,
  },
  data() {
    return {
      filename: "",
      pending: false,
    };
  },
  computed: {
    ...mapGetters(["tokenType", "token", "authorized", "files"]),
  },
  methods: {
    ...mapActions([
      "newFileModal",
      "addFile",
      "newGist",
      "setHeaders",
      "saveFile",
    ]),
    createFile(pb) {
      const name = this.$refs.input.value;
      if (name.length > 0) {
        this.filename = name;
        let headers = this.setHeaders;
        let files = {};
        if (this.$route.params.id) {
          this.files.forEach((el) => {
            if (el.gistId == this.$route.params.id) {
              files[el.name] = {
                content: el.data,
              };
            }
          });
        }
        files[name] = {
          content: "// Empty",
        };
        // console.log(this.$route.params.id, files);
        this.pending = true;
        this.newGist({
          url: this.$route.params.id
            ? `https://api.github.com/gists/${this.$route.params.id}`
            : "https://api.github.com/gists",
          files: files,
          public: pb,
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (!this.$route.params.id) {
              this.$router.push({
                path: `/edit/${res.id}`,
              });
              this.pending = false;
              this.newFileModal(false);
            } else {
              this.getGist(headers);
            }
          })
          .catch((e) => {
            this.pending = e;
          });
      } else {
        this.$refs.input.focus();
      }
    },
    getGist(headers) {
      return fetch(`https://api.github.com/gists/${this.$route.params.id}`, {
        headers: headers,
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then((ms) => {
          if (!ms.message) {
            console.log(ms);
            this.addFile(ms);
            this.pending = false;
            this.newFileModal(false);
            this.$store.commit("ACTIVE_FILE", Object.keys(ms.files)[0]);
          } else {
            this.pending = ms.message;
          }
        })
        .catch((e) => {
          this.pending = e;
        });
    },
    createFileEnter(e) {
      if (e.code == "Enter") {
        this.createFile(false);
      } else if (e.code == "Escape") {
        this.newFileModal(false);
      }
    },
    esc_close(e) {
      e.code === "Escape" && this.newFileModal(false);
    },
  },
  mounted() {
    this.$refs.input.focus();
    this.$refs.modal.addEventListener("keyup", this.esc_close);
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
