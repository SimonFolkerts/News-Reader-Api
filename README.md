# news-reader

## Project setup

Create a .env file in the root directory (alongside src and public etc) that contains the url of the api e.g. VUE_APP_API_URL=http://example-api4.glitch.me/api/

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Add Registration Page
1. Add a route for a register component in main.js
1. Add a link on the header to the register router-view
1. Add a register component
1. Add the form, including a section to display errors with v-if, and a section for input fields for user details
1. Add a data object that can store the user details, and bind to it using v-model
1. Add a method to check the form, display any errors, and if all clear call another method that posts the user to the api
1. Add a method to register a new user by posting to the api, and then checking for a response success or failure
1. On the backend, create an endpoint for registration that on success creates the user and sends back the user or an error if failed

### Add Login Page
1. Create an endpoint for login
1. Create a route, link and component for a login page
1. Create an EventBus
1. Login link should toggle between login vs logout depending on logged state, set via EventBus.
1. Login page should attempt login, if error display error; if success, load loggedin state and email into local storage and update the event bus loggedIn state and load home view.
1. Login page should log out by clearing local storage values and then updating event bus again

### Change Create and Edit to use Auth Endpoints
1. Change put and post urls to the auth endpoints
1. Update the login system to pass user Id through too (login endpoint should send id)
1. When posting or putting, should send user ID through for confirmation

### Add a My Articles Component
