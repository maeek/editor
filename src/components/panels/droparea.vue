<template>
  <div class="droparea">
    <span>Drop files here to create new gist</span>
    <i class="material-icons">file_copy</i>
  </div>
</template>

<script>
export default {
  name: "droparea",
};
</script>

<style scoped lang="scss">
.droparea {
  width: 100%;
  background: $panel-top;
  color: $lines-color;
  padding: 1rem 1rem 0;
  @extend %flex-center;
  @extend %typo-koho;
  cursor: copy;
  flex-direction: column;
  i {
    margin: 0.5rem;
    font-size: 3rem;
  }
}
</style>
