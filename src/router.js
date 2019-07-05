import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import User from './views/User.vue'

Vue.use(Router);

export default new Router({

  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home Page - Dentist Files',
        metaTags: [
          {
            name: 'description',
            content: 'The home page of our example app.'
          },
          {
            property: 'og:description',
            content: 'The home page of our example app.'
          }
        ]
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        title: 'About - Dentist Files'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        title: 'User - Dentist Files'
      }
    },
  ]

})
