<template>
    <div class="container-fluid my-3">

		<menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
				  :menuItems="menuItems" userInfo="false" fixed=""
				  variant="" type="light" valign="mx-auto" toggle="lg"
				  navCollapseText="patientBar" />

        <div class="row justify-content-center">

            <div class="col-lg col-12 row fixed-bottom mb-5">
                <Loading class="mx-auto" :loading="loading"/>
            </div>

            <div class="container">

                <FieldsList v-if="!loading" :fields="fields"/>

                <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!fieldSelected && !loading">
                    Επιλογή πεδίων
                </div>

                <form @submit.prevent class="row col-12 mt-3">

                    <div class="col-lg-6 col-12">

                        <div class="input-group row mb-2" v-if="fields.respiratoryDiseases.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="respiratoryDiseases" class="my-auto">Νόσοι αναπνευστικού</label>
                                </div>
                            </div>

                            <input id="respiratoryDiseases" type="text" class="form-control"
                                   v-model="medicalHistory.respiratoryDiseases" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.respiratoryDiseases)"/>
                            <form-error v-if="response.errors.respiratoryDiseases"
                                        :error="response.errors.respiratoryDiseases[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.cardiovascularDiseases.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="cardiovascularDiseases" class="my-auto">Καρδιαγγειακές παθήσεις</label>
                                </div>
                            </div>

                            <input id="cardiovascularDiseases" type="text" class="form-control"
                                   v-model="medicalHistory.cardiovascularDiseases" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.cardiovascularDiseases)"/>
                            <form-error v-if="response.errors.cardiovascularDiseases"
                                        :error="response.errors.cardiovascularDiseases[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.hematopoieticSystemDiseases.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="hematopoieticSystemDiseases" class="my-auto">Νόσοι αιμοποιητικού συστήματος</label>
                                </div>
                            </div>

                            <input id="hematopoieticSystemDiseases" type="text" class="form-control"
                                   v-model="medicalHistory.hematopoieticSystemDiseases" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.hematopoieticSystemDiseases)"/>
                            <form-error v-if="response.errors.hematopoieticSystemDiseases"
                                        :error="response.errors.hematopoieticSystemDiseases[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.infectiousDiseases.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="infectiousDiseases" class="my-auto">Λοιμώδεις νόσοι</label>
                                </div>
                            </div>

                            <input id="infectiousDiseases" type="text" class="form-control"
                                   v-model="medicalHistory.infectiousDiseases" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.infectiousDiseases)"/>
                            <form-error v-if="response.errors.infectiousDiseases"
                                        :error="response.errors.infectiousDiseases[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.endocrineDisorders.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="endocrineDisorders" class="my-auto">Ενδοκρινείς διαταραχές</label>
                                </div>
                            </div>

                            <input id="endocrineDisorders" type="text" class="form-control"
                                   v-model="medicalHistory.endocrineDisorders" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.endocrineDisorders)"/>
                            <form-error v-if="response.errors.endocrineDisorders"
                                        :error="response.errors.endocrineDisorders[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.diabetes.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="diabetes" class="my-auto">Σακχαρώδης διαβήτης</label>
                                </div>
                            </div>

                            <input id="diabetes" type="text" class="form-control"
                                   v-model="medicalHistory.diabetes" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.diabetes)"/>
                            <form-error v-if="response.errors.diabetes"
                                        :error="response.errors.diabetes[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.allergy.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="allergy" class="my-auto">Αλλεργία</label>
                                </div>
                            </div>

                            <input id="allergy" type="text" class="form-control"
                                   v-model="medicalHistory.allergy" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.allergy)"/>
                            <form-error v-if="response.errors.allergy"
                                        :error="response.errors.allergy[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.degenerativeArthropathy.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="degenerativeArthropathy" class="my-auto">Εκφυλιστική αρθροπάθεια</label>
                                </div>
                            </div>

                            <input id="degenerativeArthropathy" type="text" class="form-control"
                                   v-model="medicalHistory.degenerativeArthropathy" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.degenerativeArthropathy)"/>
                            <form-error v-if="response.errors.degenerativeArthropathy"
                                        :error="response.errors.degenerativeArthropathy[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.rheumatoidArthritis.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="rheumatoidArthritis" class="my-auto">Ρευματοειδής αρθρίτιδα</label>
                                </div>
                            </div>

                            <input id="rheumatoidArthritis" type="text" class="form-control"
                                   v-model="medicalHistory.rheumatoidArthritis" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.rheumatoidArthritis)"/>
                            <form-error v-if="response.errors.rheumatoidArthritis"
                                        :error="response.errors.rheumatoidArthritis[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.epilepsy.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="epilepsy" class="my-auto">Επιληψία</label>
                                </div>
                            </div>

                            <input id="epilepsy" type="text" class="form-control"
                                   v-model="medicalHistory.epilepsy" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.epilepsy)"/>
                            <form-error v-if="response.errors.epilepsy"
                                        :error="response.errors.epilepsy[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.ulcer.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="ulcer" class="my-auto">Έλκος</label>
                                </div>
                            </div>

                            <input id="ulcer" type="text" class="form-control"
                                   v-model="medicalHistory.ulcer" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.ulcer)"/>
                            <form-error v-if="response.errors.ulcer"
                                        :error="response.errors.ulcer[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.neuropsychiatricDisorders.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="neuropsychiatricDisorders" class="my-auto">Νευροψυχικές διαταραχές</label>
                                </div>
                            </div>

                            <input id="neuropsychiatricDisorders" type="text" class="form-control"
                                   v-model="medicalHistory.neuropsychiatricDisorders" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.neuropsychiatricDisorders)"/>
                            <form-error v-if="response.errors.neuropsychiatricDisorders"
                                        :error="response.errors.neuropsychiatricDisorders[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.sleepApnea.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="sleepApnea" class="my-auto">Άπνοια ύπνου</label>
                                </div>
                            </div>

                            <input id="sleepApnea" type="text" class="form-control"
                                   v-model="medicalHistory.sleepApnea" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.sleepApnea)"/>
                            <form-error v-if="response.errors.sleepApnea"
                                        :error="response.errors.sleepApnea[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.others.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="others" class="my-auto">Άλλα</label>
                                </div>
                            </div>

                            <input id="others" type="text" class="form-control"
                                   v-model="medicalHistory.others" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.others)"/>
                            <form-error v-if="response.errors.others"
                                        :error="response.errors.others[0]"/>
                        </div>

                    </div>

                    <div class="col-lg-6 col-12">

                        <div class="input-group row mb-2" v-if="fields.pregnancy.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="checkbox" id="pregnacyCheck" v-model="medicalHistory.pregnacyCheck">
                                </div>

                                <div class="input-group-text">
                                    <label for="pregnancy" class="my-auto">Εγκυμοσύνη</label>
                                </div>
                            </div>

                            <input id="pregnancy" type="text" class="form-control"
                                   v-model="medicalHistory.pregnancy" maxlength="20"
                                   :disabled="medicalHistory.pregnacyCheck ? 'disabled' : ''">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.pregnancy)"/>
                            <form-error v-if="response.errors.pregnancy"
                                        :error="response.errors.pregnancy[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.smoking.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="checkbox" id="smokingCheck" v-model="medicalHistory.smokingCheck">
                                </div>

                                <div class="input-group-text">
                                    <label for="smoking" class="my-auto">Κάπνισμα</label>
                                </div>
                            </div>

                            <input id="smoking" type="text" class="form-control"
                                   v-model="medicalHistory.smoking" maxlength="20"
                                   :disabled="medicalHistory.smokingCheck ? 'disabled' : ''">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.smoking)"/>
                            <form-error v-if="response.errors.smoking"
                                        :error="response.errors.smoking[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.medicines.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="medicine" class="my-auto">Φάρμακα</label>
                                </div>
                            </div>

                            <input id="medicine" type="text" class="form-control"
                                   v-model="medicine" maxlength="60" placeholder="Πάτα enter για εισαγωγή"
                                   @keyup.enter="addMedicine">

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.medicines)"/>

                            <div class="col-12">
                                <select multiple class="form-control mt-2" id="medicines"
                                        @keyup.delete="deleteMedicine($event)"
                                        v-if="medicalHistory.medicines.length">
                                    <option v-for="medicine in medicalHistory.medicines"
                                            :key="medicine.id" :value="medicine.id">
                                        {{ medicine.name }}
                                    </option>
                                </select>
                                <div class="row w-100" v-if="medicalHistory.medicines.length">
                                    <small class="text-danger mx-auto">Πάτα delete για διαγραφή</small>
                                </div>
                            </div>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.familyHistory.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="familyHistory" class="my-auto">Οικογενειακό ιστορικό</label>
                                </div>
                            </div>

                            <input id="familyHistory" type="text" class="form-control"
                                   v-model="medicalHistory.familyHistory" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.familyHistory)"/>
                            <form-error v-if="response.errors.familyHistory"
                                        :error="response.errors.familyHistory[0]"/>
                        </div>

                    </div>

                </form>

                <div class="row" v-if="fieldSelected">
                    <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                           @click="updateMedicalHistory" value="Αποθήκευση">
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
import MenuBar from '@/components/basic/MenuBar'
import FormError from '@/components/basic/FormError'
import FieldsList from '@/components/patients/FieldsList'
import api from '../api'
import utility from '../library/utility'
import DisplayError from '@/components/basic/DisplayError'
import Loading from '@/components/basic/Loading'

