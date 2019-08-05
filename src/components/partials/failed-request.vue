<template>
  <div v-if="queryFailed" class="failedRequest">
    <i class="material-icons">error</i>
    <span>Error</span>
    <span class="message">{{ queryFailedObj.message }}</span>
    <span class="link" v-if="queryFailedObj.link">{{
      queryFailedObj.link
    }}</span>
    <span class="authorized" v-if="queryFailedObj.authorized"
      ><i class="material-icons">lock</i>Authorized</span
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "failedRequest",
  computed: mapGetters(["queryFailedObj", "queryFailed"])
};
</script>

<style scoped lang="scss">
.failedRequest {
  width: calc(100% - 4rem);
  border: 3px solid #2d2d2d;
  color: #f0f0f0;
  padding: 1rem;
  border-radius: 8px;
  margin: 2rem;
  @extend %typo-koho;
  @extend %flex-start;
  flex-direction: column;
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
    background: $compact--button-bg;
    color: #cacaca;
    @extend %flex-center-end;
    i {
      margin: 0.2rem;
      font-size: inherit;
      color: green;
    }
  }
}
</style>
