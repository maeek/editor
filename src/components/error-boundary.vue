<script>
import failedRequest from "@/components/partials/failed-request.vue";
export default {
  name: "ErrorBoundary",
  data: () => ({
    error: false,
  }),
  errorCaptured(err, vm, info) {
    this.error = [err, vm, info];
  },
  render(h) {
    return this.error
      ? h(failedRequest, {
          props: {
            failed: true,
            message: `${this.error[0]}`,
          },
        })
      : this.$slots.default[0];
  },
};
</script>
<style lang="scss" scoped>
p {
  color: rgb(255, 115, 115);
  padding: 1rem;
  @extend %typo-koho;
  width: 100%;
  @extend %flex-center;
}
</style>
