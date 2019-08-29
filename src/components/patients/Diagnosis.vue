<template>
    <div>
        <FieldsList :fields="fields" v-if="!loading" />

        <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!fieldSelected && !loading">
            Επιλογή πεδίων
        </div>

        <form @submit.prevent class="row col-lg-7 col-12 mt-3 mx-auto">

            <div class="input-group row mb-2" v-if="fields.revelation.display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" id="revelationCheck" v-model="diagnosis.revelationCheck">
                    </div>

                    <div class="input-group-text">
                        <label for="revelation" class="my-auto">Αποκάλυψη</label>
                    </div>
                </div>

                <input id="revelation" type="text" class="form-control"
                       v-model="diagnosis.revelation" maxlength="20"
                       :disabled="diagnosis.revelationCheck ? 'disabled' : ''">
                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.revelation)"/>
                <form-error v-if="response.errors.revelation"
                            :error="response.errors.revelation[0]"/>
            </div>

            <div class="input-group row mb-2" v-if="fields.hyperemia.display">
                <div class="input-group-text">
                    <input type="checkbox" id="hyperemia" v-model="diagnosis.hyperemia">
                </div>

                <div class="input-group-text col">
                    <label for="hyperemia" class="my-1">Υπεραιμία</label>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.hyperemia)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields.acutePulpitis.display">
                <div class="input-group-text">
                    <input type="checkbox" id="acutePulpitis" v-model="diagnosis.acutePulpitis">
                </div>

                <div class="input-group-text col">
                    <label for="acutePulpitis" class="my-auto">Οξεία πολφίτιδα</label>
                </div>

                <div class="input-group-text">
                    <input type="radio" id="partialAcutePulpitis" name="acutePulpitisChecked"
                           value="partialAcutePulpitis"
                           :disabled="diagnosis.acutePulpitis ? 'disabled' : ''">
                </div>

                <div class="input-group-text">
                    <label for="partialAcutePulpitis" class="my-auto">Μερική</label>
                </div>

                <div class="input-group-text">
                    <input type="radio" id="universalAcutePulpitis" name="acutePulpitisChecked"
                           value="universalAcutePulpitis"
                           :disabled="diagnosis.acutePulpitis ? 'disabled' : ''">
                </div>

                <div class="input-group-text">
                    <label for="universalAcutePulpitis" class="my-auto">Καθολική</label>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.acutePulpitis)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields.chronicPulpitis.display">
                <div class="input-group-text">
                    <input type="checkbox" id="chronicPulpitis" v-model="diagnosis.chronicPulpitis">
                </div>

                <div class="input-group-text col">
                    <label for="chronicPulpitis" class="my-auto">Χρονία πολφίτιδα</label>
                </div>

                <div class="input-group-text">
                    <input type="radio" id="ulceratingChronicPulpitis" name="chronicPulpitisChecked"
                           value="ulceratingChronicPulpitis"
                           :disabled="diagnosis.chronicPulpitis ? 'disabled' : ''">
                </div>

                <div class="input-group-text">
                    <label for="ulceratingChronicPulpitis" class="my-auto">Ελκωτική</label>
                </div>

                <div class="input-group-text">
                    <input type="radio" id="superplasticChronicPulpitis" name="chronicPulpitisChecked"
                           value="superplasticChronicPulpitis"
                           :disabled="diagnosis.chronicPulpitis ? 'disabled' : ''">
                </div>

                <div class="input-group-text">
                    <label for="superplasticChronicPulpitis" class="my-auto">Υπερπλαστική</label>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.chronicPulpitis)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields.necrosis.display">
                <div class="input-group-text">
                    <input type="checkbox" id="necrosis" v-model="diagnosis.necrosis">
                </div>

                <div class="input-group-text col">
                    <label for="necrosis" class="my-1">Νέκρωση</label>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.necrosis)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields.abscess.display">
                <div class="input-group-text">
                    <input type="checkbox" id="abscess" v-model="diagnosis.abscess">
                </div>

                <div class="input-group-text col">
                    <label for="abscess" class="my-1">Απόστημα</label>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.abscess)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields.granulation.display">
                <div class="input-group-text">
                    <input type="checkbox" id="granulation" v-model="diagnosis.granulation">
                </div>

                <div class="input-group-text col">
                    <label for="granulation" class="my-1">Κοκκίωμα</label>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.granulation)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields.cyst.display">
                <div class="input-group-text">
                    <input type="checkbox" id="cyst" v-model="diagnosis.cyst">
                </div>

                <div class="input-group-text col">
                    <label for="cyst" class="my-1">Κύστη</label>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.cyst)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields.reactiveOsteoconduction.display">
                <div class="input-group-text">
                    <input type="checkbox" id="reactiveOsteoconduction"
                           v-model="diagnosis.reactiveOsteoconduction">
                </div>

                <div class="input-group-text col">
                    <label for="reactiveOsteoconduction" class="my-1">Αντιδραστική οστεροπύκνωση</label>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.reactiveOsteoconduction)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields.endoPeriodontalDamage.display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" id="endoPeriodontalDamageCheck"
                               v-model="diagnosis.endoPeriodontalDamageCheck">
                    </div>

                    <div class="input-group-text">
                        <label for="endoPeriodontalDamage" class="my-auto">Ενδοπεριοδοντική βλάβη</label>
                    </div>
                </div>

                <input id="endoPeriodontalDamage" type="text" class="form-control"
                       v-model="diagnosis.endoPeriodontalDamage" maxlength="20"
                       :disabled="diagnosis.endoPeriodontalDamageCheck ? 'disabled' : ''">
                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.endoPeriodontalDamage)"/>
                <form-error v-if="response.errors.endoPeriodontalDamage"
                            :error="response.errors.endoPeriodontalDamage[0]"/>
            </div>

            <div class="input-group row mb-2" v-if="fields.absorption.display">
                <div class="input-group-text">
                    <input type="checkbox" id="absorption" v-model="diagnosis.absorption">
                </div>

                <div class="input-group-text col">
                    <label for="absorption" class="my-auto">Απορρόφηση</label>
                </div>

                <div class="input-group-text">
                    <input type="radio" id="innerAbsorption" name="absorptionChecked"
                           value="innerAbsorption"
                           :disabled="diagnosis.absorption ? 'disabled' : ''">
                </div>

                <div class="input-group-text">
                    <label for="innerAbsorption" class="my-auto">Εσωτερική</label>
                </div>

                <div class="input-group-text">
                    <input type="radio" id="outerAbsorption" name="absorptionChecked"
                           value="outerAbsorption"
                           :disabled="diagnosis.absorption ? 'disabled' : ''">
                </div>

                <div class="input-group-text">
                    <label for="outerAbsorption" class="my-auto">Εξωτερική</label>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.absorption)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields.fracture.display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" id="fractureCheck" v-model="diagnosis.fractureCheck">
                    </div>

                    <div class="input-group-text">
                        <label for="fracture" class="my-auto">Κάταγμα</label>
                    </div>
                </div>

                <input id="fracture" type="text" class="form-control"
                       v-model="diagnosis.fracture" maxlength="20">
                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.fracture)"/>
                <form-error v-if="response.errors.fracture"
                            :error="response.errors.fracture[0]"/>
            </div>

        </form>

        <div class="row" v-if="fieldSelected">
            <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                   @click="updateDiagnosis" value="Αποθήκευση">
        </div>

        <div class="row fixed-bottom mb-2">
            <display-error class="mx-auto"
                           v-if="response.message"
                           :response="response"/>
        </div>

    </div>
