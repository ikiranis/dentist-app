<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Απονεύρωση</h1>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: 1 } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" valign="mx-auto" toggle="lg" />

            <div class="container">

                <!-- Δελτίο ενδοδοντικής θεραπείας -->

                <div class="col-12 text-center">
                    <h1>Δελτίο ενδοδοντικής θεραπείας</h1>
                </div>

                <FieldsList :fields="fieldsEndoTreat"/>

                <form class="row col-12 mt-3">

                    <div class="col-lg-6 col-12">

                        <div class="col-12 text-center">
                            <h3>Ιστορικό</h3>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[0].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="automatic">
                            </div>

                            <div class="input-group-text col">
                                <label for="automatic" class="my-1">Αυτόματος</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(0)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[1].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="challenged">
                            </div>

                            <div class="input-group-text col">
                                <label for="challenged" class="my-1">Προκλητός</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(1)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[2].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="reason" class="my-auto">Αιτία</label>
                                </div>
                            </div>

                            <input id="reason" type="text" class="form-control"
                                   v-model="endoTreatment.reason" maxlength="20">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(2)"/>
                            <form-error v-if="response.errors.reason"
                                        :error="response.errors.reason[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[3].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="duration" class="my-auto">Διάρκεια</label>
                                </div>
                            </div>

                            <input id="duration" type="text" class="form-control"
                                   v-model="endoTreatment.duration" maxlength="20">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(3)"/>
                            <form-error v-if="response.errors.duration"
                                        :error="response.errors.duration[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[4].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="reduceToTheCold">
                            </div>

                            <div class="input-group-text col">
                                <label for="reduceToTheCold" class="my-1">Μείωση στο ψυχρό</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(4)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[5].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="historyEdema">
                            </div>

                            <div class="input-group-text col">
                                <label for="historyEdema" class="my-1">Οίδημα</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(5)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[6].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="feelingOfToothElongation">
                            </div>

                            <div class="input-group-text col">
                                <label for="feelingOfToothElongation" class="my-1">Αίσθηση επιμήκυνσης δοντιού</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(6)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[7].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="fever">
                            </div>

                            <div class="input-group-text col">
                                <label for="fever" class="my-1">Πυρετός</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(7)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[8].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="lymphadenitis">
                            </div>

                            <div class="input-group-text col">
                                <label for="lymphadenitis" class="my-1">Λεμφαδενίτιδα</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(8)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[9].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="others" class="my-auto">Άλλα</label>
                                </div>
                            </div>

                            <input id="others" type="text" class="form-control"
                                   v-model="endoTreatment.others" maxlength="20">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(9)"/>
                            <form-error v-if="response.errors.others"
                                        :error="response.errors.others[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[10].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="previousAction" class="my-auto">Προηγούμενη αγωγή</label>
                                </div>
                            </div>

                            <input id="previousAction" type="text" class="form-control"
                                   v-model="endoTreatment.previousAction" maxlength="20">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(10)"/>
                            <form-error v-if="response.errors.previousAction"
                                        :error="response.errors.previousAction[0]"/>
                        </div>

                    </div>

                    <div class="col-lg-6 col-12">

                        <div class="col-12 text-center">
                            <h3>Κλινική εξέταση</h3>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[21].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="toothChoise" class="my-auto">Επιλογή δοντιού</label>
                                </div>
                            </div>

                            <input id="toothChoise" type="text" class="form-control"
                                   v-model="endoTreatment.toothChoise" maxlength="20">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(21)"/>
                            <form-error v-if="response.errors.toothChoise"
                                        :error="response.errors.toothChoise[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[11].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="treatEdema">
                            </div>

                            <div class="input-group-text col">
                                <label for="treatEdema" class="my-1">Οίδημα</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(11)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[12].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="fistula">
                            </div>

                            <div class="input-group-text col">
                                <label for="fistula" class="my-1">Συρίγγιο</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(12)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[13].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="tintOfAMill">
                            </div>

                            <div class="input-group-text col">
                                <label for="tintOfAMill" class="my-1">Απόχρωση μύλης</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(13)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[14].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="checkbox" id="revelationOfPulpCheck">
                                </div>

                                <div class="input-group-text">
                                    <label for="revelationOfPulp" class="my-auto">Αποκάλυψη πολφού</label>
                                </div>
                            </div>

                            <input id="revelationOfPulp" type="text" class="form-control"
                                   v-model="endoTreatment.revelationOfPulp" maxlength="20">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(14)"/>
                            <form-error v-if="response.errors.revelationOfPulp"
                                        :error="response.errors.revelationOfPulp[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[15].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="sensitivityToPalpationAtTheTip">
                            </div>

                            <div class="input-group-text col">
                                <label for="sensitivityToPalpationAtTheTip" class="my-1">Ευαισθησία στη ψηλάφηση ακρορριζικά</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(15)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[16].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="painInTheAttack">
                            </div>

                            <div class="input-group-text col">
                                <label for="painInTheAttack" class="my-1">Πόνος στην επίκρουση</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(16)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[17].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="elation">
                            </div>

                            <div class="input-group-text col">
                                <label for="elation" class="my-1">Ευσειστότητα</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(17)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[18].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="vitality">
                            </div>

                            <div class="input-group-text col">
                                <label for="vitality" class="my-1">Ζωτικότητα</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(18)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[19].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="periodontalTissues" class="my-auto">Περιοδοντικοί ιστοί</label>
                                </div>
                            </div>

                            <input id="periodontalTissues" type="text" class="form-control"
                                   v-model="endoTreatment.periodontalTissues" maxlength="20">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(19)"/>
                            <form-error v-if="response.errors.periodontalTissues"
                                        :error="response.errors.periodontalTissues[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fieldsEndoTreat[20].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="radiographicExamination" class="my-auto">Ακτινογραφική εξέταση</label>
                                </div>
                            </div>

                            <input id="radiographicExamination" type="text" class="form-control"
                                   v-model="endoTreatment.radiographicExamination" maxlength="20">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeFieldEndoTreat(20)"/>
                            <form-error v-if="response.errors.radiographicExamination"
                                        :error="response.errors.radiographicExamination[0]"/>
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

            fieldsEndoTreat: [
                {
                    id: 0,
                    label: 'Αυτόματος',
                    display: false
                },
                {
                    id: 1,
                    label: 'Προκλητός',
                    display: false
                },
                {
                    id: 2,
                    label: 'Αιτία',
                    display: false
                },
                {
                    id: 3,
                    label: 'Διάρκεια',
                    display: false
                },
                {
                    id: 4,
                    label: 'Μείωση στο ψυχρό',
                    display: false
                },
                {
                    id: 5,
                    label: 'Ιστορικό : Οίδημα',
                    display: false
                },
                {
                    id: 6,
                    label: 'Αίσθηση επιμήκυνησης δοντιού',
                    display: false
                },
                {
                    id: 7,
                    label: 'Πυρετός',
                    display: false
                },
                {
                    id: 8,
                    label: 'Λεμφαδενίτιδα',
                    display: false
                },
                {
                    id: 9,
                    label: 'Άλλα',
                    display: false
                },
                {
                    id: 10,
                    label: 'Προηγούμενη αγωγή',
                    display: false
                },
                {
                    id: 11,
                    label: 'Κλινική εξέταση : Οίδημα',
                    display: false
                },
                {
                    id: 12,
                    label: 'Συρίγγιο',
                    display: false
                },
                {
                    id: 13,
                    label: 'Απόχρωση μύλης',
                    display: false
                },
                {
                    id: 14,
                    label: 'Αποκάλυψη πολφού',
                    display: false
                },
                {
                    id: 15,
                    label: 'Ευαισθησία στη ψηλάφηση ακρορριζικά',
                    display: false
                },
                {
                    id: 16,
                    label: 'Πόνος στην επίκρουση',
                    display: false
                },
                {
                    id: 17,
                    label: 'Ευσειστότητα',
                    display: false
                },
                {
                    id: 18,
                    label: 'Ζωτικότητα',
                    display: false
                },
                {
                    id: 19,
                    label: 'Περιοδοντικοί ιστοί',
                    display: false
                },
                {
                    id: 20,
                    label: 'Ακτινογραφική εξέταση',
                    display: false
                },
                {
                    id: 21,
                    label: 'Επιλογή δοντιού',
                    display: false
                }
            ],

            endoTreatment: {
                automatic: false,
                challenged: false,
                reason: '',
                duration: '',
                reduceToTheCold: false,
                historyEdema: false,
                feelingOfToothElongation: false,
                fever: false,
                lymphadenitis: false,
                others: '',
                previousAction: '',
                treatEdema: false,
                fistula: false,
                tintOfAMill: false,
                revelationOfPulp: '',
                revelationOfPulpCheck: false,
                sensitivityToPalpationAtTheTip: false,
                painInTheAttack: false,
                elation: false,
                vitality: false,
                periodontalTissues: '',
                radiographicExamination: '',
                toothChoise: 0
            }
        }
    },

    methods: {

        /**
         * Εξαφάνιση του πεδίου
         *
         * @param field
         */
        removeFieldEndoTreat (field) {
            this.fieldsEndoTreat[field].display = false
        }
    }
}
</script>

<style lang="scss" scoped>

    input[type=checkbox] {
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