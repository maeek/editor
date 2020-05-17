/*global OAuth*/

const apiKey = require("../../api.key");

export default {
  state: {
    pendingLogin: true,
    loginFailed: false,
    name: null,
    alias: null,
    email: null,
    avatar: null,
    token: null,
    location: null,
    followers: 0,
    following: 0,
    userPublicRepos: 0,
    userPublicGists: 0,
    html_link: null,
    id: null,
    api_key: apiKey,
    tokenType: "Bearer"
  },
  mutations: {
    NAME(state, name) {
      state.name = name;
    },
    ALIAS(state, alias) {
      state.alias = alias;
    },
    EMAIL(state, email) {
      state.email = email;
    },
    AVATAR(state, avatar) {
      state.avatar = avatar;
    },
    USER(state, user) {
      const { name, alias, email, avatar, location } = user;
      state.name = name;
      state.alias = alias;
      state.email = email;
      state.avatar = avatar;
      state.location = location;
      state.followers = user.raw.user.followers;
      state.following = user.raw.user.following;
      state.id = user.raw.user.id;
      state.userPublicGists = user.raw.user.public_gists;
      state.userPublicRepos = user.raw.user.public_repos;
      state.html_link = user.raw.user.html_url;

      window.localStorage.setItem(
        "user",
        JSON.stringify({
          name: name,
          alias: alias,
          avatar: avatar,
          location: location,
          raw: {
            user: {
              followers: user.raw.user.followers,
              following: user.raw.user.following,
              id: user.raw.user.id,
              public_gists: user.raw.user.public_gists,
              public_repos: user.raw.user.public_repos,
              html_url: user.raw.user.html_url
            }
          }
        })
      );
    },
    TOKEN(state, token) {
      const { token_type, access_token } = token;
      state.type = token_type;
      state.token = access_token;
    },
    PENDING_LOGIN(state, status) {
      state.pendingLogin = status;
    }
  },
  actions: {
    async authorize({ commit, dispatch, getters }) {
      try {
        OAuth.initialize(getters.api_key);
        OAuth.popup("github")
          .then(async github => {
            const { access_token, token_type } = github;
            console.log("GH Access token", access_token);
            const res = await github.me();
            await dispatch("userInfo", res);
            window.localStorage.setItem(
              "gh-token",
              JSON.stringify({
                access_token: btoa(github.access_token),
                token_type: github.token_type
              })
            );
            commit("TOKEN", { token_type, access_token });
          })
          .fail(e => {
            console.error(e);
          });
      } catch (e) {
        console.error(e);
      }
    },
    logout({ commit }) {
      commit("TOKEN", { token_type: null, access_token: null });
      commit("NAME", null);
      commit("ALIAS", null);
      commit("EMAIL", null);
      commit("AVATAR", null);
      commit("FILES", []);
      commit("PUBLIC_GISTS", []);
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("gh-token");
    },
    async userInfo({ commit }, api) {
      commit("USER", api);
      console.log(api);
    },
    setPendingLogin({ commit }, status) {
      commit("PENDING_LOGIN", status);
    }
  },
  getters: {
    userObj: state => state,
    pendingLogin: state => state.pendingLogin,
    name: state => state.name,
    alias: state => state.alias,
    email: state => state.email,
    avatar: state => state.avatar,
    token: state => state.token,
    tokenType: state => state.tokenType,
    authorized: state => !!state.token,
    location: state => state.location,
    followers: state => state.followers,
    following: state => state.following,
    userPublicGists: state => state.userPublicGists,
    userPublicRepos: state => state.userPublicRepos,
    profile_link: state => state.html_link,
    id: state => state.id,
    api_key: state => state.api_key
  }
};