</template>

<script>
import FormError from '@/components/basic/FormError'
import FieldsList from '@/components/patients/FieldsList'
import utility from '../../library/utility'
import api from '../../api'
import DisplayError from '@/components/basic/DisplayError'

export default {
    components: { FormError, FieldsList, DisplayError },

    data () {
        return {
            response: {
                message: ' ',
                status: '',
                errors: []
            },

            loading: false,

            fields: {
                revelation: {
                    label: 'Αποκάλυψη',
                    display: false
                },
                hyperemia: {
                    label: 'Υπεραιμία',
                    display: false
                },
                acutePulpitis: {
                    label: 'Οξεία Πολφίτιδα',
                    display: false
                },
                chronicPulpitis: {
                    label: 'Χρονία Πολφίτιδα',
                    display: false
                },
                necrosis: {
                    label: 'Νέκρωση',
                    display: false
                },
                abscess: {
                    label: 'Απόστημα',
                    display: false
                },
                granulation: {
                    label: 'Κοκκίωμα',
                    display: false
                },
                cyst: {
                    label: 'Κύστη',
                    display: false
                },
                reactiveOsteoconduction: {
                    label: 'Αντιδραστική οστεοπύκνωση',
                    display: false
                },
                endoPeriodontalDamage: {
                    label: 'Ενδοπεριοδοντική βλάβη',
                    display: false
                },
                absorption: {
                    label: 'Απορρόφηση',
                    display: false
                },
                fracture: {
                    label: 'Κάταγμα',
                    display: false
                }
            },

            diagnosis: {
                revelation: null,
                revelationCheck: false,
                hyperemia: false,
                acutePulpitis: false,
                partialAcutePulpitis: false,
                universalAcutePulpitis: false,
                chronicPulpitis: false,
                ulceratingChronicPulpitis: false,
                superplasticChronicPulpitis: false,
                necrosis: false,
                abscess: false,
                granulation: false,
                cyst: false,
                reactiveOsteoconduction: false,
                endoPeriodontalDamage: null,
                endoPeriodontalDamageCheck: false,
                absorption: false,
                innerAbsorption: false,
                outerAbsorption: false,
                fracture: null,
                fractureCheck: false
            }
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

    watch: {
        loading () {
            this.$emit('loading', this.loading)
        }
    },

    created: function () {
        this.getDiagnosis()
    },

    methods: {

        /**
         * Get Diagnosis info
         */
        getDiagnosis () {
            this.loading = true

            api.getDiagnosis(this.patientId)
                .then(response => {
                    this.loading = false

                    if (response.status === 200) {
                        this.diagnosis = response.data

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
         * Update the Diagnosis info
         */
        updateDiagnosis () {
            this.loading = true

            api.updateDiagnosis(this.diagnosis, this.patientId)
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
            Object.keys(this.diagnosis).forEach(key => {
                if (this.diagnosis[key] === null || this.diagnosis[key].length < 1) {
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
