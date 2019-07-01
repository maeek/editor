<template>
  <div class="modal modal--fullscreen" @click="showHelpModal(false)">
    <div class="wrap" @click.stop>
      <h3>
        <i class="material-icons">keyboard</i>
        Keybinds
      </h3>
      <compact
        :class="'close'"
        :title="'Close'"
        name="Close"
        @click.native="showHelpModal(false)"
      >
        close
      </compact>
      <div class="data">
        <div class="region">
          <h5>General</h5>
          <div class="binds">
            <helpElement :keys="'Meta-Tab'">Switch tabs</helpElement>
            <helpElement :keys="'Ctrl-S'">Save file</helpElement>
            <helpElement :keys="'Ctrl-R'">Load last save</helpElement>
            <helpElement :keys="'Ctrl-O'">Open file</helpElement>
          </div>
        </div>
        <div class="region">
          <h5>Sublime keymap</h5>
          <div class="binds">
            <helpElement :keys="'Ctrl-H'">Replace text</helpElement>
            <helpElement :keys="'Ctrl-F'">Search in text</helpElement>
            <helpElement :keys="'Ctrl-L'">Select line</helpElement>
            <helpElement :keys="'Ctrl-D'">Select next occurrence</helpElement>
            <helpElement :keys="'Ctrl-Up'">Scroll line up</helpElement>
            <helpElement :keys="'Ctrl-Down'">Scroll line down</helpElement>
            <helpElement :keys="'Ctrl-M'">Go to bracket</helpElement>
            <helpElement :keys="'Ctrl-/'">Comment line</helpElement>
            <helpElement :keys="'Ctrl-J'">Join lines</helpElement>
            <helpElement :keys="'Shift-Ctrl-M'">Select bracket</helpElement>
            <helpElement :keys="'Shift-Tab'">Indent less</helpElement>
            <helpElement :keys="'Shift-Ctrl-K'">Delete line</helpElement>
            <helpElement :keys="'Shift-Ctrl-Enter'">
              Insert line before
            </helpElement>
            <helpElement :keys="'Ctrl-Enter'">Insert line after</helpElement>
            <helpElement :keys="'Alt-Q'">Wrap lines</helpElement>
            <helpElement :keys="'Shift-Ctrl-Up'">Swap line up</helpElement>
            <helpElement :keys="'Shift-Ctrl-Down'">Swap line down</helpElement>
            <helpElement :keys="'Shift-Ctrl-D'">Duplicate line</helpElement>
            <helpElement :keys="'Ctrl-F2'">Toggle bookmark</helpElement>
            <helpElement :keys="'F2'">Next bookmark</helpElement>
            <helpElement :keys="'Shift-F2'">Previous bookmark</helpElement>
            <helpElement :keys="'Alt-F2'">Select bookmark</helpElement>
            <helpElement :keys="'Shift-Ctrl-F2'">Clear bookmarks</helpElement>
            <helpElement :keys="'F9'">Sort lines</helpElement>
            <helpElement :keys="'Shift-Ctrl-['">Fold</helpElement>
            <helpElement :keys="'Shift-Ctrl-]'">Unfold</helpElement>
            <helpElement :keys="'Ctrl-Alt-Up'">
              Add cursor to previous line
            </helpElement>
            <helpElement :keys="'Ctrl-Alt-Down'">
              Add cursor to next line
            </helpElement>
            <helpElement :keys="'Ctrl-K Ctrl-K'">
              Delete line on the right
            </helpElement>
            <helpElement :keys="'Ctrl-K Ctrl-Backspace'">
              Delete line on the left
            </helpElement>
            <helpElement :keys="'Ctrl-K Ctrl-U'">
              Uppercase on cursor
            </helpElement>
            <helpElement :keys="'Ctrl-K Ctrl-L'">
              Downcase on cursor
            </helpElement>
            <helpElement :keys="'Ctrl-K Ctrl-J'">Unfold all</helpElement>
          </div>
        </div>
        <div class="region">
          <h5>Vim keymap</h5>
          <div class="binds">
            <helpElement :keys="':'">Show input</helpElement>
            <helpElement :keys="'Escape OR Ctrl-c OR Ctrl-['">
              Leave insert mode, visual mode, and clear input state
            </helpElement>
            <helpElement :keys="'gg'">Go to top of the file</helpElement>
            <helpElement :keys="'G'">Go to bottom of the file</helpElement>
            <helpElement :keys="'h'">Move cursor left</helpElement>
            <helpElement :keys="'l'">Move cursor left</helpElement>
            <helpElement :keys="'k'">Move cursor up</helpElement>
            <helpElement :keys="'j'">Move cursor down</helpElement>
            <helpElement :keys="'^'">
              Move cursor to first word in line
            </helpElement>
            <helpElement :keys="'$'">
              Move cursor to last word in line
            </helpElement>
            <helpElement :keys="'dd'">Delete line</helpElement>
            <helpElement :keys="'V'">Select line</helpElement>
            <helpElement :keys="'y'">Copy</helpElement>
            <helpElement :keys="'d'">Cut</helpElement>
            <helpElement :keys="'P'">Paste before cursor</helpElement>
            <helpElement :keys="'p'">Paste after cursor</helpElement>
            <helpElement :keys="'~'">To lowercase</helpElement>
            <helpElement :keys="'g~'">To uppercase</helpElement>
            <helpElement :keys="'X'">
              Delete character before cursor
            </helpElement>
            <helpElement :keys="'g~g~'">Switch characters size</helpElement>
            <helpElement :keys="'a'">Insert mode after cursor</helpElement>
            <helpElement :keys="'i'">Insert mode before cursor</helpElement>
            <helpElement :keys="'s'">
              Insert mode at cursor
            </helpElement>
            <helpElement :keys="'A'">
              Insert mode at end of line
            </helpElement>
            <helpElement :keys="'I'">
              Insert mode at start of line
            </helpElement>
            <helpElement :keys="'o'">
              Insert mode after line
            </helpElement>
            <helpElement :keys="'O'">
              Insert mode before line
            </helpElement>
            <helpElement :keys="'u'">
              Undo
            </helpElement>
            <helpElement :keys="':g <text>'">
              Search
            </helpElement>
            <helpElement :keys="'/<text>'">
              Search
            </helpElement>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import compact from "@/components/buttons/button-compact.vue";
