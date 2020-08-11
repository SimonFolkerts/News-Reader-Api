<template>
  <div>
    <h1>New Article</h1>
    <form v-on:submit.prevent="checkForm">
      <div class="errors">
        <ul>
          <li v-for="(error, i) in errors" v-bind:key="i">
            <p>{{error}}</p>
          </li>
        </ul>
      </div>
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
          v-model="article.description"
          id="description"
          name="description"
          type="text"
          placeholder="Enter the Description"
        />
      </div>
      <div>
        <label for="body">Body</label>
        <input
          v-model="article.body"
          id="body"
          name="body"
          type="text"
          placeholder="Enter the Body"
        />
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
      editing: false,
      errors: [],
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
        if (this.editing) {
          this.editArticle(this.article)
        } else {
          this.createArticle(this.article)
        }
      }
      if (!this.article.title) {
        this.errors.push("Title Required");
      }
      if (!this.article.description) {
        this.errors.push("Description Required");
      }
      if (!this.article.body) {
        this.errors.push("Body Required");
      }
    },

    createArticle: function(article) {
      this.$http
        .post(`https://example-api4.glitch.me/api/articles`, article)
        .then(function() {
          this.$router.push({ path: "/" });
        });
    },

    editArticle: function(article) {
      this.$http
        .put(
          `https://example-api4.glitch.me/api/articles/${article.id}`,
          article
        )
        .then(function() {
          this.$router.push({ path: "/" });
        });
    }
  },

  created: function() {
    if (this.$route.params.articleId) {
      this.editing = true;
      this.$http
        .get(
          `http://example-api4.glitch.me/api/articles/${this.$route.params.articleId}`
        )
        .then(function(data) {
          this.article = data.body.article;
        });
    }
  }
};
</script>

<style>
</style>