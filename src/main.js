import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Bootstrap
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// User Authentication
import user from '@/library/user'

/*
 * Material Design icons
 * @link https://materialdesignicons.com/
 */
import Biohazard from 'vue-material-design-icons/Biohazard.vue'
import MedicalBag from 'vue-material-design-icons/MedicalBag.vue'
import CurrencyEur from 'vue-material-design-icons/CurrencyEur.vue'
import MinusCircleOutline from 'vue-material-design-icons/MinusCircleOutline.vue'
import PlusCircleOutline from 'vue-material-design-icons/PlusCircleOutline.vue'
import Delete from 'vue-material-design-icons/Delete.vue'
import EyeIcon from 'vue-material-design-icons/Eye.vue'
import DownloadIcon from 'vue-material-design-icons/Download.vue'
import SwapHorizontalBold from 'vue-material-design-icons/SwapHorizontalBold.vue'
import ZipDisk from 'vue-material-design-icons/ZipDisk.vue'
import DatabaseExport from 'vue-material-design-icons/DatabaseExport.vue'
import MenuUp from 'vue-material-design-icons/MenuUp.vue'
import MenuDown from 'vue-material-design-icons/MenuDown.vue'

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
Vue.component('eye-icon', EyeIcon)
Vue.component('download-icon', DownloadIcon)
Vue.component('delete', Delete)
Vue.component('swap-horizontal-bold', SwapHorizontalBold)
Vue.component('zip-disk', ZipDisk)
Vue.component('database-export', DatabaseExport)
Vue.component('menu-up', MenuUp)
Vue.component('menu-down', MenuDown)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
