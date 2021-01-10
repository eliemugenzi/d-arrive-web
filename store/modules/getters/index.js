import authGetters from "./auth";
import userGetters from "./user";
export default {
  ...authGetters,
  ...userGetters
};
