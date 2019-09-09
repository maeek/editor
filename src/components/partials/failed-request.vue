<template>
  <div v-if="queryFailed || failed" class="failedRequest">
    <img src="@/assets/icons/error.svg" />
    <span>Error</span>
    <span class="message">{{ ms }}</span>
    <span class="link" v-if="queryFailedObj.link">{{
      queryFailedObj.link
    }}</span>
    <span class="authorized" v-if="authorized"
      ><i class="material-icons">lock</i>Authorized request</span
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "failedRequest",
  computed: {
    ...mapGetters(["queryFailedObj", "queryFailed", "authorized"]),
    ms() {
      let ms = this.queryFailedObj.message || this.message;
      ms = ms.toString().replace(/^TypeError:/g, "");
      return ms;
    }
  },
  props: ["failed", "message"]
};
</script>

<style scoped lang="scss">
.failedRequest {
  width: calc(100% - 4rem);
  max-width: 1200px;
  // border-left: 5px solid #2d2d2d;
  color: #f0f0f0;
  padding: 1rem;
  // border-radius: 8px;
  @extend %typo-koho;
  @extend %flex-start;
  flex-direction: column;
  margin: 2rem auto;
  word-break: break-all;
  position: relative;
  i {
    margin: 1rem 0;
    font-size: 2rem;
    color: $comment--header;
  }
  span {
    margin: 0.5rem 0;
  }
  .message {
    padding: 0.5rem 0;
    color: lighten(red, 25);
    border-radius: 5px;
    width: 100%;
  }
  .link {
    font-size: 0.8rem;
    color: #ababab;
  }
  .authorized {
    border-radius: 8px;
    padding: 0.3rem;
    font-size: 0.8rem;
    // background: $compact--button-bg;
    color: #cacaca;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    @extend %flex-center;
    i {
      margin: 0.2rem;
      font-size: inherit;
      color: green;
    }
  }
}
</style>
