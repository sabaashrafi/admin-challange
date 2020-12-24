export default {
  auth: {
    emailInput: 'Email',
    passwordInput: 'Password',
    userInput: 'User',
    login: {
      title: 'LOGIN',
      button: 'Login',
      haveAccount: 'Don’t have account?',
      register: 'Register Now'
    },
    register: {
      title: 'Register',
      button: 'Register',
      haveAccount: 'Already Registered?',
      login: 'Login'
    },
    validation: {
      require: 'Required field',
      email: 'Email is invalid',
      minLength: 'password must be at least 4 characters.'
    }

  },
  navbar: {
    title: 'Arvan Challenge',
    welcome: 'Welcome {{ username }}',
    logout: 'Logout'
  },
  sidebar: {
    title: 'Posts',
    links: {
      first: 'All Articles',
      second: 'New Article'
    }
  },
  articles: {
    table: ['Title', 'Author', 'Tags', 'Excerpt', 'Created']
  },
  create: {
    title: 'New Article',
    inputs: {
      title: 'Title',
      description: 'Description',
      body: 'Body',
      tags: 'Tags'
    },
    button: 'Submit'
  },
  delete: {
    title: 'Delete Article',
    text: 'Are you sure to delete Article?'
  },
  yes: 'Yes',
  no: 'No'
}
