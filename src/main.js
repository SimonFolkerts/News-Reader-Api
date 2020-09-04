// import vue and the root component. This makes the vue stuff available to this file to use, and also makes the root component available so it can be set up.
import Vue from "vue";
import App from "./App.vue";

// import the components that are going to be set up with the vue router to allow them to be switched around.
import Home from "./components/home/Home.vue";
import About from "./components/about/About.vue";
import ArticleDetails from "./components/article-details/ArticleDetails.vue";
import EditArticle from "./components/edit-article/EditArticle";
import Register from "./components/register/Register.vue";
import Login from "./components/login/Login.vue";
import MyArticles from "./components/my-articles/MyArticles.vue";

// import vue resource, the unofficial plugin we will use to handle the sending and receiving of requests over http
import VueResource from "vue-resource";

// this plugs in the resource plugin, meaning any vue instances created from this will have the resource plugins functionality added.
Vue.use(VueResource);

// import vue router, the official plugin that will handle switching out the components for single page application behaviour.
import VueRouter from "vue-router";

// plug in the router, so that any instances created from here will have the router plugins functionality
Vue.use(VueRouter);

// this array stores the routes for the router. Each one has a path, which is the address that goes at the end of the URL in the location bar at the top of the browser. Some have names as well, which serve as a shorter way of referring to them when the router-links are set up.
// each one also specifies which of the above imported components will be loaded when a specific address is visited. 
// the colon means that the segment is dynamic, i.e. it could be anything and will be treated as a parameter. This is useful when we need oto pass information from one view to another when they swap.
// the question mark means that that segment is optional, e.g. the edit page can be reached with a url that could potentially include an id segment. The presence of this segment would sitch the component into edit mode rather than the default create mode
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    name: "details",
    path: "/article/:articleId/details",
    component: ArticleDetails,
  },
  {
    name: "edit",
    path: "/article/:articleId?/edit",
    component: EditArticle,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/my-articles",
    component: MyArticles,
  }
];

// here a vue router object is instantiated from the class, and is equipped with the routes specified above.
const router = new VueRouter({
  routes: routes,
  mode: "history",
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
