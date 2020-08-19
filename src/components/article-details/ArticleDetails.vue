<template>
  <div>
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
      article: {},
    };
  },
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