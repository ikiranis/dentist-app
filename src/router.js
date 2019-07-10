import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import About from './views/About.vue'
import User from './views/User.vue'
import Patients from './views/Patients.vue'
import Patient from './views/Patient.vue'
import Economy from './views/Economy.vue'
import Calendar from './views/Calendar.vue'
import Tools from './views/Tools.vue'
import Denervation from './views/Denervation.vue'
import Files from './views/Files.vue'
import DentalGram from './views/DentalGram.vue'
import MedicalHistory from './views/MedicalHistory.vue'
import PeriodDentalGram from './views/PeriodDentalGram.vue'
import TreatmentHistory from './views/TreatmentHistory.vue'
import DentalHistory from './views/DentalHistory.vue'

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
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'Σύνδεση - Dentist'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: 'Εγγραφή - Dentist'
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
    {
      path: '/denervation',
      name: 'denervation',
      component: Denervation,
      meta: {
        title: 'Απονεύρωση - Dentist'
      }
    },
    {
      path: '/files',
      name: 'files',
      component: Files,
      meta: {
        title: 'Αρχεία - Dentist'
      }
    },
    {
      path: '/dentalGram',
      name: 'dentalGram',
      component: DentalGram,
      meta: {
        title: 'Οδοντόγραμμα - Dentist'
      }
    },
    {
      path: '/medicalHistory',
      name: 'medicalHistory',
      component: MedicalHistory,
      meta: {
        title: 'Ιατρικό ιστορικό - Dentist'
      }
    },
    {
      path: '/periodDentalGram',
      name: 'periodDentalGram',
      component: PeriodDentalGram,
      meta: {
        title: 'Περιοδοντόγραμμα - Dentist'
      }
    },
    {
      path: '/treatmentHistory',
      name: 'treatmentHistory',
      component: TreatmentHistory,
      meta: {
        title: 'Ιστορικό θεραπειών - Dentist'
      }
    },
    {
      path: '/dentalHistory',
      name: 'dentalHistory',
      component: DentalHistory,
      meta: {
        title: 'Οδοντιατρικό ιστοριό - Dentist'
      }
    },
  ]

})
