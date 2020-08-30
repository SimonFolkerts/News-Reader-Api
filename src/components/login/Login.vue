<template>
  <div>
    <h1>Log In</h1>

    <form v-on:submit.prevent="checkForm">
      <!-- error display -->
      <div v-if="errors.length">
        <p>
          <b>Please correct the following</b>
        </p>
        <ul v-for="(error, index) in errors" v-bind:key="index">
          <li>{{error}}</li>
        </ul>
      </div>
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
import EventBus from "../../eventBus.js";
export default {
  data: function () {
    return {
      user: {
        email: "",
      },
      errors: [],
    };
  },
  methods: {
    checkForm: function (event) {
      event.preventDefault();
      this.errors = [];
      if (!this.user.email) {
        this.errors.push("Email required");
      }
      if (!this.errors.length) {
        this.loginUser(this.user);
      }
    },
    loginUser(user) {
      this.$http.post(`${process.env.VUE_APP_API_URL}users/login`, user).then(
        function (response) {
          if (response.body.email) {
            localStorage.loggedIn = "yes";
            localStorage.userEmail = user.email;
            localStorage.userId = response.body._id;
            //emit event for App to recieve
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