<template>
  <div class="modal" @click="toggleSettings(false)">
    <div class="wrap modal-wrap--full" @click.stop>
      <h3>
        <i class="material-icons">settings</i>
        Settings
      </h3>
      <compact
        :class="'close'"
        :title="'Close'"
        name="Close"
        @click.native="toggleSettings(false)"
      >
        close
      </compact>
      <div class="data">
        <div class="region">
          <h5>Editor</h5>
          <div class="options">
            <optionCheck :key="'autoSave'" :checked="false">
              Auto save
            </optionCheck>
            <optionCheck
              :key="'lineNums'"
              :checked="lineNumbers"
              @input.native="setLineNumbers(!lineNumbers)"
            >
              Line numbers
            </optionCheck>
            <optionCheck
              :key="'lineWrap'"
              :checked="lineWrap"
              @input.native="setLineWrap(!lineWrap)"
            >
              Line wrapping
            </optionCheck>
            <optionCheck
              :key="'smartIndent'"
              :checked="smartIndent"
              @input.native="setSmartIndent(!smartIndent)"
            >
              Smart indent
            </optionCheck>
            <optionCheck
              :key="'closeBrackets'"
              :checked="autoClose"
              @input.native="setAutoClose(!autoClose)"
            >
              Auto close brackets
            </optionCheck>
            <optionCheck
              :key="'scrollPastEnd'"
              :checked="scrollPastEnd"
              @input.native="setScrollPast(!scrollPastEnd)"
            >
              Scroll past end
            </optionCheck>
            <selectList
              ref="keyMap"
              :key="'keyMap'"
              :show="showList1"
              :activeOpt="keyMap"
              :optList="keyMaps"
              @click.native="shList1(!showList1)"
            >
              Select keyMap
            </selectList>
            <number>Tab size</number>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import compact from "@/components/buttons/button-compact.vue";
import optionCheck from "@/components/modals/parts/opt.vue";
import selectList from "@/components/modals/parts/selectList.vue";
import number from "@/components/modals/parts/number.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "modal",
  components: {
    compact,
    optionCheck,
    selectList,
    number
  },
  data() {
    return {
      showList1: false
    };
  },
  computed: {
    ...mapGetters([
      "keyMaps",
      "keyMap",
      "autoClose",
      "scrollPastEnd",
      "smartIndent",
      "lineWrap",
      "lineNumbers"
    ])
  },
  methods: {
    ...mapActions([
      "toggleSettings",
      "setAutoClose",
      "setSmartIndent",
      "setLineNumbers",
      "setScrollPast",
      "setLineWrap",
      "setTabSize"
    ]),
    shList1(val) {
      this.showList1 = val;
    }
  }
};
</script>

<style scoped lang="scss">
.close {
  position: absolute;
  width: 4.3rem;
  top: 0.5rem;
  right: 0.5rem;
}
.modal {
  .wrap {
    .data {
      max-width: 100%;
      margin: 0 auto;
      width: 800px;
      @extend %flex-center;
      .region {
        .options {
          width: 100%;
          margin: 0 auto;
        }
      }
    }
  }
}
input {
  border-radius: 5px;
  margin-top: 1rem;
  padding: 0.6rem 0.8rem;
  color: $file-name-color;
  background: $compact--button-bg;
  @include rectangle("100%", "auto");
  @extend %typo-normal;
}
@media screen and (max-width: 768px) {
  .modal {
    .wrap {
      .close {
        right: 0.5rem;
        width: auto;
        i {
          margin: 0;
        }
        span {
          display: none;
          width: 1rem !important;
        }
      }
    }
  }
}
</style>
