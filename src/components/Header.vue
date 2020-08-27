<template>
  <header>
    <h3>Header</h3>
    <router-link v-bind:to="'/'">Home</router-link>
    <router-link v-bind:to="'/about'">About</router-link>
    <a v-if="loggedIn === 'yes'" @click.prevent="setLoggedOut" href>Log Out</a>
    <router-link v-else v-bind:to="'/login'">Log In</router-link>
    <router-link v-bind:to="'/register'">Register</router-link>
    <h5 v-if="loggedIn === 'yes'">Hello: {{userEmail}}</h5>
  </header>
</template>

<script>
import EventBus from "../eventBus";
export default {
  name: "MyHeader",
  data: function () {
    return {
      loggedIn: "no",
      userEmail: "",
    };
  },
  methods: {
    setLoggedOut: function () {
      localStorage.loggedIn = "no";
      localStorage.userEmail = "";
      EventBus.$emit("$loggedIn");
      this.$router.push({ path: "/login" });
    },
    setLoggedIn: function () {
      this.loggedIn = localStorage.loggedIn;
      this.userEmail = localStorage.userEmail;
    },
  },
  mounted() {
    this.loggedIn = localStorage.getItem("loggedIn");
    this.userEmail = localStorage.getItem("userEmail");
    EventBus.$on("$loggedIn", this.setLoggedIn);
  },
};
</script>

<style>
.router-link-exact-active {
  color: green;
}
</style>