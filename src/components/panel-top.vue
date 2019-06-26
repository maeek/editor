<template>
  <nav class="bar bar--top">
    <siteHeader><i class="material-icons">waves</i> NOTE</siteHeader>
    <div class="options">
      <compact :title="'Add file'" name="New file">
        add
      </compact>
      <compact :title="'Open file'" name="Open file">
        file_copy
      </compact>
      <compact :title="'Download file'" name="Download">
        save_alt
      </compact>
      <compact :title="'Enable fullscreen'" name="Enable fullscreen">
        fullscreen
      </compact>
      <compact :title="'Show help'" name="Help">
        help
      </compact>
      <compact :title="'Open settings'" name="Settings">
        settings
      </compact>
    </div>
  </nav>
</template>

<script>
import siteHeader from "@/components/panel-top/header.vue";
import compact from "@/components/panel-top/button-compact.vue";

export default {
  name: "barTop",
  components: {
    compact,
    siteHeader
  }
};
</script>

<style scoped lang="scss">
nav {
  background: $panel-top;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  width: 100%;
  .options {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 0.5rem;
  }
}
</style>
