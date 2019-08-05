<template>
  <div class="modal" @click="newFileModal(false)">
    <div class="wrap" @click.stop v-if="pending">
      <h3>
        <i class="material-icons">hourglass_empty</i>
        Operation pending:
      </h3>
      <p class="pending">
        + Adding {{ filename }}
        {{ $route.params.id ? `to ${$route.params.id}` : `` }}
      </p>
      <p class="pending error" v-if="typeof pending != 'boolean'">
        Error {{ pending }}
      </p>
    </div>
    <div class="wrap" @click.stop v-if="!pending">
      <h3>
        <i class="material-icons">note_add</i>
        Create new gist
      </h3>
      <p class="pending" v-if="$route.params.id">
        + Adding to {{ $route.params.id }}
      </p>
      <input
        ref="input"
        name="newfile"
        v-model="filename"
        placeholder="Type gist name, i.e. README.md"
        @keyup="createFileEnter"
      />
      <div class="options">
        <compact
          :hide="false"
          :title="'Cancel'"
          name="Cancel"
          @click.native="newFileModal(false)"
        >
          close
        </compact>
        <compact
          :hide="false"
          :title="'Add file'"
          name="Add"
          @click.native="createFile"
        >
          add
        </compact>
      </div>
    </div>
  </div>
</template>

<script>
import compact from "@/components/buttons/button-compact.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "modal",
  components: {
    compact
  },
  data() {
    return {
      filename: "",
      pending: false
    };
  },
  computed: {
    ...mapGetters(["tokenType", "token", "authorized", "files"])
  },
  methods: {
    ...mapActions([
      "newFileModal",
      "addFile",
      "newGist",
      "setHeaders",
      "saveFile"
    ]),
    createFile() {
      const name = this.$refs.input.value;
      if (name.length > 0) {
        this.filename = name;
        let headers = this.setHeaders;
        let files = {};
        if (this.$route.params.id) {
          this.files.forEach(el => {
            if (el.gistId == this.$route.params.id) {
              files[el.name] = {
                content: el.data
              };
            }
          });
        }
        files[name] = {
          content: "// Empty"
        };
        // console.log(this.$route.params.id, files);
        this.pending = true;
        this.newGist({
          url: this.$route.params.id
            ? `https://api.github.com/gists/${this.$route.params.id}`
            : "https://api.github.com/gists",
          files: files
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            if (!this.$route.params.id) {
              this.$router.push({
                path: `/edit/${res.id}`
              });
              this.pending = false;
              this.newFileModal(false);
            } else {
              this.getGist(headers);
            }
          })
          .catch(e => {
            this.pending = e;
          });
      } else {
        this.$refs.input.focus();
      }
    },
    getGist(headers) {
      return fetch(`https://api.github.com/gists/${this.$route.params.id}`, {
        headers: headers,
        cache: "no-cache"
      })
        .then(res => res.json())
        .then(ms => {
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
        .catch(e => {
          this.pending = e;
        });
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
  @extend %typo-koho;
  .wrap {
    max-width: 95%;
    border-radius: 5px;
    padding: 1rem 0.5rem;
    background: $panel-files-bg;
    @include rectangle(500px, auto);
    .pending {
      padding: 0.5rem;
      background: #1d1d1d;
      font-family: monospace;
      color: #fff;
      margin: 0;
      border-radius: 4px;
      border: 2px solid #2d2d2d;
      &.error {
        color: lighten(red, 20);
      }
    }
    .options {
      margin: 1rem 0 0 0;
      @extend %flex-end-center;
    }
    h3 {
      margin: 0 0 0.7rem 0;
      font-weight: 400;
      color: $panel-top--header;
      @extend %typo-header;
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
