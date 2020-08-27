import Vue from "vue";
import App from "./App.vue";

import Home from "./components/home/Home.vue";
import About from "./components/about/About.vue";
import ArticleDetails from "./components/article-details/ArticleDetails.vue";
import EditArticle from "./components/edit-article/EditArticle";
import Register from "./components/register/Register.vue";
import Login from "./components/login/Login.vue";

import VueResource from "vue-resource";

Vue.use(VueResource);

import VueRouter from "vue-router";

Vue.use(VueRouter);

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
];

const router = new VueRouter({
  routes: routes,
  mode: "history",
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
