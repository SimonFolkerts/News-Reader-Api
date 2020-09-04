<template>
  <header>
    <h3>Header</h3>
    <!-- the header serves as a navigation component and also ahndles much of the log in/out functionality along with the login component. The router-links are part of the vue router plugin and instruct it which component to render. They are also automatically set to active or not depending on which component is active. -->
    <router-link v-bind:to="'/'">Home</router-link>
    <!-- if conditional means this will only render if the condition is truthy -->
    <router-link v-if="loggedIn === 'yes'" v-bind:to="'/my-articles'">My Articles</router-link>
    <router-link v-bind:to="'/about'">About</router-link>
    <a v-if="loggedIn === 'yes'" @click.prevent="setLoggedOut" href>Log Out</a>
    <!-- else conditional means this will only render if the immediately preceding if conditional is falsy - i.e. an either or type situation -->
    <router-link v-else v-bind:to="'/login'">Log In</router-link>
    <router-link v-bind:to="'/register'">Register</router-link>
    <h5 v-if="loggedIn === 'yes'">Hello: {{userEmail}}</h5>
  </header>
</template>

<script>
// this imports the event bus, making it available to this file
import EventBus from "../eventBus";
export default {
  name: "MyHeader",
  data: function () {
    return {
      // this indicates if anyone is currently logged in or not
      loggedIn: "no",
      // this is the currently logged in users' email address from the database
      userEmail: "",
    };
  },
  methods: {
    //  this method clears all the specific user data from the localStorage, and then emits an event on the event bus that indicates to whom it may concern that logged in/out state of the application just changed.
    setLoggedOut: function () {
      localStorage.loggedIn = "no";
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userId");
      // emit log state change event to alert relevant components
      EventBus.$emit("$loggedIn");
      // redirect to login page
      this.$router.push({ path: "/login" });
    },

  //  this method reads the current user details from the localStorage, and any directives or template placeholders will update in response to any changes to reflect the logged in/out state of the application
    setLoggedIn: function () {
      this.loggedIn = localStorage.loggedIn;
      this.userEmail = localStorage.userEmail;
    },
  },
// this lifecycle hook will execute once the html has rendered for the first time, and will set the inital state of the header based on the current logged in/out state of the user.
  mounted() {
    this.loggedIn = localStorage.getItem("loggedIn");
    this.userEmail = localStorage.getItem("userEmail");
    EventBus.$on("$loggedIn", this.setLoggedIn);
  },
};
</script>

<style>
/* styling for the currently active router link */
.router-link-exact-active {
  color: green;
}
</style>