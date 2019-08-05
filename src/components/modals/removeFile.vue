<template>
  <div class="modal" @click="rmFileModal(false)">
    <div class="wrap" @click.stop v-if="pending">
      <h3>
        <i class="material-icons">hourglass_empty</i>
        Operation pending:
      </h3>
      <p class="pending">- Removing {{ removeFileModal.rid }}</p>
      <p class="pending" v-if="typeof pending !== 'boolean'">
        Error {{ pending }}
      </p>
    </div>
    <div class="wrap" @click.stop v-if="!pending">
      <h3>
        <i class="material-icons">delete</i>
        Remove gist {{ Object.keys(removeFileModal.files)[0] }}
      </h3>
      <p class="pending">Gist ID: {{ removeFileModal.rid }}</p>
      <p
        class="pending"
        v-for="(file, i) in Object.keys(removeFileModal.files)"
        :key="file + i"
      >
        - Removing {{ file }}
      </p>
      <div class="options">
        <compact
          :hide="false"
          :title="'Cancel'"
          name="Cancel"
          @click.native="rmFileModal(false)"
        >
          close
        </compact>
        <compact
          :hide="false"
          :title="'Remove file'"
          name="Remove"
          @click.native="deleteGist(removeFileModal.rid)"
        >
          delete
        </compact>
      </div>
    </div>
  </div>
</template>

<script>
import compact from "@/components/buttons/button-compact.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "removeFile",
  components: {
    compact
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
    }
  },
  mounted() {
    console.log(this.removeFileModal);
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
