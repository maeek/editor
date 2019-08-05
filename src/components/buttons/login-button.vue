<template>
  <compact
    :hide="hide"
    :title="'Log in'"
    name="Log in with Github"
    @click.native="login"
  >
    <img
      class="svg_logo"
      dragabble="false"
      src="@/assets/icons/github_logo.svg"
    />
  </compact>
</template>

<script>
import compact from "@/components/buttons/button-compact.vue";
import { mapActions } from "vuex";
export default {
  name: "loginButtonCompact",
  components: {
    compact
  },
  props: ["hide"],
  methods: {
    ...mapActions(["authorize"]),
    login() {
      this.authorize();
    }
  }
};
</script>

<style scoped lang="scss">
button {
  .svg_logo {
    transform: scale(0.65);
  }
}
</style>
