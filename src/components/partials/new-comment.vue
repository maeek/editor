<template>
  <div class="new-comment">
    <div class="label">
      <span :class="{ active: selected === 0 }" @click="selected = 0"
        >Write</span
      >
      <span :class="{ active: selected === 1 }" @click="selected = 1"
        >Preview</span
      >
    </div>
    <textarea
      v-if="selected === 0"
      v-model="textComment"
      ref="textarea"
      placeholder="Aa"
    ></textarea>
    <VueShowdown v-if="selected === 1" class="pre" :markdown="textComment" />
    <compact
      title="Comment"
      name="Comment"
      :hide="false"
      @click.native="createComment"
    >
      add_comment
    </compact>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import showdown from "showdown";
// import footerComponent from "@/components/partials/footer.vue";

import compact from "@/components/buttons/button-compact.vue";

export default {
  name: "newComment",
  computed: {
    ...mapGetters(["comments", "commentsList"])
  },
  data() {
    return {
      textComment: "",
      selected: 0
    };
  },
  components: {
    compact
  },
  methods: {
    ...mapActions(["setRevisions", "setComments"]),
    text(text) {
      const converter = new showdown.Converter(),
        html = converter.makeHtml(text);
      return html;
    },
    createComment() {
      this.$emit("create", this.textComment);
    }
  }
};
</script>

<style scoped lang="scss">
.new-comment {
  width: calc(100% - 1rem);
  max-width: calc(900px - 1rem);
  @extend %flex-start-end;
  @extend %typo-koho;
  @extend %noselect;
  // background-image: url("../../assets/dot.svg");
  background-color: #141414;
  border-radius: 4px;
  margin: 0 1rem 1rem;
  box-shadow: 0 1px 3px rgba(17, 17, 17, 0.664);
  flex-direction: column;
  padding: 0 0.7rem;
  .label {
    width: 100%;
    padding: 0.5rem 0;
    color: #ababab;
    padding: 1rem 0.3rem;
    span {
      margin: 0 1rem 0 0;
      @extend %pointer;
      &.active {
        color: $comment--header;
      }
    }
  }
  .pre {
    width: 100%;
    min-height: 90px;
    color: #ccc;
  }
  textarea {
    width: 100%;
    border: 0;
    background-color: #222222;
    border-radius: 4px;
    min-height: 90px;
    font-family: monospace;
    padding: 0.5rem;
    resize: vertical;
    color: #fff;
    outline-color: $comment--header;
  }
  button {
    margin: 1rem 0;
    border: 1px solid $panel-top--header;
  }
}
</style>
