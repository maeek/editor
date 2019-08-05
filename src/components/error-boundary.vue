<script>
export default {
  name: "ErrorBoundary",
  data: () => ({
    error: false
  }),
  errorCaptured(err, vm, info) {
    this.error = [err, vm, info];
  },
  render(h) {
    console.log(this.error);
    return this.error ? h("p", "Ooops") : this.$slots.default[0];
  }
};
</script>
<style lang="scss">
p {
  color: rgb(255, 115, 115);
  @extend %typo-koho;
}
</style>
