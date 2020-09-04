<template>
  <div>
    <!-- article bits are rendered here -->
    <h3>{{article.title}}</h3>
    <p>{{article.description}}</p>
    <p>{{article.body}}</p>
  </div>
</template>

<script>
export default {
  name: "ArticleDetails",
  data: function () {
    return {
      // the article is stored here, and is accessed in the template
      article: {},
    };
  },
  // this method requests a sepcific article from the api using the id passed into the component via a route parameter using vue router
  created: function () {
    const id = this.$route.params.articleId;
    this.$http
      .get(`${process.env.VUE_APP_API_URL}articles/${id}`)
      .then(function (data) {
        this.article = data.body;
      });
  },
};
</script>

<style>
</style>