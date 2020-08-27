<!-- This is the root component that will get mounted on an element in the html. It will include the child components such as the headers, and whatever the router is instructed to display -->

<template>
  <div id="app">
    <my-header></my-header>
    <hr />
    <h1>This is my App</h1>
    <router-view></router-view>
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
  }
};
</script>

<style>
</style>
