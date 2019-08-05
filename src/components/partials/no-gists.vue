<template>
  <div class="noGists">
    <span class="face">{{ face }}</span>
    <span>NO GISTS</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import faces from "@/assets/faces.js";
export default {
  name: "no-gists",
  computed: {
    ...mapGetters(["gistsLength", "queryFailed", "queryActive"]),
    face() {
      return faces.list[Math.floor(Math.random() * faces.list.length)];
    }
  }
};
</script>

<style scoped lang="scss">
.noGists {
  margin: 2rem auto;
  padding: 1rem;
  @extend %flex-center;
  @extend %typo-koho;
  color: $lines-color;
  border-radius: 4px;
  flex-direction: column;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  .face {
    margin: 2rem 1rem;
    font-size: 5rem;
    color: darken($comment--header, 5);
  }
}
@media screen and (max-width: 768px) {
  .editor {
    .noGists {
      width: 100%;
      margin: 0;
      .face {
        width: 100%;
        text-align: center;
        font-size: 1.5rem;
        margin: 1rem 0;
      }
    }
  }
}
</style>
