<template>
  <div class="greeter" ref="greet">
    <h3 class="welcome">
      <i class="material-icons">waves</i>
      <span class="ver">v{{ version }}</span>
      EDITOR
    </h3>
    <img src="@/assets/icons/code.svg" />
    <div class="wrapper">
      <login-compact
        title="Log in"
        name="Log in with Github"
        v-if="!authorized"
        class="login"
        :hide="false"
      />
      <compact
        @click.native="$router.push({ path: '/edit/' })"
        title="Log in"
        :hide="false"
        class="login"
        name="Start editing"
        >edit</compact
      >
    </div>
    <p>
      Easily create, edit and delete
      <a href="https://gist.github.com/">gists</a>
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import loginCompact from "@/components/buttons/login-button.vue";
import compact from "@/components/buttons/button-compact.vue";

export default {
  name: "landingGreeter",
  components: {
    compact,
    loginCompact
  },
  computed: mapGetters(["version", "authorized"]),
  mounted() {
    this.$refs.greet.style.opacity = 1;
  }
};
</script>

<style scoped lang="scss">
.greeter {
  width: 100%;
  min-height: 55%;
  opacity: 0;
  transition: opacity 1s;
  flex: 0 0 auto;
  height: auto;
  padding: 0 0 1rem 0;
  // background-color: #1f1f1f;
  @extend %typo-koho;
  @extend %flex-start-center;
  flex-direction: column;
  background-image: url("../../assets/dot.svg");
  h3 {
    margin: 2rem 0;
    color: $panel-top--header;
    @extend %typo-big;
    font-weight: 900;
    @extend %flex-center;
    flex-direction: column;
    @extend %noselect;
    i {
      font-size: 3rem;
      color: $comment--header;
    }
    .ver {
      @extend %typo-tiny;
      color: #ababab;
    }
  }
  p {
    color: #ababab;
    flex: 0 0 auto;
    padding: 1rem 0;
  }
  a {
    font-weight: 400;
    color: $panel-top--header;
    text-decoration: none;
  }
  img {
    margin: 1rem 0;
    width: 700px;
    max-width: 95%;
    @extend %noselect;
  }
  .wrapper {
    @extend %flex-center;
    align-items: stretch;
  }
  button {
    padding: 1rem 2rem;
    margin: 0.5rem;
    height: auto;
    font-weight: 900;
  }
}
@media screen and (max-width: 768px) {
  .greeter {
    background-size: 41px 41px;
    h3 {
      margin: 1rem 0;
    }
    button {
      padding: 0.5rem 1rem;
      margin: 0.5rem;
    }
  }
}
</style>