import helpElement from "@/components/modals/parts/helpElement.vue";
import { mapActions } from "vuex";
export default {
  name: "modal",
  components: {
    compact,
    helpElement
  },
  methods: {
    ...mapActions(["showHelpModal"])
  }
};
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  @include rectangle(100%, 100%);
  @extend %flex-center;
  @extend %typo-roboto;
  .wrap {
    background: rgba(41, 41, 41, 0.75);
    padding: 0.5rem;
    overflow-y: auto;
    position: relative;
    @include rectangle(100%, 100%);
    .close {
      position: absolute;
      top: 0.5rem;
      right: 4.55rem;
      width: 4.65rem;
    }
    .data {
      margin: 1rem 0 0 0;
      padding: 1rem;
      flex-wrap: wrap;
      @extend %flex-center-start;
      .region {
        margin: 1rem 3rem;
        flex-direction: column;
        flex: 1 0 auto;
        @extend %flex-start;
        display: inline-flex;
        .binds {
          @extend %flex-start;
          flex-direction: column;
          flex-wrap: wrap;
        }
      }
    }
    h3 {
      margin: 0 0 0.7rem 0;
      font-weight: 400;
      color: $panel-top--header;
      @extend %typo-big;
      @extend %flex-start-center;
      i {
        font-size: inherit;
        margin: 0 0.3rem 0 0;
      }
    }
    h5 {
      color: $comment--header;
    }
  }
}
@media screen and (max-width: 768px) {
  .modal {
    .wrap {
      .close {
        right: 1.85rem;
        width: auto;
        i {
          margin: 0;
        }
        span {
          display: none;
          width: 1rem !important;
        }
      }
      .data {
        .region {
          margin: 1rem 0;
          width: 100%;
          .binds {
            max-height: initial;
            flex-wrap: nowrap;
          }
        }
      }
    }
  }
}
</style>
