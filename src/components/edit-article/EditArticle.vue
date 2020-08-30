<template>
  <div>
    <h1>{{mode}} Article</h1>
    <!-- add a submit listener on the form, when the form submits, vue will handle it with the specified method 'checkForm', it will also suppress the default submit behaviour of a form (sending a request and reloading the page) -->
    <form v-on:submit.prevent="checkForm">
      <div class="errors">
        <ul>
          <!-- if any erros get pushed onto the 'errors' array, they will be iterated through here and displayed programmatically using a v-for directive -->
          <li v-for="(error, i) in errors" v-bind:key="i">
            <p>{{error}}</p>
          </li>
        </ul>
      </div>
      <!-- the inputs in this div are bound via a two way connection to the data in the component thanks to the v-model directive. If the input changes, the value is reflected in the data object. If the value in the data object changes, the value is reflected in the input. They are always the same. This means that if the component is in edit mode, it will get an article from the database and it will be loaded into the data object and it's values will be immediately reflected in the inputs. Conversely, when the user types something or deletes something from the inputs, these changes are immediately reflected in the data object -->
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
  data: function () {
    return {
      mode: "New",
      editing: false,
      // this is where the errors are put if they are detected by the checkForm method
      errors: [],
      // this is the article object, where the data for creation or editing is stored. It has a two way link to the template thanks to the v-model directives on the html inputs there
      article: {
        title: null,
        description: null,
        body: null,
      },
    };
  },
  methods: {
    //this method uses an if statement to determing if the data entered in the form is valid, and then checks which action to take based on the mode of the component
    checkForm: function () {
      if (this.article.title && this.article.description && this.article.body) {
        // if the mode is edit, then the edit method is called
        if (this.editing) {
          this.editArticle(this.article);
        } else {
          // otherwise it's create mode and the create method is called
          this.createArticle(this.article);
        }
      }
      // finally, a set of if statements determine which, if any, inputs aren't filled out and add the corresponding error message to the array of error messages in the data object
      this.errors = [];
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

    // this function sends a post request to the api, and includes an article object as its payload
    // the api will interpret this as a request to create a new article entry in the database
    createArticle: function (article) {
      console.log(article);
      this.$http
        .post(`${process.env.VUE_APP_API_URL}users/${localStorage.userId}/articles`, article)
        .then(function () {
          // upon receiving confirmation from the api, it then commands the vue router to go to the home view
          this.$router.push({ path: "/" });
        });
    },

    // this function sends a put request to the api, and includes an article object as its payload
    // the api will interpret this as a request to edit an existing entry
    editArticle: function (article) {
      this.$http
        .put(`${process.env.VUE_APP_API_URL}articles/${article._id}`, article)
        .then(function () {
          // upon receiving confirmation from the api, it then commands the vue router to go to the home view
          this.$router.push({ path: "/" });
        });
    },
  },

  // this lifecycle hook runs when the component is created, and decides if it should be in editing mode or not by checking for the presence of a parameter (the article id) in the path that was used to access this component
  created: function () {
    if (this.$route.params.articleId) {
      // id there is one, it sets editing mode to true, because it means that an edit article link was clicked, which sends through the id of the article as a parameter
      this.editing = true;
      this.mode = "Edit";
      // it then sends a get request to the api to retreive the article that owns the id passed through
      this.$http
        .get(
          `${process.env.VUE_APP_API_URL}articles/${this.$route.params.articleId}`
        )
        .then(function (data) {
          // and when the article is received, it is loaded into the article object stored in this components' data object, which is bound to the template and therefore automatically fills out the form
          this.article = data.body;
        });
    }
    // otherwise if no param is present, it must mean that the 'new article' link was clicked, and therefore the editing mode stays false, and no article is retreived, the form stays blank and no requests are sent until the user has properly filled out the form and submitted, which is handled elsewhere, in the checkForm method
  },
};
</script>

<style>
</style>