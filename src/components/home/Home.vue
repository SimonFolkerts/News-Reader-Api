<template>
  <div>
    <li v-for="article in articles" v-bind:key="article.id">
      <router-link v-bind:to="{ name: 'details', params: { articleId: article.id} }">{{article.title}}</router-link>
    </li>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: function() {
    return {
      articles: []
    };
  },

  components: {},

  methods: {},

  created: function() {
    this.$http
      .get(`https://example-api4.glitch.me/api/articles`)
      .then(function(data) {
        this.articles = data.body.articles;
      });
  }
};
</script>

<style scoped>

</style>