export default {
    components: { MenuBar, FormError, FieldsList, DisplayError, Loading },

    data () {
        return {
            loading: false,

            response: {
                message: ' ',
                status: '',
                errors: []
            },

            menuItems: [
                {
                    route: '/medicalHistory/' + this.$route.params.id,
                    name: 'Ιατρικό ιστορικό',
                    loggedIn: true,
                    active: true
                },
                {
                    route: '/dentalHistory/' + this.$route.params.id,
                    name: 'Οδοντιατρικό ιστορικό',
                    loggedIn: true,
                    active: false
                },
                {
                    route: '/dentalGram/' + this.$route.params.id,
                    name: 'Οδοντόγραμμα',
                    loggedIn: true,
                    active: false
                },
                {
                    route: '/periodontalChart/' + this.$route.params.id,
                    name: 'Περιοδοντόγραμμα',
                    loggedIn: true,
                    active: false
                },
                {
                    route: '/treatmentHistory/' + this.$route.params.id,
                    name: 'Ιστορικό θεραπειών',
                    loggedIn: true,
                    active: false
                },
                {
                    route: '/denervation/' + this.$route.params.id,
                    name: 'Απονεύρωση',
                    loggedIn: true,
                    active: false
                },
                {
                    route: '/files/' + this.$route.params.id,
                    name: 'Αρχεία',
                    loggedIn: true,
                    active: false
                }
            ],

            fields: {
                respiratoryDiseases: {
                    label: 'Νόσοι αναπνευστικού',
                    display: false
                },
                cardiovascularDiseases: {
                    label: 'Καρδιαγγειακές παθήσεις',
                    display: false
                },
                hematopoieticSystemDiseases: {
                    label: 'Νόσοι αιμοποιητικού συστήματος',
                    display: false
                },
                infectiousDiseases: {
                    label: 'Λοιμώδεις νόσοι',
                    display: false
                },
                endocrineDisorders: {
                    label: 'Ενδοκρινείς διαταραχές',
                    display: false
                },
                diabetes: {
                    label: 'Σακχαρώδης διαβήτης',
                    display: false
                },
                allergy: {
                    label: 'Αλλεργία',
                    display: false
                },
                degenerativeArthropathy: {
                    label: 'Εκφυλιστική αρθροπάθεια',
                    display: false
                },
                rheumatoidArthritis: {
                    label: 'Ρευματοειδής αρθρίτιδα',
                    display: false
                },
                epilepsy: {
                    label: 'Επιληψία',
                    display: false
                },
                ulcer: {
                    label: 'Έλκος',
                    display: false
                },
                neuropsychiatricDisorders: {
                    label: 'Νευροψυχικές διαταραχές',
                    display: false
                },
                sleepApnea: {
                    label: 'Άπνοια ύπνου',
                    display: false
                },
                others: {
                    label: 'Άλλα',
                    display: false
                },
                pregnancy: {
                    label: 'Εγκυμοσύνη',
                    display: false
                },
                smoking: {
                    label: 'Κάπνισμα',
                    display: false
                },
                medicines: {
                    label: 'Φάρμακα',
                    display: false
                },
                familyHistory: {
                    label: 'Οικογενειακό ιστορικό',
                    display: false
                }
            },

            medicalHistory: {
                id: 0,
                respiratoryDiseases: null,
                cardiovascularDiseases: null,
                hematopoieticSystemDiseases: null,
                infectiousDiseases: null,
                endocrineDisorders: null,
                diabetes: null,
                allergy: null,
                degenerativeArthropathy: null,
                rheumatoidArthritis: null,
                epilepsy: null,
                ulcer: null,
                neuropsychiatricDisorders: null,
                sleepApnea: null,
                others: null,
                pregnancy: null,
                pregnacyCheck: false,
                smoking: null,
                smokingCheck: false,
                medicines: [],
                familyHistory: null
            },

            medicine: ''
        }
    },

    computed: {
        // Find if any field is selected. True if any
        fieldSelected () {
            return Object.values(this.fields).find((field) => {
                return field.display
            })
        },

        patientId: function () {
            return this.$route.params.id
        }
    },

    created: function () {
        this.getMedicalHistory()
    },

    methods: {

        /**
         * Get Medical History info
         */
        getMedicalHistory () {
            this.loading = true

            api.getMedicalHistory(this.patientId)
                .then(response => {
                    this.loading = false

                    if (response.status === 200) {
                        this.medicalHistory = response.data

                        this.checkFields()
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
         * Update the Medical History info
         */
        updateMedicalHistory () {
            this.loading = true

            api.updateMedicalHistory(this.medicalHistory, this.patientId)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Τα δεδομένα αποθηκεύτηκαν'
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
        },

        /**
         * Check for fields. If not empty, display it
         */
        checkFields () {
            Object.keys(this.medicalHistory).forEach(key => {
                if (this.medicalHistory[key] === null || this.medicalHistory[key].length < 1) {
                    return
                }

                if (this.fields[key] === undefined) {
                    return
                }

                this.fields[key].display = true
            })
        },

        /**
         * Εξαφάνιση του πεδίου
         *
         * @param field
         */
        removeField (field) {
            field.display = false
        },

        /**
         * Add medicine to medicines array
         */
        addMedicine () {
            if (this.medicine === '') { return }

            this.medicalHistory.medicines.push({
                id: (this.medicalHistory.medicines.length === 0)
                    ? 0
                    : this.medicalHistory.medicines[this.medicalHistory.medicines.length - 1].id + 1,
                name: this.medicine
            })

            this.medicine = ''
        },

        /**
         * Delete item from medicines array
         *
         * @param event
         */
        deleteMedicine (event) {
            this.medicalHistory.medicines = this.medicalHistory.medicines.filter((medicine) => {
                return (medicine.id !== parseInt(event.target.value))
            })
        }
    }
}
</script>

<style lang="scss" scoped>

    input[type=checkbox]
    {
        /* Double-sized Checkboxes */
        -ms-transform: scale(2); /* IE */
        -moz-transform: scale(2); /* FF */
        -webkit-transform: scale(2); /* Safari and Chrome */
        -o-transform: scale(2); /* Opera */
        padding: 10px;
    }

    .removeItem {
        cursor: pointer;
    }

</style>
