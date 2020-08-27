<template>
  <div>
    <h2>Register New User</h2>

    <form @submit.prevent="checkForm">
      <div v-if="errors.length">
        <p>
          <b>Please correct the following errors:</b>
        </p>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{error}}</li>
        </ul>
      </div>

      <div>
        <div>
          <label for="firstname">First Name</label>
          <input v-model="user.firstname" type="text" id="firstname" name="firstname" />
        </div>
        <div>
          <label for="lastname">Last Name</label>
          <input v-model="user.lastname" type="text" id="lastname" name="lastname" />
        </div>
        <div>
          <label for="username">Username</label>
          <input v-model="user.username" type="text" id="username" name="username" />
        </div>
        <div>
          <label for="email">Email</label>
          <input v-model="user.email" type="text" id="email" name="email" />
        </div>
        <div>
          <input type="submit" value="Register" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",

  data: function() {
    return {
      errors: [],
      user: {
        firstname: "",
        lastname: "",
        username: "",
        email: ""
      }
    };
  },

  methods: {
    checkForm: function(event) {
      event.preventDefault();
      this.errors = [];
      if (!this.user.firstname) {
        this.errors.push("First name required!");
      }
      if (!this.user.lastname) {
        this.errors.push("Last name required!");
      }
      if (!this.user.username) {
        this.errors.push("Username required!");
      }
      if (!this.user.email) {
        this.errors.push("Email required!");
      }

      if (!this.errors.length) {
        this.registerUser(this.user);
      }
    },

    registerUser: function(user) {
      this.$http
        .post(`${process.env.VUE_APP_API_URL}users/register`, user)
        .then(
          response => {
            console.log(response);
          },
          response => {
              console.log(response)
          }
        );
    }
  }
};
</script>

<style>
</style>