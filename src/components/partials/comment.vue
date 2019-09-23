<template>
  <li>
    <div class="user">
      <img
        :src="com.user.avatar_url"
        :alt="com.user.login + 'avatar'"
        aria-hidden="true"
      />
      <div class="comment-info">
        <div>
          <span class="name">{{ com.user.login }}</span>
          <div class="row">
            <span class="indicator" v-if="com.author_association === 'OWNER'">
              AUTHOR
            </span>
            <span class="indicator" v-if="com.author_association">
              {{ com.author_association }}
            </span>
          </div>
        </div>
        <div class="column">
          <span class="id">{{ com.updated_at }}</span>
          <span class="id"># {{ com.id }}</span>
          <div class="buttons">
            <compact
              title="Edit"
              name="Edit"
              :hide="false"
              v-if="alias === com.user.login"
              @click.native="showEdits = !showEdits"
            >
              edit
            </compact>
            <compact
              title="Delete"
              name="Delete"
              :hide="false"
              v-if="alias === com.user.login"
              @click.native="removeComment(com.id)"
            >
              delete
            </compact>
          </div>
        </div>
      </div>
    </div>
    <span class="pre-body">Said:</span>
    <div class="label" v-if="showEdits">
      <span :class="{ active: edit }" @click="edit = true">Write</span>
      <span :class="{ active: !edit }" @click="edit = false">Preview</span>
    </div>
    <VueShowdown class="pre" v-if="!edit || !showEdits" :markdown="body" />
    <div class="edit" v-if="showEdits">
      <textarea
        v-if="edit"
        v-model="body"
        ref="textarea"
        placeholder="Aa"
      ></textarea>
      <compact
        title="Save"
        name="Save"
        :hide="false"
        class="save"
        v-if="showEdits"
        @click.native="editComment"
      >
        save
      </compact>
    </div>
  </li>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import compact from "@/components/buttons/button-compact.vue";

export default {
  name: "comment",
  computed: {
    ...mapGetters(["alias", "comments", "commentsList"])
  },
  components: {
    compact
  },
  data() {
    return {
      edit: false,
      showEdits: false,
      body: this.com.body
    };
  },
  props: ["com"],
  methods: {
    ...mapActions(["setRevisions", "setComments"]),
    removeComment(id) {
      this.$emit("delete", id);
    },
    editComment() {
      this.$emit("edit", {
        id: this.com.id,
        body: this.body
      });
    },
    closeRevs() {
      this.setComments(false);
      this.scrolled = false;
    }
  }
};
</script>

<style scoped lang="scss">
li {
  @extend %flex-start;
  flex-direction: column;
  border-bottom: 3px solid #444;
  padding: 0.1rem 0.4rem;
  margin: 1rem 0;
  background: #111111;
  border-radius: 4px;
  transition: 0.4s;
  position: relative;
  box-shadow: 0 1px 3px rgba(17, 17, 17, 0.664);
  .save {
    align-self: flex-end;
    margin: 0.5rem 0;
    border: 1px solid $panel-top--header;
  }
  .label {
    width: 100%;
    padding: 0.5rem 0;
    color: #ababab;
    padding: 1rem 0.3rem;
    span {
      margin: 0 1rem 0 0;
      @extend %pointer;
      &.active {
        color: $comment--header;
      }
    }
  }
  .edit {
    width: 100%;
    @extend %flex-end;
    flex-direction: column;
  }
  .row {
    @extend %flex-start;
    margin-top: 0.3rem;
  }
  .column {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    flex-direction: column;
  }
  .buttons {
    @extend %flex-start;
  }
  .pre-body {
    display: block;
    width: 100%;
    font-size: 0.7rem;
    margin: 1rem 0 0.5rem 0.5rem;
  }
  .user {
    @extend %flex-start;
    width: 100%;
    padding: 0.5rem 0.3rem;

    .comment-info {
      @extend %flex-btw-start;
      @extend %noselect;
      flex: 1 0 auto;
    }
    .id {
      white-space: nowrap;
      font-size: 0.7rem;
      color: #9a9a9a;
    }
    .name {
      padding: 0 0.5rem;
      font-size: 1rem;
      @extend %flex-btw-start;
      width: 100%;
    }
    img {
      max-width: 48px;
    }
    .indicator {
      font-size: 0.6rem;
      margin: 0.3rem 0.1rem 0.3rem 0.3rem;
      padding: 0.5rem 0.3rem;
      border-radius: 4px;
      text-align: center;
      color: $comment--header;
      background: #1d1d1d;
      display: block;
    }
  }
  textarea {
    width: 100%;
    border: 0;
    background-color: #222222;
    border-radius: 4px;
    min-height: 90px;
    font-family: monospace;
    padding: 0.5rem;
    margin: 0.5rem 0;
    resize: vertical;
    color: #fff;
    outline-color: $comment--header;
  }
  .pre {
    background-color: #151515;
    border: 0;
    width: 100%;
    min-height: 60px;
    padding: 0.3rem 1rem;
    margin: 0.3rem 0;
    border-radius: 4px;
  }
}
</style>
