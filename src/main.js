import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' // Display console warning at development mode

// Bootstrap
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// User Authentication
import user from '@/library/user'

// Material Design icons
// @link https://materialdesignicons.com/
import Biohazard from 'vue-material-design-icons/Biohazard.vue'
import MedicalBag from 'vue-material-design-icons/MedicalBag.vue'
import CurrencyEur from 'vue-material-design-icons/CurrencyEur.vue'
import MinusCircleOutline from 'vue-material-design-icons/MinusCircleOutline.vue'
import PlusCircleOutline from 'vue-material-design-icons/PlusCircleOutline.vue'
import Delete from 'vue-material-design-icons/Delete.vue'

Vue.config.productionTip = true
Vue.use(BootstrapVue)
user.setUserTokenHeader()

// Set routes titles
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

// Add icons components
Vue.component('biohazard-icon', Biohazard)
Vue.component('medical-bag-icon', MedicalBag)
Vue.component('currency-eur-icon', CurrencyEur)
Vue.component('minus-circle-outline', MinusCircleOutline)
Vue.component('plus-circle-outline', PlusCircleOutline)
Vue.component('delete', Delete)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
