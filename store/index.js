import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import getters from "./modules/getters";
import mutations from "./modules/mutations";
import actions from "./modules/actions";

Vue.use(Vuex);

const createStore = () =>
  new Vuex.Store({
    state,
    getters,
    mutations,
    actions
  });

export const store = createStore();

export default createStore;
