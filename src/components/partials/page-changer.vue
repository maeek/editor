<template>
  <div class="wrapHoriz">
    <div
      @click="prev"
      :class="{ prev: true, newPages: pages < 2 }"
      v-if="gistsLength > 0"
    >
      OLDER
    </div>
    <div class="page" v-if="pages > 1">
      {{ pages }}
    </div>
    <div class="next" @click="next" v-if="pages > 1">
      NEWER
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "page-changer",
  props: ["pages", "shwPublic"],
  computed: {
    ...mapGetters(["gistsLength", "queryFailed", "queryActive"])
  },
  methods: {
    ...mapActions(["updateGists"]),
    prev() {
      this.$emit("prev");
    },
    next() {
      this.$emit("next");
    }
  }
};
</script>

<style scoped lang="scss">
.wrapHoriz {
  width: 100%;
  padding-bottom: 2rem;
  @extend %flex-center;
}

.next,
.prev {
  margin: 1rem 0;
  color: #fff;
  @extend %typo-koho;
  @extend %typo-small;
  padding: 0.5rem 1rem;
  background: $compact--button-bg;
  @extend %pointer;
  &.newPages {
    border-radius: 8px;
  }
}
.page {
  background: $lines-bg;
  color: $comment--header;
  @extend %typo-koho;
  padding: 0.5rem 1rem;
}
.next {
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
}
.prev {
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
}
</style>
