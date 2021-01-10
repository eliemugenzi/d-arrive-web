import {
  GET_AGENCIES_FAIL,
  GET_AGENCIES_START,
  GET_AGENCIES_SUCCESS,
  GET_LOCATIONS_FAIL,
  GET_LOCATIONS_START,
  GET_LOCATIONS_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_START,
  GET_USERS_SUCCESS
} from "../../mutationTypes";

const actions = {
  getUsers: async ({ commit }, { ctx }) => {
    commit(GET_USERS_START);
    try {
      ctx.$axios.setHeader(
        "Authorization",
        `JWT ${localStorage.getItem("JWT_TOKEN")}`
      );
      const { data: response } = await ctx.$axios.get("/users");
      commit(GET_USERS_SUCCESS, response.data);
    } catch (error) {
      commit(GET_USERS_FAIL, error.response.data.message);
    }
  },
  getAgencies: async ({ commit }, { ctx }) => {
    commit(GET_AGENCIES_START);
    try {
      ctx.$axios.setHeader(
        "Authorization",
        `JWT ${localStorage.getItem("JWT_TOKEN")}`
      );
      const { data: response } = await ctx.$axios.get("/agencies");
      commit(GET_AGENCIES_SUCCESS, response.data);
    } catch (error) {
      commit(GET_AGENCIES_FAIL, error.response.data.message);
    }
  },
  getLocations: async ({ commit }, { ctx }) => {
    commit(GET_LOCATIONS_START);
    try {
      ctx.$axios.setHeader(
        "Authorization",
        `JWT ${localStorage.getItem("JWT_TOKEN")}`
      );
      const { data: response } = await ctx.$axios.get("/locations");
      commit(GET_LOCATIONS_SUCCESS, response.data);
    } catch (error) {
      commit(GET_LOCATIONS_FAIL, error.response.data.message);
    }
  }
};

export default actions;
