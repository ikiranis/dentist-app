<template>
    <div>
        <FieldsList :fields="fields" v-if="!loading" />

        <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!fieldSelected && !loading">
            Επιλογή πεδίων
        </div>

        <form @submit.prevent class="row col-12 mt-3" v-if="fieldSelected">

            <div class="col-lg-6 col-12">

                <div class="col-12 text-center">
                    <h3>Ιστορικό</h3>
                </div>

                <div class="card mb-2" v-if="fields.pain.display">
                    <div class="card-header">
						<div class="row">
							<span>Πόνος</span>
							<minus-circle-outline v-if="haveNoPain"
												  class="removeItem my-auto ml-auto" title="Αφαίρεση πεδίου"
												  @click="removeField(fields.pain)"/>
						</div>

                    </div>

                    <div class="card-body">
                        <div class="input-group row mb-2" >
                            <div class="input-group-text">
                                <input type="checkbox" id="automatic" v-model="endoTreatment.automatic">
                            </div>

                            <div class="input-group-text col">
                                <label for="automatic" class="my-1">Αυτόματος</label>
                            </div>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-text">
                                <input type="checkbox" id="challenged" v-model="endoTreatment.challenged">
                            </div>

                            <div class="input-group-text col">
                                <label for="challenged" class="my-1">Προκλητός</label>
                            </div>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="reason" class="my-auto">Αιτία</label>
                                </div>
                            </div>

                            <input id="reason" type="text" class="form-control"
                                   v-model="endoTreatment.reason" maxlength="20">
                            <form-error v-if="response.errors.reason"
                                        :error="response.errors.reason[0]"/>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="duration" class="my-auto">Διάρκεια</label>
                                </div>
                            </div>

                            <input id="duration" type="text" class="form-control"
                                   v-model="endoTreatment.duration" maxlength="20">
                            <form-error v-if="response.errors.duration"
                                        :error="response.errors.duration[0]"/>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-text">
                                <input type="checkbox" id="reduceToTheCold" v-model="endoTreatment.reduceToTheCold">
                            </div>

                            <div class="input-group-text col">
                                <label for="reduceToTheCold" class="my-1">Μείωση στο ψυχρό</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="input-group row mb-2" v-if="fields.historyEdema.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="historyEdema" v-model="endoTreatment.historyEdema">
                    </div>

                    <div class="input-group-text col">
                        <label for="historyEdema" class="my-1">Οίδημα</label>
                    </div>

                    <minus-circle-outline v-if="!endoTreatment.historyEdema"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.historyEdema)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.feelingOfToothElongation.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="feelingOfToothElongation"
                               v-model="endoTreatment.feelingOfToothElongation">
                    </div>

                    <div class="input-group-text col">
                        <label for="feelingOfToothElongation" class="my-1">Αίσθηση επιμήκυνσης δοντιού</label>
                    </div>

                    <minus-circle-outline v-if="!endoTreatment.feelingOfToothElongation"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.feelingOfToothElongation)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.fever.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="fever" v-model="endoTreatment.fever">
                    </div>

                    <div class="input-group-text col">
                        <label for="fever" class="my-1">Πυρετός</label>
                    </div>

                    <minus-circle-outline v-if="!endoTreatment.fever"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.fever)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.lymphadenitis.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="lymphadenitis" v-model="endoTreatment.lymphadenitis">
                    </div>

                    <div class="input-group-text col">
                        <label for="lymphadenitis" class="my-1">Λεμφαδενίτιδα</label>
                    </div>

                    <minus-circle-outline v-if="!endoTreatment.lymphadenitis"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.lymphadenitis)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.others.display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="others" class="my-auto">Άλλα</label>
                        </div>
                    </div>

                    <input id="others" type="text" class="form-control"
                           v-model="endoTreatment.others" maxlength="20">
                    <minus-circle-outline v-if="!endoTreatment.others"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.others)"/>
                    <form-error v-if="response.errors.others"
                                :error="response.errors.others[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.previousAction.display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="previousAction" class="my-auto">Προηγούμενη αγωγή</label>
                        </div>
                    </div>

                    <input id="previousAction" type="text" class="form-control"
                           v-model="endoTreatment.previousAction" maxlength="20">
                    <minus-circle-outline v-if="!endoTreatment.previousAction"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.previousAction)"/>
                    <form-error v-if="response.errors.previousAction"
                                :error="response.errors.previousAction[0]"/>
                </div>

            </div>

            <div class="col-lg-6 col-12">

                <div class="col-12 text-center">
                    <h3>Κλινική εξέταση</h3>
                </div>

                <div class="input-group row mb-2" v-if="fields.toothChoise.display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="toothChoise" class="my-auto">Επιλογή δοντιού</label>
                        </div>
                    </div>

                    <input id="toothChoise" type="text" class="form-control"
                           v-model="endoTreatment.toothChoise" maxlength="20">
                    <minus-circle-outline v-if="!endoTreatment.toothChoise"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.toothChoise)"/>
                    <form-error v-if="response.errors.toothChoise"
                                :error="response.errors.toothChoise[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.treatEdema.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="treatEdema" v-model="endoTreatment.treatEdema">
                    </div>

                    <div class="input-group-text col">
                        <label for="treatEdema" class="my-1">Οίδημα</label>
                    </div>

                    <minus-circle-outline v-if="!endoTreatment.treatEdema"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.treatEdema)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.fistula.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="fistula" v-model="endoTreatment.fistula">
                    </div>

                    <div class="input-group-text col">
                        <label for="fistula" class="my-1">Συρίγγιο</label>
                    </div>

                    <minus-circle-outline v-if="!endoTreatment.fistula"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.fistula)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.tintOfAMill.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="tintOfAMill" v-model="endoTreatment.tintOfAMill">
                    </div>

                    <div class="input-group-text col">
                        <label for="tintOfAMill" class="my-1">Απόχρωση μύλης</label>
                    </div>

                    <minus-circle-outline v-if="!endoTreatment.tintOfAMill"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.tintOfAMill)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.revelationOfPulpCheck.display">
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
                           :disabled="!endoTreatment.revelationOfPulpCheck">
                    <minus-circle-outline v-if="!endoTreatment.revelationOfPulpCheck"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.revelationOfPulpCheck)"/>
                    <form-error v-if="response.errors.revelationOfPulp"
                                :error="response.errors.revelationOfPulp[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.sensitivityToPalpationAtTheTip.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="sensitivityToPalpationAtTheTip"
                               v-model="endoTreatment.sensitivityToPalpationAtTheTip">
                    </div>

                    <div class="input-group-text col">
                        <label for="sensitivityToPalpationAtTheTip" class="my-1">Ευαισθησία στη ψηλάφηση
                            ακρορριζικά</label>
                    </div>

                    <minus-circle-outline v-if="!endoTreatment.sensitivityToPalpationAtTheTip"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.sensitivityToPalpationAtTheTip)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.painInTheAttack.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="painInTheAttack" v-model="endoTreatment.painInTheAttack">
                    </div>

                    <div class="input-group-text col">
                        <label for="painInTheAttack" class="my-1">Πόνος στην επίκρουση</label>
                    </div>

                    <minus-circle-outline v-if="!endoTreatment.painInTheAttack"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.painInTheAttack)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.elation.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="elation" v-model="endoTreatment.elation">
                    </div>

                    <div class="input-group-text col">
                        <label for="elation" class="my-1">Ευσειστότητα</label>
                    </div>

                    <minus-circle-outline v-if="!endoTreatment.elation"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.elation)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.vitality.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="vitality" v-model="endoTreatment.vitality">
                    </div>

                    <div class="input-group-text col">
                        <label for="vitality" class="my-1">Ζωτικότητα</label>
                    </div>

                    <minus-circle-outline v-if="!endoTreatment.vitality"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.vitality)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.periodontalTissues.display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="periodontalTissues" class="my-auto">Περιοδοντικοί ιστοί</label>
                        </div>
                    </div>

                    <input id="periodontalTissues" type="text" class="form-control"
                           v-model="endoTreatment.periodontalTissues" maxlength="20">
                    <minus-circle-outline v-if="!endoTreatment.periodontalTissues"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.periodontalTissues)"/>
                    <form-error v-if="response.errors.periodontalTissues"
                                :error="response.errors.periodontalTissues[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.radiographicExamination.display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="radiographicExamination" class="my-auto">Ακτινογραφική εξέταση</label>
                        </div>
                    </div>

                    <input id="radiographicExamination" type="text" class="form-control"
                           v-model="endoTreatment.radiographicExamination" maxlength="20">
                    <minus-circle-outline v-if="!endoTreatment.radiographicExamination"
										  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.radiographicExamination)"/>
                    <form-error v-if="response.errors.radiographicExamination"
                                :error="response.errors.radiographicExamination[0]"/>
                </div>

            </div>

        </form>

        <div class="row" v-if="fieldSelected">
            <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                   @click="updateEndoTreatmentCard" value="Αποθήκευση">
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
				pain: {
					label: 'Πόνος',
					display: false
				},
                historyEdema: {
                    label: 'Ιστορικό : Οίδημα',
                    display: false
                },
                feelingOfToothElongation: {
                    label: 'Αίσθηση επιμήκυνησης δοντιού',
                    display: false
                },
                fever: {
                    label: 'Πυρετός',
                    display: false
                },
                lymphadenitis: {
                    label: 'Λεμφαδενίτιδα',
                    display: false
                },
                others: {
                    label: 'Άλλα',
                    display: false
                },
                previousAction: {
                    label: 'Προηγούμενη αγωγή',
                    display: false
                },
                treatEdema: {
                    label: 'Κλινική εξέταση : Οίδημα',
                    display: false
                },
                fistula: {
                    label: 'Συρίγγιο',
                    display: false
                },
                tintOfAMill: {
                    label: 'Απόχρωση μύλης',
                    display: false
                },
				revelationOfPulpCheck: {
                    label: 'Αποκάλυψη πολφού',
                    display: false
                },
                sensitivityToPalpationAtTheTip: {
                    label: 'Ευαισθησία στη ψηλάφηση ακρορριζικά',
                    display: false
                },
                painInTheAttack: {
                    label: 'Πόνος στην επίκρουση',
                    display: false
                },
                elation: {
                    label: 'Ευσειστότητα',
                    display: false
                },
                vitality: {
                    label: 'Ζωτικότητα',
                    display: false
                },
                periodontalTissues: {
                    label: 'Περιοδοντικοί ιστοί',
                    display: false
                },
                radiographicExamination: {
                    label: 'Ακτινογραφική εξέταση',
                    display: false
                },
                toothChoise: {
                    label: 'Επιλογή δοντιού',
                    display: false
                }
            },

            endoTreatment: {
                automatic: false,
                challenged: false,
                reason: null,
                duration: null,
                reduceToTheCold: false,
                historyEdema: false,
                feelingOfToothElongation: false,
                fever: false,
                lymphadenitis: false,
                others: null,
                previousAction: null,
                treatEdema: false,
                fistula: false,
                tintOfAMill: false,
                revelationOfPulp: null,
                revelationOfPulpCheck: false,
                sensitivityToPalpationAtTheTip: false,
                painInTheAttack: false,
                elation: false,
                vitality: false,
                periodontalTissues: null,
                radiographicExamination: null,
                toothChoise: 0
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

		// Return true if all fields have no value
		haveNoPain () {
        	return (
				!this.endoTreatment.automatic &&
				!this.endoTreatment.challenged &&
				!this.endoTreatment.reason &&
				!this.endoTreatment.duration &&
				!this.endoTreatment.reduceToTheCold
			)
		},

        patientId: function () {
            return this.$route.params.id
        }
    },

    watch: {
    	// Send back to parent component
        loading () {
            this.$emit('loading', this.loading)
        }
    },

    created: function () {
        this.getEndoTreatmentCard()
    },

    methods: {
		// Check if any of these fields have value. Return true if any
		painFields () {
			return (
				this.endoTreatment.automatic ||
				this.endoTreatment.challenged ||
				this.endoTreatment.reason ||
				this.endoTreatment.duration ||
				this.endoTreatment.reduceToTheCold
			)
		},

        /**
         * Get Endo Treatment Card info
         */
        getEndoTreatmentCard () {
            this.loading = true

            api.getEndoTreatmentCard(this.patientId)
                .then(response => {
                    this.loading = false

                    if (response.status === 200) {
                        this.endoTreatment = response.data

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
         * Update the Endo Treatment Card info
         */
        updateEndoTreatmentCard () {
            this.loading = true

            api.updateEndoTreatmentCard(this.endoTreatment, this.patientId)
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
            Object.keys(this.endoTreatment).forEach(key => {
                if (this.endoTreatment[key] === null
					|| this.endoTreatment[key] === 0
					|| this.endoTreatment[key].length < 1) {
                    return
                }

                if (this.fields[key] === undefined) {
                    return
                }

                this.fields[key].display = true
            })

			this.fields.pain.display = this.painFields()
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
