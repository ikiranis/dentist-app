<template>
    <div class="container-fluid my-3">

		<menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
				  :menuItems="menuItems" userInfo="false" fixed=""
				  variant="" type="light" valign="mx-auto" toggle="md" navCollapseText="patientBar" />

        <div class="row justify-content-center">

            <div class="col-lg col-12 row fixed-bottom mb-5">
                <Loading class="mx-auto" :loading="loading"/>
            </div>

            <div class="container">

                <!-- Στοιχεία ασθενή -->
                <form @submit.prevent="saveInfo" class="row">

                    <div class="col-lg-6 col-12">

                        <div class="form-group row">
                            <label for="lname" class="col-md-6 col-form-label text-md-right">Επώνυμο</label>
                            <div class="col-md-6">
                                <input id="lname" type="text" class="form-control"
                                       v-model="patient.lname" required maxlength="20">
                                <form-error v-if="response.errors.lname" :error="response.errors.lname[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="fname" class="col-md-6 col-form-label text-md-right">Όνομα</label>
                            <div class="col-md-6">
                                <input id="fname" type="text" class="form-control"
                                       v-model="patient.fname" required maxlength="20">
                                <form-error v-if="response.errors.fname" :error="response.errors.fname[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="fatherName" class="col-md-6 col-form-label text-md-right">Όνομα πατρός</label>
                            <div class="col-md-6">
                                <input id="fatherName" type="text" class="form-control"
                                       v-model="patient.fatherName" maxlength="20">
                                <form-error v-if="response.errors.fatherName" :error="response.errors.fatherName[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="birthday" class="col-md-6 col-form-label text-md-right">Ημ. γέννησης</label>
                            <div class="col-md-6">
                                <input id="birthday" type="date" class="form-control"
                                       v-model="patient.birthday">
                                <form-error v-if="response.errors.birthday" :error="response.errors.birthday[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="phoneLandline" class="col-md-6 col-form-label text-md-right">Τηλέφωνο
                                (σταθερό)</label>
                            <div class="col-md-6">
                                <input id="phoneLandline" type="text" class="form-control"
                                       v-model="patient.phoneLandline" maxlength="10">
                                <form-error v-if="response.errors.phoneLandline"
                                            :error="response.errors.phoneLandline[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="phoneMobile" class="col-md-6 col-form-label text-md-right">Τηλέφωνο
                                (κινητό)</label>
                            <div class="col-md-6">
                                <input id="phoneMobile" type="text" class="form-control"
                                       v-model="patient.phoneMobile" maxlength="10">
                                <form-error v-if="response.errors.phoneMobile" :error="response.errors.phoneMobile[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="address" class="col-md-6 col-form-label text-md-right">Διεύθυνση</label>
                            <div class="col-md-6">
                                <input id="address" type="text" class="form-control"
                                       v-model="patient.address" maxlength="60">
                                <form-error v-if="response.errors.address" :error="response.errors.address[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-6 col-form-label text-md-right">email</label>
                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control"
                                       v-model="patient.email">
                                <form-error v-if="response.errors.email" :error="response.errors.email[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="amka" class="col-md-6 col-form-label text-md-right">ΑΜΚΑ</label>
                            <div class="col-md-6">
                                <input id="amka" type="text" class="form-control"
                                       v-model="patient.amka" maxlength="11">
                                <form-error v-if="response.errors.amka" :error="response.errors.amka[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="created_at" class="col-md-6 col-form-label text-md-right">Ημ. Εγγραφής</label>
                            <div class="col-md-6">
                                <input id="created_at" type="date" class="form-control"
                                       :value="patient.created_at" disabled>
                            </div>
                        </div>

                    </div>

                    <div class="col-lg-6 col-12">

                        <!-- Σημειώσεις -->
                        <div class="card">

                            <div class="card-header">
                                Σημειώσεις
                            </div>

                            <div class="card-body">

                                <div class="form-group row my-1">
                                    <label for="disease" class="col-md-5 col-form-label text-md-right">
                                        Ασθένεια <biohazard-icon title="Ασθένεια"/>
                                    </label>
                                    <div class="col-md-7">
                                        <input id="disease" type="text" class="form-control col-form"
                                               v-model="patient.icons[0].name" maxlength="60">
                                    </div>
                                </div>

                                <div class="form-group row my-1">
                                    <label for="treatment" class="col-md-5 col-form-label text-md-right">
                                        Εκρεμείς θεραπείες <medical-bag-icon title="Εκρεμείς θεραπείες"/>
                                    </label>
                                    <div class="col-md-7">
                                        <input id="treatment" type="text" class="form-control col-form"
                                               v-model="patient.icons[1].name" maxlength="60">
                                    </div>
                                </div>

                                <div class="form-group row my-1">
                                    <label for="debt" class="col-md-5 col-form-label text-md-right">
                                        Χρέος <currency-eur-icon title="Χρέος"/>
                                    </label>
                                    <div class="col-md-7">
                                        <input id="debt" type="text" class="form-control col-form"
                                               v-model="patient.icons[2].name" maxlength="60">
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </form>

                <div class="row">
                    <input type="button" id="saveInfo"
                           class="btn btn-success col-md-6 col-12 my-3 mx-auto"
                           @click="saveInfo" value="Αποθήκευση">
                </div>

            </div>

            <div class="row fixed-bottom mb-2">
                <display-error class="mx-auto"
                               v-if="response.message"
                               :response="response"/>
            </div>

        </div>

    </div>
