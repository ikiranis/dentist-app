<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Ιατρικό ιστορικό</h1>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: 1 } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" valign="mx-auto" toggle="lg" />

            <div class="container">

                <FieldsList :fields="fields"/>

                <form class="row col-12 mt-3">

                    <div class="col-lg-6 col-12">

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="respiratoryDiseases" class="my-auto">Νόσοι αναπνευστικού</label>
                                </div>
                            </div>

                            <input id="respiratoryDiseases" type="text" class="form-control"
                                   v-model="medicalHistory.respiratoryDiseases" maxlength="60">
                            <form-error v-if="response.errors.respiratoryDiseases"
                                        :error="response.errors.respiratoryDiseases[0]"/>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="cardiovascularDiseases" class="my-auto">Καρδιαγγειακές παθήσεις</label>
                                </div>
                            </div>

                            <input id="cardiovascularDiseases" type="text" class="form-control"
                                   v-model="medicalHistory.cardiovascularDiseases" maxlength="60">
                            <form-error v-if="response.errors.cardiovascularDiseases"
                                        :error="response.errors.cardiovascularDiseases[0]"/>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="hematopoieticSystemDiseases" class="my-auto">Νόσοι αιμοποιητικού συστήματος</label>
                                </div>
                            </div>

                            <input id="hematopoieticSystemDiseases" type="text" class="form-control"
                                   v-model="medicalHistory.hematopoieticSystemDiseases" maxlength="60">
                            <form-error v-if="response.errors.hematopoieticSystemDiseases"
                                        :error="response.errors.hematopoieticSystemDiseases[0]"/>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="infectiousDiseases" class="my-auto">Λοιμώδεις νόσοι</label>
                                </div>
                            </div>

                            <input id="infectiousDiseases" type="text" class="form-control"
                                   v-model="medicalHistory.infectiousDiseases" maxlength="60">
                            <form-error v-if="response.errors.infectiousDiseases"
                                        :error="response.errors.infectiousDiseases[0]"/>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="endocrineDisorders" class="my-auto">Ενδοκρινείς διαταραχές</label>
                                </div>
                            </div>

                            <input id="endocrineDisorders" type="text" class="form-control"
                                   v-model="medicalHistory.endocrineDisorders" maxlength="60">
                            <form-error v-if="response.errors.endocrineDisorders"
                                        :error="response.errors.endocrineDisorders[0]"/>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="diabetes" class="my-auto">Σακχαρώδης διαβήτης</label>
                                </div>
                            </div>

                            <input id="diabetes" type="text" class="form-control"
                                   v-model="medicalHistory.diabetes" maxlength="60">
                            <form-error v-if="response.errors.diabetes"
                                        :error="response.errors.diabetes[0]"/>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="allergy" class="my-auto">Αλλεργία</label>
                                </div>
                            </div>

                            <input id="allergy" type="text" class="form-control"
                                   v-model="medicalHistory.allergy" maxlength="60">
                            <form-error v-if="response.errors.allergy"
                                        :error="response.errors.allergy[0]"/>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="degenerativeArthropathy" class="my-auto">Εκφυλιστική αρθροπάθεια</label>
                                </div>
                            </div>

                            <input id="degenerativeArthropathy" type="text" class="form-control"
                                   v-model="medicalHistory.degenerativeArthropathy" maxlength="60">
                            <form-error v-if="response.errors.degenerativeArthropathy"
                                        :error="response.errors.degenerativeArthropathy[0]"/>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="rheumatoidArthritis" class="my-auto">Ρευματοειδής αρθρίτιδα</label>
                                </div>
                            </div>

                            <input id="rheumatoidArthritis" type="text" class="form-control"
                                   v-model="medicalHistory.rheumatoidArthritis" maxlength="60">
                            <form-error v-if="response.errors.rheumatoidArthritis"
                                        :error="response.errors.rheumatoidArthritis[0]"/>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="epilepsy" class="my-auto">Επιληψία</label>
                                </div>
                            </div>

                            <input id="epilepsy" type="text" class="form-control"
                                   v-model="medicalHistory.epilepsy" maxlength="60">
                            <form-error v-if="response.errors.epilepsy"
                                        :error="response.errors.epilepsy[0]"/>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="ulcer" class="my-auto">Έλκος</label>
                                </div>
                            </div>

                            <input id="ulcer" type="text" class="form-control"
                                   v-model="medicalHistory.ulcer" maxlength="60">
                            <form-error v-if="response.errors.ulcer"
                                        :error="response.errors.ulcer[0]"/>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="neuropsychiatricDisorders" class="my-auto">Νευροψυχικές διαταραχές</label>
                                </div>
                            </div>

                            <input id="neuropsychiatricDisorders" type="text" class="form-control"
                                   v-model="medicalHistory.neuropsychiatricDisorders" maxlength="60">
                            <form-error v-if="response.errors.neuropsychiatricDisorders"
                                        :error="response.errors.neuropsychiatricDisorders[0]"/>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="sleepApnea" class="my-auto">Άπνοια ύπνου</label>
                                </div>
                            </div>

                            <input id="sleepApnea" type="text" class="form-control"
                                   v-model="medicalHistory.sleepApnea" maxlength="60">
                            <form-error v-if="response.errors.sleepApnea"
                                        :error="response.errors.sleepApnea[0]"/>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="others" class="my-auto">Άλλα</label>
                                </div>
                            </div>

                            <input id="others" type="text" class="form-control"
                                   v-model="medicalHistory.others" maxlength="60">
                            <form-error v-if="response.errors.others"
                                        :error="response.errors.others[0]"/>
                        </div>

                    </div>

                    <div class="col-lg-6 col-12">

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="checkbox" id="pregnacyCheck">
                                </div>

                                <div class="input-group-text">
                                    <label for="pregnancy" class="my-auto">Εγκυμοσύνη</label>
                                </div>
                            </div>

                            <input id="pregnancy" type="text" class="form-control"
                                   v-model="medicalHistory.pregnancy" maxlength="20">
                            <form-error v-if="response.errors.pregnancy"
                                        :error="response.errors.pregnancy[0]"/>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="checkbox" id="smokingCheck">
                                </div>

                                <div class="input-group-text">
                                    <label for="smoking" class="my-auto">Κάπνισμα</label>
                                </div>
                            </div>

                            <input id="smoking" type="text" class="form-control"
                                   v-model="medicalHistory.smoking" maxlength="20">
                            <form-error v-if="response.errors.smoking"
                                        :error="response.errors.smoking[0]"/>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="medicine" class="my-auto">Φάρμακα</label>
                                </div>
                            </div>

                            <input id="medicine" type="text" class="form-control"
                                   v-model="medicine" maxlength="60">

                            <div class="col-12">
                                <select multiple class="form-control mt-2" id="medicines">
                                    <option>Φάρμακο 1</option>
                                    <option>Φάρμακο 2</option>
                                    <option>Φάρμακο 3</option>
                                </select>
                            </div>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="familyHistory" class="my-auto">Οικογενειακό ιστορικό</label>
                                </div>
                            </div>

                            <input id="familyHistory" type="text" class="form-control"
                                   v-model="medicalHistory.familyHistory" maxlength="60">
                            <form-error v-if="response.errors.familyHistory"
                                        :error="response.errors.familyHistory[0]"/>
                        </div>

                    </div>

                </form>

                <div class="row">
                    <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                           @click="save()" value="Αποθήκευση">
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import MenuBar from '@/components/basic/MenuBar'
import FormError from '@/components/basic/FormError'
import FieldsList from '@/components/patients/FieldsList'

