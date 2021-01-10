const authGetters = {
  login: state => state.auth.login,
  signup: state => state.auth.signup,
  token: state => state.auth.token
};

export default authGetters;