</template>

<script>
import FormError from '@/components/basic/FormError'
import MenuBar from '@/components/basic/MenuBar'
import api from '@/api'
import utility from '@/library/utility'
import DisplayError from '@/components/basic/DisplayError'
import Loading from '@/components/basic/Loading'
import moment from 'moment'

export default {
    components: { FormError, MenuBar, DisplayError, Loading },

    data () {
        return {
            response: {
                message: ' ',
                status: '',
                errors: []
            },

            loading: false,

            patient: {
                id: 0,
                fname: '',
                lname: '',
                fatherName: '',
                icons: [
                    { id: 1, label: 'Ασθένεια', name: null },
                    { id: 2, label: 'Εκρεμείς θεραπείες', name: null },
                    { id: 3, label: 'Χρέος', name: null }
                ],
                birthday: '',
                phoneMobile: '',
                phoneLandline: '',
                address: '',
                email: '',
                amka: '', // TODO Add validation
                created_at: ''
            },

            menuItems: [
                {
                    route: '/medicalHistory/' + this.$route.params.id,
                    name: 'Ιατρικό ιστορικό',
                    loggedIn: true,
                    active: false,
                    disabled: false
                },
                {
                    route: '/dentalHistory/' + this.$route.params.id,
                    name: 'Οδοντιατρικό ιστορικό',
                    loggedIn: true,
                    active: false,
                    disabled: false
                },
                {
                    route: '/dentalGram/' + this.$route.params.id,
                    name: 'Οδοντόγραμμα',
                    loggedIn: true,
                    active: false,
                    disabled: false
                },
                {
                    route: '/periodontalChart/' + this.$route.params.id,
                    name: 'Περιοδοντόγραμμα',
                    loggedIn: true,
                    active: false,
                    disabled: false
                },
                {
                    route: '/treatmentHistory/' + this.$route.params.id,
                    name: 'Ιστορικό θεραπειών',
                    loggedIn: true,
                    active: false,
                    disabled: false
                },
                {
                    route: '/denervation/' + this.$route.params.id,
                    name: 'Απονεύρωση',
                    loggedIn: true,
                    active: false,
                    disabled: false
                },
                {
                    route: '/files/' + this.$route.params.id,
                    name: 'Αρχεία',
                    loggedIn: true,
                    active: false,
                    disabled: false
                }
            ]
        }
    },

    computed: {
        patientId: function () {
            return this.$route.params.id
        }
    },

    created: function () {
        this.checkForNullPatient()
        this.getPatient()
    },

    methods: {
        moment,

        /**
         * Check if patient is 0 and make all menu items disabled
         */
        checkForNullPatient () {
            if (this.patientId === 0) {
                this.menuItems.forEach(item => {
                    item.disabled = true
                })
            }
        },

        /**
         * Get the patient
         */
        getPatient () {
            this.loading = true

            api.getPatient(this.patientId)
                .then(response => {
                    this.loading = false

                    if (response.status === 200) {
                        this.patient = response.data
                    }
                })
                .catch(error => {
                    this.loading = false

                    this.response.message = error.response.data.message
                    this.response.status = false

                    utility.debug(error.response.data.debug)
                })
        },

        /**
         * Run the appropriate save action
         */
        saveInfo () {
            if (this.patientId === 0) {
                this.createPatient()
                return
            }

            this.updatePatient()
        },

        /**
         * Create a patient
         */
        createPatient () {
            this.loading = true

            api.createPatient(this.patient)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Ο ασθενής αποθηκεύτηκε'
                    this.response.status = true

                    this.$router.push({ name: 'patients' })
                })
                .catch(error => {
                    this.loading = false

                    this.response.message = error.response.data.message
                    this.response.status = false

                    if (error.response.data.errors) {
                        this.response.errors = error.response.data.errors
                    }

                    utility.debug(error.response.data.debug)
                })
        },

        /**
         * Update the patient
         */
        updatePatient () {
            this.loading = true

            api.updatePatient(this.patient, this.patientId)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Ο ασθενής ενημερώθηκε'
                    this.response.status = true
                })
                .catch(error => {
                    this.loading = false

                    this.response.message = error.response.data.message
                    this.response.status = false

                    if (error.response.data.errors) {
                        this.response.errors = error.response.data.errors
                    }

                    utility.debug(error.response.data.debug)
                })
        }
    }
}
</script>
