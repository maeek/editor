<template>
  <div class="lineEdit" contenteditable spellcheck="false"></div>
</template>

<script>
export default {
  name: "lineEdit"
};
</script>

<style scoped lang="scss">
.lineEdit {
  height: auto;
  width: calc(100% - 4.5rem);
  max-width: calc(100% - 4.5rem);
  line-height: 1rem;
  color: #fff;
  padding: 0.5rem;
  outline: none;
  -webkit-user-modify: read-write-plaintext-only;
}
[contenteditable] {
    white-space: nowrap;
    overflow: hidden;
} 
[contenteditable] br, [contenteditable] div {
    display:none;

}
[contenteditable] * {
    display:inline;
    white-space:nowrap;
}

.lineEdit:focus {
  background: #272727;
}
</style>
