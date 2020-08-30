<template>
  <div>
    <h2>Articles</h2>
    <!-- This router link swwaps out this component for the edit article component, and doesn't pass it anything -->
    <router-link v-bind:to="{name: 'edit'}">New Article</router-link>

    <ul>
      <!-- This <li> is being generated iteratively by looping through the 'articles' array via the v-for directive -->
      <li v-for="(article, index) in articles" v-bind:key="index">
        <div>
          <!-- 
          This router link is generated from the title of each article being iterated over
          The router link has a bound 'to' attribute, vue will programmatically interpret its contents rather than it just being treated as a string 
          It is being passed the name of a route defined oin main.js, and a route parameter named articleId that is being assigned the value of article.id, which is stored in the data object of this component
          When clicked, it intructs vue-router to switch out this component for the one specified in the path on main.js, passing it the id as a param as well-->
          <router-link
            v-bind:to="{ name: 'details', params: { articleId: article._id} }"
          >{{article.title}}</router-link>
        </div>
        <div>
          <!-- This router link will instruct vue-router to switch out this component for the edit article component, passing it the article id as a param as well -->
          <router-link v-bind:to="{ name: 'edit', params: { articleId: article._id} }">Edit Article</router-link>
          <!-- This link is a regular anchor tag that has a vue listener on it that triggers the deleteArticle method stored in this components methods object 
          The id of the article this link represents is passed to the function so that it knows which article is to be deleted-->
          <a href v-on:click.prevent="deleteArticle(article._id)">Delete Article</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: function () {
    return {
      // This is where the list of articles is stored
      articles: [],
    };
  },

  components: {},

  methods: {
    // This method, when called and passed an id, sends a request to the api to have that article deleted
    deleteArticle: function (articleId) {
      this.$http
        .delete(`${process.env.VUE_APP_API_URL}articles/${articleId}`)
        .then(function () {
          // Once the response is received, reload the article list by calling get articles
          this.getArticles();
        });
    },

    // This function sends a request to the api to retreive all the articles, and then stores them in the article property of the data object
    getArticles: function () {
      this.$http
        .get(`${process.env.VUE_APP_API_URL}articles`)
        .then(function (data) {
          this.articles = data.body;
        });
    },
  },

  // This lifecycle hook executes whenever this component is created, and calls the function that retreives the articles from the api
  created: function () {
    this.getArticles();
  },
};
</script>

<style scoped>
</style>
