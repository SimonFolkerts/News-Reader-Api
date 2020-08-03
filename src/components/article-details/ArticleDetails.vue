<template>
  <div>
    <h3>{{article.title}}</h3>
    <p>{{article.body}}</p>
  </div>
</template>

<script>
export default {
    name: "ArticleDetails",
    data: function() {
      return {
        article: {}
      }
    },
    created: function() {
      const id = this.$route.params.articleId
      this.$http.get(`http://example-api4.glitch.me/api/articles/${id}`).then(function(data) {
        this.article = data.body.article
      })
    }
}
</script>

<style>
</style>