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

<!--                <FieldsList :fields="fields"/>-->

                <form class="row col-12">

                    <div class="col-lg-6 col-12">

                        <div class="form-group row">
                            <label for="respiratoryDiseases" class="col-md-4 col-form-label text-md-right">Α. Νόσοι αναπνευστικού</label>
                            <div class="col-md-8 my-auto">
                                <input id="respiratoryDiseases" type="text" class="form-control"
                                       v-model="medicalHistory.respiratoryDiseases" maxlength="60">
                                <form-error v-if="response.errors.respiratoryDiseases" :error="response.errors.respiratoryDiseases[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="cardiovascularDiseases" class="col-md-4 col-form-label text-md-right">Β. Καρδιαγγειακές παθήσεις</label>
                            <div class="col-md-8 my-auto">
                                <input id="cardiovascularDiseases" type="text" class="form-control"
                                       v-model="medicalHistory.cardiovascularDiseases" maxlength="60">
                                <form-error v-if="response.errors.cardiovascularDiseases" :error="response.errors.cardiovascularDiseases[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="hematopoieticSystemDiseases" class="col-md-4 col-form-label text-md-right">Γ. Νόσοι αιμοποιητικού συστήματος</label>
                            <div class="col-md-8 my-auto">
                                <input id="hematopoieticSystemDiseases" type="text" class="form-control"
                                       v-model="medicalHistory.hematopoieticSystemDiseases" maxlength="60">
                                <form-error v-if="response.errors.hematopoieticSystemDiseases" :error="response.errors.hematopoieticSystemDiseases[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="infectiousDiseases" class="col-md-4 col-form-label text-md-right">Δ. Λοιμώδεις νόσοι</label>
                            <div class="col-md-8 my-auto">
                                <input id="infectiousDiseases" type="text" class="form-control"
                                       v-model="medicalHistory.infectiousDiseases" maxlength="60">
                                <form-error v-if="response.errors.infectiousDiseases" :error="response.errors.infectiousDiseases[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="endocrineDisorders" class="col-md-4 col-form-label text-md-right">Ε. Ενδοκρινείς διαταραχές</label>
                            <div class="col-md-8 my-auto">
                                <input id="endocrineDisorders" type="text" class="form-control"
                                       v-model="medicalHistory.endocrineDisorders" maxlength="60">
                                <form-error v-if="response.errors.endocrineDisorders" :error="response.errors.endocrineDisorders[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="diabetes" class="col-md-4 col-form-label text-md-right">ΣΤ. Σακχαρώδης διαβήτης</label>
                            <div class="col-md-8 my-auto">
                                <input id="diabetes" type="text" class="form-control"
                                       v-model="medicalHistory.diabetes" maxlength="60">
                                <form-error v-if="response.errors.diabetes" :error="response.errors.diabetes[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="allergy" class="col-md-4 col-form-label text-md-right">Ζ. Αλλεργία</label>
                            <div class="col-md-8 my-auto">
                                <input id="allergy" type="text" class="form-control"
                                       v-model="medicalHistory.allergy" maxlength="60">
                                <form-error v-if="response.errors.allergy" :error="response.errors.allergy[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="degenerativeArthropathy" class="col-md-4 col-form-label text-md-right">Η. Εκφυλιστική αρθροπάθεια</label>
                            <div class="col-md-8 my-auto">
                                <input id="degenerativeArthropathy" type="text" class="form-control"
                                       v-model="medicalHistory.degenerativeArthropathy" maxlength="60">
                                <form-error v-if="response.errors.degenerativeArthropathy" :error="response.errors.degenerativeArthropathy[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="rheumatoidArthritis" class="col-md-4 col-form-label text-md-right">Θ. Ρευματοειδής αρθρίτιδα</label>
                            <div class="col-md-8 my-auto">
                                <input id="rheumatoidArthritis" type="text" class="form-control"
                                       v-model="medicalHistory.rheumatoidArthritis" maxlength="60">
                                <form-error v-if="response.errors.rheumatoidArthritis" :error="response.errors.rheumatoidArthritis[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="epilepsy" class="col-md-4 col-form-label text-md-right">Ι. Επιληψία</label>
                            <div class="col-md-8 my-auto">
                                <input id="epilepsy" type="text" class="form-control"
                                       v-model="medicalHistory.epilepsy" maxlength="60">
                                <form-error v-if="response.errors.epilepsy" :error="response.errors.epilepsy[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="ulcer" class="col-md-4 col-form-label text-md-right">ΙΑ. Έλκος</label>
                            <div class="col-md-8 my-auto">
                                <input id="ulcer" type="text" class="form-control"
                                       v-model="medicalHistory.ulcer" maxlength="60">
                                <form-error v-if="response.errors.ulcer" :error="response.errors.ulcer[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="neuropsychiatricDisorders" class="col-md-4 col-form-label text-md-right">ΙΒ. Νευροψυχικές διαταραχές</label>
                            <div class="col-md-8 my-auto">
                                <input id="neuropsychiatricDisorders" type="text" class="form-control"
                                       v-model="medicalHistory.neuropsychiatricDisorders" maxlength="60">
                                <form-error v-if="response.errors.neuropsychiatricDisorders" :error="response.errors.neuropsychiatricDisorders[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="sleepApnea" class="col-md-4 col-form-label text-md-right">ΙΓ. Άπνοια ύπνου</label>
                            <div class="col-md-8 my-auto">
                                <input id="sleepApnea" type="text" class="form-control"
                                       v-model="medicalHistory.sleepApnea" maxlength="60">
                                <form-error v-if="response.errors.sleepApnea" :error="response.errors.sleepApnea[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="others" class="col-md-4 col-form-label text-md-right">Άλλα</label>
                            <div class="col-md-8 my-auto">
                                <input id="others" type="text" class="form-control"
                                       v-model="medicalHistory.others" maxlength="60">
                                <form-error v-if="response.errors.others" :error="response.errors.others[0]"/>
                            </div>
                        </div>

                    </div>

                    <div class="col-lg-6 col-12">

                        <div class="form-group row">
                            <label for="pregnancy" class="col-md-3 col-form-label text-md-right">Εγκυμοσύνη</label>

                            <div class="form-check form-check-inline" id="pregnacyCheck">
                                <input class="form-check-input" type="checkbox">
                            </div>

                            <div class="col-md-8 my-auto">
                                <input id="pregnancy" type="text" class="form-control"
                                       v-model="medicalHistory.pregnancy" maxlength="60">
                                <form-error v-if="response.errors.pregnancy" :error="response.errors.pregnancy[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="smoking" class="col-md-3 col-form-label text-md-right">Κάπνισμα</label>

                            <div class="form-check form-check-inline" id="smokingCheck">
                                <input class="form-check-input" type="checkbox">
                            </div>

                            <div class="col-md-8 my-auto">
                                <input id="smoking" type="text" class="form-control"
                                       v-model="medicalHistory.smoking" maxlength="60">
                                <form-error v-if="response.errors.smoking" :error="response.errors.smoking[0]"/>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="medicines">Φάρμακα</label>
                            <input id="madicine" type="text" class="form-control"
                                   v-model="madicine" maxlength="60">
                            <select multiple class="form-control mt-2" id="medicines">
                                <option>Φάρμακο 1</option>
                                <option>Φάρμακο 2</option>
                                <option>Φάρμακο 3</option>
                            </select>
                        </div>

                        <div class="form-group row">
                            <label for="familyHistory" class="col-md-3 col-form-label text-md-right">Οικογενειακό ιστορικό</label>
                            <div class="col-md-9 my-auto">
                                <input id="familyHistory" type="text" class="form-control"
                                       v-model="medicalHistory.familyHistory" maxlength="60">
                                <form-error v-if="response.errors.familyHistory" :error="response.errors.familyHistory[0]"/>
                            </div>
                        </div>

                    </div>

                </form>

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
            }
        }
    },

    methods: {
    //
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
