<template>
  <header>
    <h3>Header</h3>
    <router-link v-bind:to="'/'">Home</router-link>
    <router-link v-bind:to="'/about'">About</router-link>
    <router-link v-bind:to="'/register'">Register</router-link>
  </header>
</template>

<script>
export default {
  name: "MyHeader"
};
</script>

<style>
    .router-link-exact-active {
        color: green;
    }
</style>