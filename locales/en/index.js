/**
 * @group i18n
 * Set words here for have better code and bilingual website
 */
export default {
  /*
  * auth pages
  */
  auth: {
    emailInput: 'Email',
    passwordInput: 'Password',
    userInput: 'User',
    // login page
    login: {
      title: 'LOGIN',
      button: 'Login',
      haveAccount: 'Don’t have account?',
      register: 'Register Now'
    },
    // register page
    register: {
      title: 'Register',
      button: 'Register',
      haveAccount: 'Already Registered?',
      login: 'Login'
    },
    // validation errors
    validation: {
      require: 'Required field',
      email: 'Email is invalid',
      minLength: 'password must be at least 4 characters.'
    }

  },
  /*
  * navbar words
  */
  navbar: {
    title: 'Arvan Challenge',
    welcome: 'Welcome',
    logout: 'Logout'
  },
  /*
  * sidebar words
  */
  sidebar: {
    title: 'Posts',
    links: {
      first: 'All Articles',
      second: 'New Article'
    }
  },
  /*
  * article pages words
  */
  articles: {
    title: 'All Posts',
    table: ['Title', 'Author', 'Tags', 'Excerpt', 'Created'],
    dropDown: {
      edit: 'edit',
      delete: 'delete'
    },
    loading: 'Loading...'
  },
  /*
  * create article pages words
  */
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
  /*
  * delete article pages words
  */
  delete: {
    title: 'Delete Article',
    text: 'Are you sure to delete Article?'
  },
  /*
  * edit pages words
  */
  edit: {
    title: 'Edit Article'
  },
  /*
  * general words
  */
  yes: 'Yes',
  no: 'No'
}
