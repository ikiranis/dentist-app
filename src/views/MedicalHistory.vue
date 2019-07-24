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

                <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!fieldSelected">
                    Επιλογή πεδίων
                </div>

                <form @submit.prevent class="row col-12 mt-3">

                    <div class="col-lg-6 col-12">

                        <div class="input-group row mb-2" v-if="fields[0].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="respiratoryDiseases" class="my-auto">Νόσοι αναπνευστικού</label>
                                </div>
                            </div>

                            <input id="respiratoryDiseases" type="text" class="form-control"
                                   v-model="medicalHistory.respiratoryDiseases" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(0)"/>
                            <form-error v-if="response.errors.respiratoryDiseases"
                                        :error="response.errors.respiratoryDiseases[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[1].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="cardiovascularDiseases" class="my-auto">Καρδιαγγειακές παθήσεις</label>
                                </div>
                            </div>

                            <input id="cardiovascularDiseases" type="text" class="form-control"
                                   v-model="medicalHistory.cardiovascularDiseases" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(1)"/>
                            <form-error v-if="response.errors.cardiovascularDiseases"
                                        :error="response.errors.cardiovascularDiseases[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[2].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="hematopoieticSystemDiseases" class="my-auto">Νόσοι αιμοποιητικού συστήματος</label>
                                </div>
                            </div>

                            <input id="hematopoieticSystemDiseases" type="text" class="form-control"
                                   v-model="medicalHistory.hematopoieticSystemDiseases" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(2)"/>
                            <form-error v-if="response.errors.hematopoieticSystemDiseases"
                                        :error="response.errors.hematopoieticSystemDiseases[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[3].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="infectiousDiseases" class="my-auto">Λοιμώδεις νόσοι</label>
                                </div>
                            </div>

                            <input id="infectiousDiseases" type="text" class="form-control"
                                   v-model="medicalHistory.infectiousDiseases" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(3)"/>
                            <form-error v-if="response.errors.infectiousDiseases"
                                        :error="response.errors.infectiousDiseases[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[4].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="endocrineDisorders" class="my-auto">Ενδοκρινείς διαταραχές</label>
                                </div>
                            </div>

                            <input id="endocrineDisorders" type="text" class="form-control"
                                   v-model="medicalHistory.endocrineDisorders" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(4)"/>
                            <form-error v-if="response.errors.endocrineDisorders"
                                        :error="response.errors.endocrineDisorders[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[5].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="diabetes" class="my-auto">Σακχαρώδης διαβήτης</label>
                                </div>
                            </div>

                            <input id="diabetes" type="text" class="form-control"
                                   v-model="medicalHistory.diabetes" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(5)"/>
                            <form-error v-if="response.errors.diabetes"
                                        :error="response.errors.diabetes[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[6].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="allergy" class="my-auto">Αλλεργία</label>
                                </div>
                            </div>

                            <input id="allergy" type="text" class="form-control"
                                   v-model="medicalHistory.allergy" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(6)"/>
                            <form-error v-if="response.errors.allergy"
                                        :error="response.errors.allergy[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[7].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="degenerativeArthropathy" class="my-auto">Εκφυλιστική αρθροπάθεια</label>
                                </div>
                            </div>

                            <input id="degenerativeArthropathy" type="text" class="form-control"
                                   v-model="medicalHistory.degenerativeArthropathy" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(7)"/>
                            <form-error v-if="response.errors.degenerativeArthropathy"
                                        :error="response.errors.degenerativeArthropathy[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[8].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="rheumatoidArthritis" class="my-auto">Ρευματοειδής αρθρίτιδα</label>
                                </div>
                            </div>

                            <input id="rheumatoidArthritis" type="text" class="form-control"
                                   v-model="medicalHistory.rheumatoidArthritis" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(8)"/>
                            <form-error v-if="response.errors.rheumatoidArthritis"
                                        :error="response.errors.rheumatoidArthritis[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[9].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="epilepsy" class="my-auto">Επιληψία</label>
                                </div>
                            </div>

                            <input id="epilepsy" type="text" class="form-control"
                                   v-model="medicalHistory.epilepsy" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(9)"/>
                            <form-error v-if="response.errors.epilepsy"
                                        :error="response.errors.epilepsy[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[10].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="ulcer" class="my-auto">Έλκος</label>
                                </div>
                            </div>

                            <input id="ulcer" type="text" class="form-control"
                                   v-model="medicalHistory.ulcer" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(10)"/>
                            <form-error v-if="response.errors.ulcer"
                                        :error="response.errors.ulcer[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[11].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="neuropsychiatricDisorders" class="my-auto">Νευροψυχικές διαταραχές</label>
                                </div>
                            </div>

                            <input id="neuropsychiatricDisorders" type="text" class="form-control"
                                   v-model="medicalHistory.neuropsychiatricDisorders" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(11)"/>
                            <form-error v-if="response.errors.neuropsychiatricDisorders"
                                        :error="response.errors.neuropsychiatricDisorders[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[12].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="sleepApnea" class="my-auto">Άπνοια ύπνου</label>
                                </div>
                            </div>

                            <input id="sleepApnea" type="text" class="form-control"
                                   v-model="medicalHistory.sleepApnea" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(12)"/>
                            <form-error v-if="response.errors.sleepApnea"
                                        :error="response.errors.sleepApnea[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[13].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="others" class="my-auto">Άλλα</label>
                                </div>
                            </div>

                            <input id="others" type="text" class="form-control"
                                   v-model="medicalHistory.others" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(13)"/>
                            <form-error v-if="response.errors.others"
                                        :error="response.errors.others[0]"/>
                        </div>

                    </div>

                    <div class="col-lg-6 col-12">

                        <div class="input-group row mb-2" v-if="fields[14].display">
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
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(14)"/>
                            <form-error v-if="response.errors.pregnancy"
                                        :error="response.errors.pregnancy[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[15].display">
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
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(15)"/>
                            <form-error v-if="response.errors.smoking"
                                        :error="response.errors.smoking[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[16].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="medicine" class="my-auto">Φάρμακα</label>
                                </div>
                            </div>

                            <input id="medicine" type="text" class="form-control"
                                   v-model="medicine" maxlength="60" placeholder="Πάτα enter για εισαγωγή"
                                   @keyup.enter="addMedicine">

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(16)"/>

                            <div class="col-12">
                                <select multiple class="form-control mt-2" id="medicines"
                                        @keyup.delete="deleteMedicine($event)" v-if="medicalHistory.medicines.length">
                                    <option v-for="medicine in medicalHistory.medicines" :key="medicine.id" :value="medicine.id">
                                        {{ medicine.name }}
                                    </option>
                                </select>
                                <div class="row w-100" v-if="medicalHistory.medicines.length">
                                    <small class="text-danger mx-auto">Πάτα delete για διαγραφή</small>
                                </div>
                            </div>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[17].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="familyHistory" class="my-auto">Οικογενειακό ιστορικό</label>
                                </div>
                            </div>

                            <input id="familyHistory" type="text" class="form-control"
                                   v-model="medicalHistory.familyHistory" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(17)"/>
                            <form-error v-if="response.errors.familyHistory"
                                        :error="response.errors.familyHistory[0]"/>
                        </div>

                    </div>

                </form>

                <div class="row" v-if="fieldSelected">
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
                    route: '/periodontalChart',
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
                    id: 0,
                    label: 'Νόσοι αναπνευστικού',
                    display: false
                },
                {
                    id: 1,
                    label: 'Καρδιαγγειακές παθήσεις',
                    display: false
                },
                {
                    id: 2,
                    label: 'Νόσοι αιμοποιητικού συστήματος',
                    display: false
                },
                {
                    id: 3,
                    label: 'Λοιμώδεις νόσοι',
                    display: false
                },
                {
                    id: 4,
                    label: 'Ενδοκρινείς διαταραχές',
                    display: false
                },
                {
                    id: 5,
                    label: 'Σακχαρώδης διαβήτης',
                    display: false
                },
                {
                    id: 6,
                    label: 'Αλλεργία',
                    display: false
                },
                {
                    id: 7,
                    label: 'Εκφυλιστική αρθροπάθεια',
                    display: false
                },
                {
                    id: 8,
                    label: 'Ρευματοειδής αρθρίτιδα',
                    display: false
                },
                {
                    id: 9,
                    label: 'Επιληψία',
                    display: false
                },
                {
                    id: 10,
                    label: 'Έλκος',
                    display: false
                },
                {
                    id: 11,
                    label: 'Νευροψυχικές διαταραχές',
                    display: false
                },
                {
                    id: 12,
                    label: 'Άπνοια ύπνου',
                    display: false
                },
                {
                    id: 13,
                    label: 'Άλλα',
                    display: false
                },
                {
                    id: 14,
                    label: 'Εγκυμοσύνη',
                    display: false
                },
                {
                    id: 15,
                    label: 'Κάπνισμα',
                    display: false
                },
                {
                    id: 16,
                    label: 'Φάρμακα',
                    display: false
                },
                {
                    id: 17,
                    label: 'Οικογενειακό ιστορικό',
                    display: false
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

    computed: {
        fieldSelected () {
            return this.fields.find((field) => {
                return field.display
            })
        }
    },

    methods: {
        save () {
            alert('Saving...')
        },

        /**
         * Εξαφάνιση του πεδίου
         *
         * @param field
         */
        removeField (field) {
            this.fields[field].display = false
        },

        /**
         * Add medicine to medicines array
         */
        addMedicine () {
            if(this.medicine === '')
                return

            this.medicalHistory.medicines.push({
                id: this.medicalHistory.medicines.length,
                name: this.medicine })
            this.medicine = ''
        },

        /**
         * Delete item from medicines array
         *
         * @param event
         */
        deleteMedicine (event) {
            let index = this.medicalHistory.medicines.find((medicine) => medicine.id === event.target.value)
            this.medicalHistory.medicines.splice(index, 1)
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
