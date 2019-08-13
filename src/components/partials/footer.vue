<template>
  <footer>
    <div class="wrapper">
      <div class="column">
        <h3><i class="material-icons">waves</i></h3>
      </div>
      <div class="column">
        <a href="https://gist.github.com/">Gists page</a>
        <a href="https://github.com/maeek/editor">Project on github</a>
        <span>License MIT</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "foot"
};
</script>

<style scoped lang="scss">
footer {
  width: 100%;
  min-height: 200px;
  padding: 2rem 1rem;
  background: #0e0e0e;
  color: #aaa;
  @extend %typo-koho;
  .wrapper {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    .column {
      width: 50%;
      @extend %flex-start;
      flex-direction: column;
    }
    a {
      color: $panel-top--header;
      margin-bottom: 1rem;
      text-decoration: underline $comment--header;
    }
    h3 {
      margin: 0 0 1rem 0;
      color: $panel-top--header;
      @extend %typo-medium;
      font-weight: 900;
      @extend %flex-center;
      @extend %noselect;
      i {
        font-size: 1.5rem;
        margin: 0 0.5rem 0 0;
        color: $comment--header;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  footer {
    padding: 1rem;
    .wrapper {
      justify-content: center;
      align-items: center;
      flex-direction: column-reverse;

      .column {
        width: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      h3 {
        margin: 2rem 0;
      }
    }
  }
}
</style>
