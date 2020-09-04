<template>
  <div>
    <h1>Register User</h1>

    <form v-on:submit.prevent="checkForm">
      <!-- error display, this iterates through all the errors present in the error display and shows them. If there are none it doesn't render at all. -->
      <div v-if="errors.length">
        <p>
          <b>Please correct the following this.errors:</b>
        </p>
        <ul v-for="(error, index) in errors" v-bind:key="index">
          <li>{{error}}</li>
        </ul>
      </div>
      <!-- this is the email field, which is bound to the email property in the data object via v-model -->
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
    // this method uses an if statement to determin if the data entered in the form is valid, and if there are errors pushes them to the errors array where they will be displayed by the template
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
            // if the user is valid, variables in localStorage are set that store the user id, email, and the current state of being logged in.
            // this means that if you successfully register you are then immediately automatically logged in here
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