export default {
    components: { MenuBar, FormError, FieldsList },

    data () {
        return {

            response: {
                message: '',
                status: '',
                errors: []
            },

            menuItems: [
                {
                    route: '/medicalHistory',
                    name: 'Ιατρικό ιστορικό',
                    loggedIn: true
                },
                {
                    route: '/dentalHistory',
                    name: 'Οδοντιατρικό ιστορικό',
                    loggedIn: true
                },
                {
                    route: '/dentalGram',
                    name: 'Οδοντόγραμμα',
                    loggedIn: true
                },
                {
                    route: '/periodDentalGram',
                    name: 'Περιοδοντόγραμμα',
                    loggedIn: true
                },
                {
                    route: '/treatmentHistory',
                    name: 'Ιστορικό θεραπειών',
                    loggedIn: true
                },
                {
                    route: '/denervation',
                    name: 'Απονεύρωση',
                    loggedIn: true
                },
                {
                    route: '/files',
                    name: 'Αρχεία',
                    loggedIn: true
                }
            ],

            fields: [
                {
                    id: 1,
                    name: 'respiratoryDiseases',
                    label: 'Α. Νόσοι αναπνευστικού'
                },
                {
                    id: 2,
                    name: 'cardiovascularDiseases',
                    label: 'Β. Καρδιαγγειακές παθήσεις'
                },
                {
                    id: 3,
                    name: 'hematopoieticSystemDiseases',
                    label: 'Γ. Νόσοι αιμοποιητικού συστήματος'
                },
                {
                    id: 4,
                    name: 'infectiousDiseases',
                    label: 'Δ. Λοιμώδεις νόσοι'
                },
                {
                    id: 5,
                    name: 'endocrineDisorders',
                    label: 'Ε. Ενδοκρινείς διαταραχές'
                },
                {
                    id: 6,
                    name: 'diabetes',
                    label: 'ΣΤ. Σακχαρώδης διαβήτης'
                },
                {
                    id: 7,
                    name: 'allergy',
                    label: 'Ζ. Αλλεργία'
                },
                {
                    id: 8,
                    name: 'degenerativeArthropathy',
                    label: 'Η. Εκφυλιστική αρθροπάθεια'
                },
                {
                    id: 9,
                    name: 'rheumatoidArthritis',
                    label: 'Θ. Ρευματοειδής αρθρίτιδα'
                },
                {
                    id: 10,
                    name: 'epilepsy',
                    label: 'Ι. Επιληψία'
                },
                {
                    id: 11,
                    name: 'ulcer',
                    label: 'ΙΑ. Έλκος'
                },
                {
                    id: 12,
                    name: 'neuropsychiatricDisorders',
                    label: 'ΙΒ. Νευροψυχικές διαταραχές'
                },
                {
                    id: 13,
                    name: 'sleepApnea',
                    label: 'ΙΓ. Άπνοια ύπνου'
                },
                {
                    id: 14,
                    name: 'others',
                    label: 'Άλλα'
                },
                {
                    id: 15,
                    name: 'pregnancy',
                    label: 'Εγκυμοσύνη'
                },
                {
                    id: 16,
                    name: 'smoking',
                    label: 'Κάπνισμα'
                },
                {
                    id: 17,
                    name: 'medicines',
                    label: 'Φάρμακα'
                },
                {
                    id: 18,
                    name: 'familyHistory',
                    label: 'Οικογενειακό ιστορικό'
                }
            ],

            medicalHistory: {
                respiratoryDiseases: '',
                cardiovascularDiseases: '',
                hematopoieticSystemDiseases: '',
                infectiousDiseases: '',
                endocrineDisorders: '',
                diabetes: '',
                allergy: '',
                degenerativeArthropathy: '',
                rheumatoidArthritis: '',
                epilepsy: '',
                ulcer: '',
                neuropsychiatricDisorders: '',
                sleepApnea: '',
                others: '',
                pregnancy: '',
                pregnacyCheck: false,
                smoking: '',
                smokingCheck: false,
                medicines: [],
                familyHistory: ''
            },

            medicine: ''
        }
    },

    methods: {
        save () {
        //
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

</style>
