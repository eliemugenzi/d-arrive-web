import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_START,
  GET_CURRENT_USER_START,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAIL
} from "../../mutationTypes";

const authActions = {
  handleSignIn: async ({ commit }, { data, ctx }) => {
    commit(LOGIN_START);
    try {
      const { data: response } = await ctx.$axios.post("/auth/login", {
        ...data
      });
      console.log("DATA", response.data);
      commit(LOGIN_SUCCESS, response.data);
      ctx.$router.push("/dashboard");
    } catch (error) {
      commit(LOGIN_FAIL, error.response.data.message);
      console.log(error.response.data);
    }
  },
  getCurrentUser: async ({ commit }, { ctx }) => {
    commit(GET_CURRENT_USER_START);
    try {
      ctx.$axios.setHeader(
        "Authorization",
        `JWT ${localStorage.getItem("JWT_TOKEN")}`
      );
      const { data: response } = await ctx.$axios.get("/users/current_user");
      console.log("CURRENT USER", response.data);
      commit(GET_CURRENT_USER_SUCCESS, response.data);
    } catch (error) {
      console.log(error.response.data);
      commit(GET_CURRENT_USER_FAIL, error.response.data.message);
    }
  }
};

export default authActions;
