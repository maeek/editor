<template>
  <div class="modal" @click="rmFileModal(false)" ref="modal">
    <div class="wrap row" @click.stop v-if="pending">
      <div class="material-icons leading">hourglass_empty</div>
      <div class="wrap">
        <h3>
          Operation pending:
        </h3>
        <p class="pending">Gist ID: {{ removeFileModal.rid }}</p>
        <p
          class="pending"
          v-for="(file, i) in Object.keys(removeFileModal.files)"
          :key="file + i"
        >
          <strong>{{ file }}</strong>
        </p>
        <p class="pending" v-if="typeof pending !== 'boolean'">
          Error {{ pending }}
        </p>
      </div>
    </div>
    <div class="wrap row" @click.stop v-if="!pending">
      <div
        class="material-icons leading close-modal"
        @click="rmFileModal(false)"
      >
        close
      </div>
      <div class="material-icons leading">delete</div>
      <div class="wrap">
        <h3>Remove gist {{ Object.keys(removeFileModal.files)[0] }}</h3>
        <p class="pending">Gist ID: {{ removeFileModal.rid }}</p>
        <p
          class="pending"
          v-for="(file, i) in Object.keys(removeFileModal.files)"
          :key="file + i"
        >
          Removing {{ file }}
        </p>
        <div class="options">
          <button-modal
            :hide="false"
            :title="'Cancel'"
            name="Cancel"
            @click.native="rmFileModal(false)"
          >
            close
          </button-modal>
          <button-modal
            :hide="false"
            :title="'Remove file'"
            name="Remove"
            @click.native="deleteGist(removeFileModal.rid)"
            class="active"
          >
            delete
          </button-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import buttonModal from "@/components/buttons/button-modal.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "removeFile",
  components: {
    buttonModal
  },
  data() {
    return {
      pending: false
    };
  },
  computed: {
    ...mapGetters([
      "tokenType",
      "token",
      "alias",
      "authorized",
      "removeFileModal"
    ])
  },
  methods: {
    ...mapActions(["rmFileModal", "closeById", "updateGists"]),
    deleteGist(id) {
      this.pending = true;
      this.closeById(id);
      let headers = this.authorized
        ? {
            Authorization: `${this.tokenType} ${this.token}`
          }
        : {};
      fetch(`https://api.github.com/gists/${id}`, {
        method: "DELETE",
        headers: headers
      })
        .then(() => {
          this.rmFileModal(false);
          this.pending = false;
          let link = `https://api.github.com/users/${this.alias}/gists`;
          this.updateGists(link);
        })
        .catch(e => {
          this.pending = e;
        });
    },
    esc_close(e) {
      e.code === "Escape" && this.rmFileModal(false);
    }
  },
  mounted() {
    document.addEventListener("keyup", this.esc_close);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.esc_close);
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
      margin-top: 0.2rem;
      border: 2px solid #2d2d2d;
      strong {
        color: #aaa;
        text-decoration: line-through $comment--header;
      }
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
      font-weight: 400;
      width: 100%;
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
