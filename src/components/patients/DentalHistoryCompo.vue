<template>
    <div>

        <FieldsList :fields="fields"/>

        <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!fieldSelected">
            Επιλογή πεδίων
        </div>

        <form class="row col-12 mt-3">

            <div class="col-lg-6 col-12">

                <div class="input-group row mb-2" v-if="fields.frequentStrokes.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="frequentStrokes" v-model="dentalHistory.frequentStrokes">
                    </div>

                    <div class="input-group-text col">
                        <label for="frequentStrokes" class="my-1">Συχνές οδονταλγίες</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(dentalHistory.frequentStrokes)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.sensitivityToStimuli.display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input type="checkbox" id="sensitivityToStimuliCheck"
								   v-model="dentalHistory.sensitivityToStimuliCheck">
                        </div>

                        <div class="input-group-text">
                            <label for="sensitivityToStimuli" class="my-auto">Ευαισθησία σε ερεθίσματα</label>
                        </div>
                    </div>

                    <input id="sensitivityToStimuli" type="text" class="form-control"
                           v-model="dentalHistory.sensitivityToStimuli" maxlength="20"
                           :disabled="dentalHistory.sensitivityToStimuliCheck ? disabled : ''">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.sensitivityToStimuli)"/>
                    <form-error v-if="response.errors.sensitivityToStimuli"
                                :error="response.errors.sensitivityToStimuli[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.painWhenChewing.display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input type="checkbox" id="painWhenChewingCheck"
								   v-model="dentalHistory.painWhenChewingCheck">
                        </div>

                        <div class="input-group-text">
                            <label for="painWhenChewing" class="my-auto">Πόνος κατά τη
                                μάσηση</label>
                        </div>

                    </div>

                    <input id="painWhenChewing" type="text" class="form-control"
                           v-model="dentalHistory.painWhenChewing" maxlength="20"
                           :disabled="dentalHistory.painWhenChewingCheck ? disabled : ''">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.painWhenChewing)"/>
                    <form-error v-if="response.errors.painWhenChewing"
                                :error="response.errors.painWhenChewing[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.gingivalBleeding.display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input type="checkbox" id="gingivalBleedingCheck"
								   v-model="dentalHistory.gingivalBleedingCheck">
                        </div>

                        <div class="input-group-text">
                            <label for="gingivalBleeding" class="my-auto">Αιμοραγία
                                ούλων</label>
                        </div>
                    </div>

                    <input id="gingivalBleeding" type="text" class="form-control"
                           v-model="dentalHistory.gingivalBleeding" maxlength="20"
                           :disabled="dentalHistory.gingivalBleedingCheck ? disabled : ''">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.gingivalBleeding)"/>
                    <form-error v-if="response.errors.gingivalBleeding"
                                :error="response.errors.gingivalBleeding[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.tasteAbnormality.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="tasteAbnormality" v-model="dentalHistory.tasteAbnormality">
                    </div>

                    <div class="input-group-text col">
                        <label for="tasteAbnormality" class="my-1">Ανωμαλία
                            γεύσης</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.tasteAbnormality)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.dryMouth.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="dryMouth" v-model="dentalHistory.dryMouth">
                    </div>

                    <div class="input-group-text col">
                        <label for="dryMouth" class="my-1">Ξηροστομία</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.dryMouth)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.badSmell.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="badSmell" v-model="dentalHistory.badSmell">
                    </div>

                    <div class="input-group-text col">
                        <label for="badSmell" class="my-1">Κακοσμία</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.badSmell)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.burningMouth.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="burningMouth" v-model="dentalHistory.burningMouth">
                    </div>

                    <div class="input-group-text col">
                        <label for="burningMouth" class="my-1">Καυσαλγία</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.burningMouth)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.painFromCrownFibrousStructure.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="painFromCrownFibrousStructure"
							   v-model="dentalHistory.painFromCrownFibrousStructure">
                    </div>

                    <div class="input-group-text col">
                        <label for="painFromCrownFibrousStructure" class="my-1">Πόνος
                            από ΚΓΔ</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.painFromCrownFibrousStructure)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.soundFromCrownFibrousStructure.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="soundFromCrownFibrousStructure"
							   v-model="dentalHistory.soundFromCrownFibrousStructure">
                    </div>

                    <div class="input-group-text col">
                        <label for="soundFromCrownFibrousStructure" class="my-1">Ήχος
                            από ΚΓΔ</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.soundFromCrownFibrousStructure)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.prosopalgia.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="prosopalgia" v-model="dentalHistory.prosopalgia">
                    </div>

                    <div class="input-group-text col">
                        <label for="prosopalgia" class="my-1">Προσωπαλγία</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.prosopalgia)"/>
                </div>

            </div>

            <div class="col-lg-6 col-12">

                <div class="input-group row mb-2" v-if="fields.surgicalProcedures.display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="surgicalProcedures" class="my-auto">Χειρουργικές
                                επεμβάσεις</label>
                        </div>
                    </div>

                    <input id="surgicalProcedures" type="text" class="form-control"
                           v-model="dentalHistory.surgicalProcedures" maxlength="60">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.surgicalProcedures)"/>
                    <form-error v-if="response.errors.surgicalProcedures"
                                :error="response.errors.surgicalProcedures[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.traumaticLesions.display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="traumaticLesions" class="my-auto">Τραυματικές
                                βλάβες</label>
                        </div>
                    </div>

                    <input id="traumaticLesions" type="text" class="form-control"
                           v-model="dentalHistory.traumaticLesions" maxlength="60">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.traumaticLesions)"/>
                    <form-error v-if="response.errors.traumaticLesions"
                                :error="response.errors.traumaticLesions[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.problemsWithLocalAnesthesia.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="problemsWithLocalAnesthesia"
							   v-model="dentalHistory.problemsWithLocalAnesthesia">
                    </div>

                    <div class="input-group-text col">
                        <label for="problemsWithLocalAnesthesia" class="my-1">Προβλήματα
                            με τοπική αναισθησία</label>
                    </div>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.problemsWithLocalAnesthesia)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.radiotherapy.display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="radiotherapy" class="my-auto">Ακτινοθεραπεία</label>
                        </div>
                    </div>

                    <input id="radiotherapy" type="text" class="form-control"
                           v-model="dentalHistory.radiotherapy" maxlength="60">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.radiotherapy)"/>
                    <form-error v-if="response.errors.radiotherapy"
                                :error="response.errors.radiotherapy[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.oralSprains.display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="oralSprains" class="my-auto">Στοματικές
                                έξεις</label>
                        </div>
                    </div>

                    <input id="oralSprains" type="text" class="form-control"
                           v-model="dentalHistory.oralSprains" maxlength="60">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.oralSprains)"/>
                    <form-error v-if="response.errors.oralSprains"
                                :error="response.errors.oralSprains[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.oralHygiene.display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="oralHygiene" class="my-auto">Στοματική
                                υγιεινή</label>
                        </div>
                    </div>

                    <input id="oralHygiene" type="text" class="form-control"
                           v-model="dentalHistory.oralHygiene" maxlength="60">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
										  @click="removeField(fields.oralHygiene)"/>
                    <form-error v-if="response.errors.oralHygiene"
                                :error="response.errors.oralHygiene[0]"/>
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
    components: { FormError, FieldsList },

    data () {
        return {
            response: {
                message: '',
                status: '',
                errors: []
            },

            fields: {
				frequentStrokes: {
                    label: 'Συχνές οδονταλγίες',
                    display: false
                },
				sensitivityToStimuli: {
                    label: 'Ευαισθησία σε ερεθίσματα',
                    display: false
                },
				painWhenChewing: {
                    label: 'Πόνος κατά τη μάσηση',
                    display: false
                },
				gingivalBleeding: {
                    label: 'Αιμοραγία ούλων',
                    display: false
                },
				tasteAbnormality: {
                    label: 'Ανωμαλία γεύσης',
                    display: false
                },
				dryMouth: {
                    label: 'Ξηροστομία',
                    display: false
                },
				badSmell: {
                    label: 'Κακοσμία',
                    display: false
                },
				burningMouth: {
                    label: 'Καυσαλγία',
                    display: false
                },
				painFromCrownFibrousStructure: {
                    label: 'Πόνος από ΚΓΔ',
                    display: false
                },
				soundFromCrownFibrousStructure: {
                    label: 'Ήχος από ΚΓΔ',
                    display: false
                },
				prosopalgia: {
                    label: 'Προσωπαλγία',
                    display: false
                },
				surgicalProcedures: {
                    label: 'Χειρουργικές επεμβάσεις',
                    display: false
                },
				traumaticLesions: {
                    label: 'Τραυματικές βλάβες',
                    display: false
                },
				problemsWithLocalAnesthesia: {
                    label: 'Προβλήματα με τοπική αναισθησία',
                    display: false
                },
				radiotherapy: {
                    label: 'Ακτινοθεραπεία',
                    display: false
                },
				oralSprains: {
                    label: 'Στοματικές έξεις',
                    display: false
                },
				oralHygiene: {
                    label: 'Στοματική υγιεινή',
                    display: false
                }
            },

            dentalHistory: {
                frequentStrokes: false,
                sensitivityToStimuli: '',
                sensitivityToStimuliCheck: false,
                painWhenChewing: '',
                painWhenChewingCheck: false,
                gingivalBleeding: '',
                gingivalBleedingCheck: false,
                tasteAbnormality: false,
                dryMouth: false,
                badSmell: false,
                burningMouth: false,
                painFromCrownFibrousStructure: false,
                soundFromCrownFibrousStructure: false,
                prosopalgia: false,
                surgicalProcedures: '',
                traumaticLesions: '',
                problemsWithLocalAnesthesia: false,
                radiotherapy: '',
                oralSprains: '',
                oralHygiene: ''
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
    },

	created: function () {
		// this.getDentalHistory()
	},

    methods: {

		/**
		 * Check for fields. If not empty, display it
		 */
		checkFields ()
		{
			Object.keys(this.medicalHistory).forEach(key => {
				if (this.medicalHistory[key] === null || this.medicalHistory[key].length<1) {
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
