<template>
    <div>

        <div class="col-12 text-center">
            <h1>Δελτίο ενδοδοντικής θεραπείας</h1>
        </div>

        <FieldsList :fields="fields"/>

        <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!fieldSelected">
            Επιλογή πεδίων
        </div>

        <form class="row col-12 mt-3" v-if="fieldSelected">

            <div class="col-lg-6 col-12">

                <div class="col-12 text-center">
                    <h3>Ιστορικό</h3>
                </div>

                <div class="card mb-2" v-if="painFields">
                    <div class="card-header">
                        Πόνος
                    </div>

                    <div class="card-body">
                        <div class="input-group row mb-2" v-if="fields[0].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="automatic" v-model="endoTreatment.automatic">
                            </div>

                            <div class="input-group-text col">
                                <label for="automatic" class="my-1">Αυτόματος</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(0)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[1].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="challenged" v-model="endoTreatment.challenged">
                            </div>

                            <div class="input-group-text col">
                                <label for="challenged" class="my-1">Προκλητός</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(1)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[2].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="reason" class="my-auto">Αιτία</label>
                                </div>
                            </div>

                            <input id="reason" type="text" class="form-control"
                                   v-model="endoTreatment.reason" maxlength="20">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(2)"/>
                            <form-error v-if="response.errors.reason"
                                        :error="response.errors.reason[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[3].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="duration" class="my-auto">Διάρκεια</label>
                                </div>
                            </div>

                            <input id="duration" type="text" class="form-control"
                                   v-model="endoTreatment.duration" maxlength="20">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(3)"/>
                            <form-error v-if="response.errors.duration"
                                        :error="response.errors.duration[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[4].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="reduceToTheCold" v-model="endoTreatment.reduceToTheCold">
                            </div>

                            <div class="input-group-text col">
                                <label for="reduceToTheCold" class="my-1">Μείωση στο ψυχρό</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(4)"/>
                        </div>
                    </div>
                </div>

                <div class="input-group row mb-2" v-if="fields[5].display">
                    <div class="input-group-text">
                        <input type="checkbox" id="historyEdema" v-model="endoTreatment.historyEdema">
                    </div>

                    <div class="input-group-text col">
                        <label for="historyEdema" class="my-1">Οίδημα</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(5)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[6].display">
                    <div class="input-group-text">
                        <input type="checkbox" id="feelingOfToothElongation"
                               v-model="endoTreatment.feelingOfToothElongation">
                    </div>

                    <div class="input-group-text col">
                        <label for="feelingOfToothElongation" class="my-1">Αίσθηση επιμήκυνσης δοντιού</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(6)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[7].display">
                    <div class="input-group-text">
                        <input type="checkbox" id="fever" v-model="endoTreatment.fever">
                    </div>

                    <div class="input-group-text col">
                        <label for="fever" class="my-1">Πυρετός</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(7)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[8].display">
                    <div class="input-group-text">
                        <input type="checkbox" id="lymphadenitis" v-model="endoTreatment.lymphadenitis">
                    </div>

                    <div class="input-group-text col">
                        <label for="lymphadenitis" class="my-1">Λεμφαδενίτιδα</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(8)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[9].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="others" class="my-auto">Άλλα</label>
                        </div>
                    </div>

                    <input id="others" type="text" class="form-control"
                           v-model="endoTreatment.others" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(9)"/>
                    <form-error v-if="response.errors.others"
                                :error="response.errors.others[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[10].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="previousAction" class="my-auto">Προηγούμενη αγωγή</label>
                        </div>
                    </div>

                    <input id="previousAction" type="text" class="form-control"
                           v-model="endoTreatment.previousAction" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(10)"/>
                    <form-error v-if="response.errors.previousAction"
                                :error="response.errors.previousAction[0]"/>
                </div>

            </div>

            <div class="col-lg-6 col-12">

                <div class="col-12 text-center">
                    <h3>Κλινική εξέταση</h3>
                </div>

                <div class="input-group row mb-2" v-if="fields[21].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="toothChoise" class="my-auto">Επιλογή δοντιού</label>
                        </div>
                    </div>

                    <input id="toothChoise" type="text" class="form-control"
                           v-model="endoTreatment.toothChoise" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(21)"/>
                    <form-error v-if="response.errors.toothChoise"
                                :error="response.errors.toothChoise[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[11].display">
                    <div class="input-group-text">
                        <input type="checkbox" id="treatEdema" v-model="endoTreatment.treatEdema">
                    </div>

                    <div class="input-group-text col">
                        <label for="treatEdema" class="my-1">Οίδημα</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(11)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[12].display">
                    <div class="input-group-text">
                        <input type="checkbox" id="fistula" v-model="endoTreatment.fistula">
                    </div>

                    <div class="input-group-text col">
                        <label for="fistula" class="my-1">Συρίγγιο</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(12)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[13].display">
                    <div class="input-group-text">
                        <input type="checkbox" id="tintOfAMill" v-model="endoTreatment.tintOfAMill">
                    </div>

                    <div class="input-group-text col">
                        <label for="tintOfAMill" class="my-1">Απόχρωση μύλης</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(13)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[14].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input type="checkbox" id="revelationOfPulpCheck"
                                   v-model="endoTreatment.revelationOfPulpCheck">
                        </div>

                        <div class="input-group-text">
                            <label for="revelationOfPulp" class="my-auto">Αποκάλυψη πολφού</label>
                        </div>
                    </div>

                    <input id="revelationOfPulp" type="text" class="form-control"
                           v-model="endoTreatment.revelationOfPulp" maxlength="20"
                           :disabled="endoTreatment.revelationOfPulpCheck ? disabled : ''">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(14)"/>
                    <form-error v-if="response.errors.revelationOfPulp"
                                :error="response.errors.revelationOfPulp[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[15].display">
                    <div class="input-group-text">
                        <input type="checkbox" id="sensitivityToPalpationAtTheTip"
                               v-model="endoTreatment.sensitivityToPalpationAtTheTip">
                    </div>

                    <div class="input-group-text col">
                        <label for="sensitivityToPalpationAtTheTip" class="my-1">Ευαισθησία στη ψηλάφηση
                            ακρορριζικά</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(15)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[16].display">
                    <div class="input-group-text">
                        <input type="checkbox" id="painInTheAttack" v-model="endoTreatment.painInTheAttack">
                    </div>

                    <div class="input-group-text col">
                        <label for="painInTheAttack" class="my-1">Πόνος στην επίκρουση</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(16)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[17].display">
                    <div class="input-group-text">
                        <input type="checkbox" id="elation" v-model="endoTreatment.elation">
                    </div>

                    <div class="input-group-text col">
                        <label for="elation" class="my-1">Ευσειστότητα</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(17)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[18].display">
                    <div class="input-group-text">
                        <input type="checkbox" id="vitality" v-model="endoTreatment.vitality">
                    </div>

                    <div class="input-group-text col">
                        <label for="vitality" class="my-1">Ζωτικότητα</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(18)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[19].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="periodontalTissues" class="my-auto">Περιοδοντικοί ιστοί</label>
                        </div>
                    </div>

                    <input id="periodontalTissues" type="text" class="form-control"
                           v-model="endoTreatment.periodontalTissues" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(19)"/>
                    <form-error v-if="response.errors.periodontalTissues"
                                :error="response.errors.periodontalTissues[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[20].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="radiographicExamination" class="my-auto">Ακτινογραφική εξέταση</label>
                        </div>
                    </div>

                    <input id="radiographicExamination" type="text" class="form-control"
                           v-model="endoTreatment.radiographicExamination" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(20)"/>
                    <form-error v-if="response.errors.radiographicExamination"
                                :error="response.errors.radiographicExamination[0]"/>
                </div>

            </div>

        </form>

        <div class="row" v-if="fieldSelected">
            <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                   @click="save()" value="Αποθήκευση">
        </div>

    </div>

</template>

<script>
    import FormError from '@/components/basic/FormError'
    import FieldsList from '@/components/patients/FieldsList'

    export default {
        components: {FormError, FieldsList},

        data() {
            return {
                response: {
                    message: '',
                    status: '',
                    errors: []
                },

                fields: [
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

        computed: {
            fieldSelected() {
                return this.fields.find((field) => {
                    return field.display
                })
            },

            painFields() {
                return (this.fields[0].display || this.fields[1].display || this.fields[2].display || this.fields[3].display || this.fields[4].display)
            }
        },

        methods: {

            /**
             * Εξαφάνιση του πεδίου
             *
             * @param field
             */
            removeField(field) {
                this.fields[field].display = false
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
