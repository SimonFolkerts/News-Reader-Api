<!-- This is the root component that will get mounted on an element in the html. It will include the child components such as the headers, and whatever the router is instructed to display -->

<template>
  <div id="app">
    <!-- the header component is rendered here -->
    <my-header loggedIn="isLogged"></my-header>
    <hr />
    <h2>This is my App</h2>
    <!-- this is where the router will display all its components -->
    <router-view @loggedIn="setLoggedIn"></router-view>
    <hr />
    <!-- the footer component is rendered here -->
    <my-footer></my-footer>
  </div>
</template>

<script>
// the child components are imported here, which makes them visible to this file and allows us to actually register and render them
import MyHeader from "./components/Header.vue";
import MyFooter from "./components/Footer.vue";

export default {
  // the name of the component
  name: "App",
  // this is where the child components we want to render are registered once they have been imported
  components: {
    "my-header": MyHeader,
    "my-footer": MyFooter,
  },
// this is where any values that the component needs to use are stored. In order to make this component reuseable (i.e. have multiple instances with unique sets of data) the data object should be a function that returns an object that has the values in it. This ensures each instance has it's own set of data rather than all having the same duplicated set.
  data: function () {
    return { isLogged: false };
  },

  //this is where any methods that the component has are defined
  methods: {
    setLoggedIn: function () {
      this.isLogged = true;
    },
  },
};
</script>

<style>
</style>
