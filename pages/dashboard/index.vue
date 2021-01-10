<template>
  <main>
    <div class="main-container">
      <h2 class="title">Statistics</h2>

      <div v-if="currentUser.data.role === 'admin'">
        <h3>
          {{ `${currentUser.data.first_name} ${currentUser.data.last_name}` }}
        </h3>
        <h1>Overview</h1>
        <a-row type="flex" justify="space-around">
          <a-col :span="4">
            <h2>Users</h2>
          </a-col>
          <a-col :span="4">
            <h2>Agencies</h2>
          </a-col>
          <a-col :span="4">
            <h2>Locations</h2>
          </a-col>
        </a-row>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["token", "login", "currentUser"])
  },
  beforeMount() {
    const token = localStorage.getItem("JWT_TOKEN");
    if (!token) {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.getCurrentUser({ ctx: this });
    console.log(this.currentUser);
  },
  methods: {
    ...mapActions(["getCurrentUser"])
  }
};
</script>

<style lang="scss" scoped></style>
