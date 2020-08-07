<template>
  <div>
    <h1>New Article</h1>
    <form v-on:submit.prevent="checkForm">
      <div>
        <label for="title">Title</label>
        <input
          v-model="article.title"
          id="title"
          name="title"
          type="text"
          placeholder="Enter the Title"
        />
      </div>
      <div>
        <label for="description">Description</label>
        <input 
          v-model="article.description" id="description" name="description" type="text" placeholder="Enter the Description" />
      </div>
      <div>
        <label for="body">Body</label>
        <input 
          v-model="article.body" id="body" name="body" type="text" placeholder="Enter the Body" />
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditArticle",
  data: function() {
    return {
      article: {
        title: null,
        description: null,
        body: null
      }
    };
  },
  methods: {
    checkForm: function() {
      if (this.article.title && this.article.description && this.article.body) {
        this.$http
          .post(`https://example-api4.glitch.me/api/articles`, this.article)
          .then(function() {
            this.$router.push({ path: "/" });
          });
      }
    }
  }
};
</script>

<style>
</style>