<template>
  <div class="bar bar--bottom">
    <div>
      <bottomButton>
        <i
          class="material-icons"
          title="Waiting for save"
          v-if="displayNotSaved"
        >
          lens
        </i>
        {{ saveStatus }}
      </bottomButton>
      <bottomButton @click.native="goToProfile" class="interactive desktop">
        <a>
          <i class="material-icons"> person </i>
          {{ user }}
        </a>
      </bottomButton>
    </div>
    <div>
      <div class="list">
        <ul></ul>
      </div>
      <bottomButton v-if="activeFile">
        {{ activeFileSize }}
      </bottomButton>
      <bottomButton>
        {{ fileMode ? fileMode : "" }}
      </bottomButton>
      <bottomButton>
        {{ lines }}
      </bottomButton>
      <bottomButton class="interactive desktop">
        <a href="https://github.com/maeek/editor">v{{ version }}</a>
      </bottomButton>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import bottomButton from "@/components/buttons/bottom-panel-element.vue";

export default {
  name: "barBottom",
  components: {
    bottomButton,
  },
  computed: {
    ...mapGetters([
      "fileMode",
      "fileLines",
      "fileIsSaved",
      "fileLastSaved",
      "activeFile",
      "activeFileSize",
      "activeFileMediaSize",
      "version",
    ]),
    displayNotSaved() {
      return !this.fileIsSaved() || this.fileIsSaved() === null;
    },
    saveStatus: function () {
      if (this.fileIsSaved())
        return `All saved , last save - ${this.fileLastSaved()}`;
      else if (this.fileIsSaved() == null) return "No file";
      else return "Not saved , last save - " + this.fileLastSaved();
    },
    lines() {
      return `Ln: ${this.fileLines}`;
    },
    user() {
      if (this.$store.getters.fileById(this.$route.params.id))
        return this.$store.getters.fileById(this.$route.params.id).owner;
      else return null;
    },
  },
  methods: {
    goToProfile() {
      let user = this.$store.getters.fileById(this.$route.params.id).owner;
      this.$router.push({
        path: `/user/${user}`,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.bar--bottom {
  flex: 0 0 auto;
  background: $panel-bottom;
  @include rectangle(100%, 1.3rem);
  @extend %flex-btw-end;
  .list {
    display: none;
  }
  div {
    @include rectangle(auto, 100%);
    @extend %flex-start-center;
  }
}
</style>
