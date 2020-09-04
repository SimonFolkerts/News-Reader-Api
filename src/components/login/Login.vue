<template>
  <div>
    <h1>Register User</h1>

    <form v-on:submit.prevent="checkForm">
      <!-- error display, this iterates through all the errors present in the error display and shows them. If there are none it doesn't render at all. -->
      <div v-if="errors.length">
        <p>
          <b>Please correct the following</b>
        </p>
        <ul v-for="(error, index) in errors" v-bind:key="index">
          <li>{{error}}</li>
        </ul>
      </div>
      <!-- this is the email field, which is bound to the email property in the data object via v-model -->
      <div>
        <label for="email">Email</label>
        <input v-model="user.email" type="text" name="email" id="email" />
      </div>
      <div>
        <input type="submit" value="Log In" />
      </div>
    </form>
  </div>
</template>

<script>
// the event bus is imported here so that this file knows about it and can listen to or emit events on the bus
import EventBus from "../../eventBus.js";
export default {
  data: function () {
    return {
      user: {
        // the email from the input is bound to this property, they are always going to be the same
        email: "",
      },
      errors: [],
    };
  },

  methods: {
    // this method uses an if statement to determin if the data entered in the form is valid, and if there are errors pushes them to the errors array where they will be displayed by the template
    checkForm: function (event) {
      event.preventDefault();
      this.errors = [];
      if (!this.user.email) {
        this.errors.push("Email required");
      }
      // if no errors then log the user in
      if (!this.errors.length) {
        this.loginUser(this.user);
      }
    },
    // this method logs in the user by sending a post request to the api, which responds with the user whose email is submitted if valid
    // variables in localStorage are set that store the user id, email, and the current state of being logged in
    loginUser(user) {
      this.$http.post(`${process.env.VUE_APP_API_URL}users/login`, user).then(
        function (response) {
          if (response.body.email) {
            localStorage.loggedIn = "yes";
            localStorage.userEmail = user.email;
            localStorage.userId = response.body._id;
            // if the user is returned due to a valid email, and once the variables are saved in local storage, the eventbus is instructed to emit an event, which any other components can listen for and react too
            EventBus.$emit("$loggedIn");
            this.$router.push({ path: "/" });
          }
        },
        function (response) {
          //error callback
          this.errors.push(response.body);
        }
      );
    },
  },
};
</script>

<style>
</style>