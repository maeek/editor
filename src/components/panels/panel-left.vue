<template>
  <div class="panelLeft">
    <h5 class="opened">Opened gists</h5>
    <file
      v-for="file in computedGroups"
      :obj="file"
      @click.native="goTo(file)"
      :key="file"
    >
      <span class="owner">
        {{ fileById(file) ? fileById(file).owner : file }}
      </span>
      <span>/</span>
      <span>
        {{ fileById(file) ? fileById(file).gistFirst : file }}
      </span>
    </file>
  </div>
</template>

<script>
import file from "@/components/buttons/file.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "panelLeft",
  components: {
    file
  },
  data() {
    return {
      groups: []
    };
  },
  computed: {
    ...mapGetters(["authorized", "files", "fileById"]),
    computedGroups() {
      let unique = [];
      this.files.filter(el => {
        if (!unique.includes(el.gistId)) unique.push(el.gistId);
        return el;
      });
      return unique;
    }
  },
  methods: {
    ...mapActions(["closeById"]),
    goTo(file) {
      this.$router.push({
        path: `/edit/${file}`,
        props: {
          focus: this.fileById(file).gistFirst
        },
        query: {
          target: this.fileById(file).gistFirst
        }
      });
    }
  },
  created() {
    let unique = [];
    this.files.filter(el => {
      if (!unique.includes(el.gistId)) unique.push(el.gistId);
      return el;
    });
    this.groups = unique;
  }
};
</script>

<style scoped lang="scss">
.panelLeft {
  width: 290px;
  flex: 0 0 290px;
  height: 100%;
  background: $panel-files-bg;
  @extend %flex-start;
  @extend %typo-koho;
  overflow: hidden auto;
  flex-direction: column;
  padding: 0.5rem 0;
  .file {
    min-height: 2rem;
    height: auto;
    padding: 0.5rem;
    width: 100%;
    border: 0;
    flex-wrap: nowrap;
    span {
      margin: 0 0.1rem;
    }
    .owner {
      color: $panel-top--header;
    }
  }
  .noActive {
    color: darken($comment--header, 5);
    margin: 1rem auto;
  }
}
.opened {
  flex: 0 0 auto;
  color: $comment--header;
  background: #202020;
  padding: 2.3rem 0.6rem 0.8rem 0.6rem;
  margin: 0;
  width: 100%;
}
.panelLeft::-webkit-scrollbar {
  display: block;
  width: 2px;
  height: 2px;
  padding: 5px;
  overflow: auto;
  background-color: #1d1d1d;
}

.panelLeft::-webkit-scrollbar-thumb {
  background: $panel-top--header;
  border: 2px solid #0000;
}
@media screen and (max-width: 768px) {
  .panelLeft {
    width: 100% !important;
    height: auto;
    flex: 0 0 auto;
    flex-direction: row !important;
    overflow: auto hidden;
    flex-wrap: nowrap;
    padding: 0;
    .opened {
      padding: 0.55rem;
      height: 100%;
      width: auto;
    }
    .file {
      width: auto;
      white-space: nowrap;
      border: 1px solid #4a4a4a;
    }
    .noActive {
      color: darken($comment--header, 5);
      margin: 0.45rem auto;
    }
  }
}
</style>
