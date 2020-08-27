<template>
  <div>
    <h1>Register User</h1>

    <form v-on:submit.prevent="checkForm">
      <!-- error display -->
      <div v-if="errors.length">
        <p>
          <b>Please correct the following this.errors:</b>
        </p>
        <ul v-for="(error, index) in errors" v-bind:key="index">
          <li>{{error}}</li>
        </ul>
      </div>
      <div>
        <label for="firstname">First Name</label>
        <input v-model="user.firstname" type="text" name="firstname" id="firstname" />
      </div>
      <div>
        <label for="lastname">Last Name</label>
        <input v-model="user.lastname" type="text" name="lastname" id="lastname" />
      </div>
      <div>
        <label for="username">username</label>
        <input v-model="user.username" type="text" name="username" id="username" />
      </div>
      <div>
        <label for="email">Email</label>
        <input v-model="user.email" type="text" name="email" id="email" />
      </div>
      <div>
        <input type="submit" value="Register" />
      </div>
    </form>

    <!-- form groups -->
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      user: {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
      },
      errors: [],
    };
  },
  methods: {
    checkForm: function (event) {
      event.preventDefault();
      this.errors = [];
      if (!this.user.firstname) {
        this.errors.push("First name required!");
      }
      if (!this.user.lastname) {
        this.errors.push("Last name required");
      }
      if (!this.user.username) {
        this.errors.push("Username required");
      }
      if (!this.user.email) {
        this.errors.push("Email required");
      }
      if (!this.errors.length) {
        this.registerUser(this.user);
      }
    },
    registerUser: function (user) {
      this.$http
        .post(`${process.env.VUE_APP_API_URL}users/register`, user)
        // .then takes two params, a success callback and an error callback
        .then(
          (response) => {
            if (response.body) {
              localStorage.loggedIn = true;
              localStorage.user = user.email;
              this.$emit("$loggedIn", true);
              this.$router.push({ path: "/" });
            }
          },
          (response) => {
            this.errors.push(response.body.message);
          }
        );
    },
  },
};
</script>

<style>
</style>