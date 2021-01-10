<template>
  <main class="container">
    <nuxt-link to="/">
      <h3 class="logo">D'Arrive</h3>
    </nuxt-link>
    <a-menu
      mode="horizontal"
      class="menu"
      v-if="Object.keys(currentUser.data).length === 0"
    >
      <a-menu-item key="home" class="menu-item">
        <a-icon type="home" class="menu-icon"></a-icon>
        <nuxt-link to="/">Home</nuxt-link>
      </a-menu-item>
      <a-menu-item key="login" class="menu-item">
        <a-icon type="login" class="menu-icon"></a-icon>
        <nuxt-link to="/login">Log In</nuxt-link>
      </a-menu-item>
    </a-menu>
    <a-menu v-else mode="horizontal" class="menu">
      <a-menu-item key="profile" class="menu-item">
        <a-icon type="user" class="menu-icon"></a-icon>
        <nuxt-link to="/profile">My Profile</nuxt-link>
      </a-menu-item>
    </a-menu>
    <div class="line"></div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import { isEmpty } from "lodash";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "2"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {
    ...mapGetters(["currentUser", "token"])
  },
  mounted() {
    console.log(this.currentUser.data);
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;

  .logo {
    margin-top: 20px;
  }

  .menu-icon {
    float: left;
    margin-top: 15px;
  }

  .menu-item {
    margin-left: 30px;
  }

  .menu {
    margin-left: 50vw;
  }
}
</style>
