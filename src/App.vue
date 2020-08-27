<!-- This is the root component that will get mounted on an element in the html. It will include the child components such as the headers, and whatever the router is instructed to display -->

<template>
  <div id="app">
    <my-header loggedIn="isLogged"></my-header>
    <hr />
    <h2>This is my App</h2>
    <router-view @loggedIn="setLoggedIn"></router-view>
    <hr />
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from "./components/Header.vue";
import MyFooter from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    "my-header": MyHeader,
    "my-footer": MyFooter,
  },
  data: function () {
    return { isLogged: false };
  },
  methods: {
    setLoggedIn: function () {
      this.isLogged = true;
    },
  },
};
</script>

<style>
</style>
