import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import User from './views/User.vue'
import Patients from './views/Patients.vue'
import Patient from './views/Patient.vue'
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
        title: 'Dentist',
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
        title: 'Ασθενείς - Dentist'
      }
    },
    {
      path: '/patient/:id',
      name: 'patient',
      component: Patient,
      meta: {
        title: 'Ασθενής - Dentist'
      }
    },
    {
      path: '/economy',
      name: 'economy',
      component: Economy,
      meta: {
        title: 'Οικονομικά - Dentist'
      }
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
      meta: {
        title: 'Ημερολόγιο - Dentist'
      }
    },
    {
      path: '/tools',
      name: 'tools',
      component: Tools,
      meta: {
        title: 'Εργαλεία - Dentist'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        title: 'About - Dentist'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        title: 'User - Dentist'
      }
    },
  ]

})
