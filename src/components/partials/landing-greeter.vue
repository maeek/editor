<template>
  <div class="greeter" ref="greet">
    <img src="@/assets/icons/code.svg" />
    <p>
      Manage your <a href="https://gist.github.com/">gists</a> easily with
      Editor
    </p>
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
  padding: 0 0 2.1rem 0;
  @extend %typo-koho;
  @extend %flex-start-center;
  flex-direction: column;
  background-image: url("../../assets/dot.svg");
  h3 {
    margin: 0.5rem 0;
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
    @extend %typo-medium;
    padding: 0.5rem 0;
    font-weight: 900;
  }
  a {
    color: $panel-top--header;
    text-decoration: none;
    margin: 0 0.3rem;
  }
  img {
    margin: 0.5rem 0;
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
    padding: 0 0 1rem 0;
    justify-content: center;
    min-height: 40%;
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
