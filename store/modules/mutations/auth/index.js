import {
  GET_CURRENT_USER_FAIL,
  GET_CURRENT_USER_START,
  GET_CURRENT_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS
} from "../../mutationTypes";

const authMutations = {
  [LOGIN_START]: state => {
    state.auth.login.loading = true;
    state.auth.login.data = {};
    state.auth.token = null;
    state.auth.login.error = null;
  },
  [LOGIN_SUCCESS]: (state, payload) => {
    state.auth.token = payload.token;
    state.auth.login.loading = false;
    state.auth.login.data = payload;
    state.auth.login.error = null;
    state.user.currentUser.data = payload;
  },
  [LOGIN_FAIL]: (state, payload) => {
    state.auth.login.error = payload;
    state.auth.login.loading = false;
    state.auth.login.data = {};
  },
  [GET_CURRENT_USER_START]: state => {
    state.user.currentUser.loading = true;
    state.user.currentUser.data = {};
    state.user.currentUser.error = null;
  },
  [GET_CURRENT_USER_SUCCESS]: (state, payload) => {
    state.user.currentUser.loading = false;
    state.user.currentUser.data = payload;
    state.user.currentUser.error = null;
  },
  [GET_CURRENT_USER_FAIL]: (state, payload) => {
    state.user.currentUser.loading = false;
    state.user.currentUser.data = {};
    state.user.currentUser.error = payload;
  }
};

export default authMutations;
