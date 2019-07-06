import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import User from './views/User.vue'
import Patients from './views/Patients.vue'
import Economy from './views/Economy.vue'
import Calendar from './views/Calendar.vue'
import Tools from './views/Tools.vue'

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
      path: '/patients',
      name: 'patients',
      component: Patients,
      meta: {
        title: 'Ασθενείς - Dentist Files'
      }
    },
    {
      path: '/economy',
      name: 'economy',
      component: Economy,
      meta: {
        title: 'Οικονομικά - Dentist Files'
      }
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
      meta: {
        title: 'Ημερολόγιο - Dentist Files'
      }
    },
    {
      path: '/tools',
      name: 'tools',
      component: Tools,
      meta: {
        title: 'Εργαλεία - Dentist Files'
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
