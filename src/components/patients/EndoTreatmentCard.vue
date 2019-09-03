<template>
    <div>
        <FieldsList :fields="fields" v-if="!loading" />

        <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!fieldSelected && !loading">
            Επιλογή πεδίων
        </div>

        <form @submit.prevent class="row col-12 mt-3 no-gutters" v-if="fieldSelected">

            <div class="col-lg-6 col-12 px-1">

                <div class="col-12 text-center">
                    <h3>Ιστορικό</h3>
                </div>

                <div class="card mb-2 col-12 row" v-if="fields.pain.display">

                    <div class="card-header row">
                        <span>Πόνος</span>
                        <minus-circle-outline v-if="haveNoPain"
                                              class="removeItem my-auto ml-auto" title="Αφαίρεση πεδίου"
                                              @click="removeField(fields.pain)"/>
                    </div>

                    <div class="card-body row px-0 ml-1">
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

            <div class="col-lg-6 col-12 px-1">

                <div class="col-12 text-center">
                    <h3>Κλινική εξέταση</h3>
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

                <div class="col-12 text-center">
                    <h3>Διάγνωση</h3>
                </div>

                <div class="card mb-2 col-12 row" v-if="havePulseFields">

                    <div class="card-header row">
                        <span>Πολφός</span>
                    </div>

                    <div class="card-body row px-0 ml-1">

                        <div class="input-group row mb-2" v-if="fields.revelationCheck.display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="checkbox" id="revelationCheck" v-model="endoTreatment.revelationCheck">
                                </div>

                                <div class="input-group-text">
                                    <label for="revelation" class="my-auto">Αποκάλυψη</label>
                                </div>
                            </div>

                            <input id="revelation" type="text" class="form-control"
                                   v-model="endoTreatment.revelation" maxlength="20"
                                   :disabled="!endoTreatment.revelationCheck">
                            <minus-circle-outline v-if="!endoTreatment.revelationCheck"
                                                  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.revelationCheck)"/>
                            <form-error v-if="response.errors.revelation"
                                        :error="response.errors.revelation[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.hyperemia.display">
                            <div class="input-group-text">
                                <input type="checkbox" id="hyperemia" v-model="endoTreatment.hyperemia">
                            </div>

                            <div class="input-group-text col">
                                <label for="hyperemia" class="my-1">Υπεραιμία</label>
                            </div>

                            <minus-circle-outline v-if="!endoTreatment.hyperemia"
                                                  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.hyperemia)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.acutePulpitis.display">
                            <div class="input-group-text">
                                <input type="checkbox" id="acutePulpitis" v-model="endoTreatment.acutePulpitis">
                            </div>

                            <div class="input-group-text col">
                                <label for="acutePulpitis" class="my-auto">Οξεία πολφίτιδα</label>
                            </div>

                            <div class="input-group-text">
                                <input type="radio" id="partialAcutePulpitis" name="acutePulpitisChecked"
                                       value="partialAcutePulpitis"
                                       :disabled="!endoTreatment.acutePulpitis">
                            </div>

                            <div class="input-group-text">
                                <label for="partialAcutePulpitis" class="my-auto">Μερική</label>
                            </div>

                            <div class="input-group-text">
                                <input type="radio" id="universalAcutePulpitis" name="acutePulpitisChecked"
                                       value="universalAcutePulpitis"
                                       :disabled="!endoTreatment.acutePulpitis">
                            </div>

                            <div class="input-group-text">
                                <label for="universalAcutePulpitis" class="my-auto">Καθολική</label>
                            </div>

                            <minus-circle-outline v-if="!endoTreatment.acutePulpitis"
                                                  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.acutePulpitis)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.chronicPulpitis.display">
                            <div class="input-group-text">
                                <input type="checkbox" id="chronicPulpitis" v-model="endoTreatment.chronicPulpitis">
                            </div>

                            <div class="input-group-text col">
                                <label for="chronicPulpitis" class="my-auto">Χρον. πολφίτιδα</label>
                            </div>

                            <div class="input-group-text">
                                <input type="radio" id="ulceratingChronicPulpitis" name="chronicPulpitisChecked"
                                       value="ulceratingChronicPulpitis"
                                       :disabled="!endoTreatment.chronicPulpitis">
                            </div>

                            <div class="input-group-text">
                                <label for="ulceratingChronicPulpitis" class="my-auto">Ελκωτική</label>
                            </div>

                            <div class="input-group-text">
                                <input type="radio" id="superplasticChronicPulpitis" name="chronicPulpitisChecked"
                                       value="superplasticChronicPulpitis"
                                       :disabled="!endoTreatment.chronicPulpitis">
                            </div>

                            <div class="input-group-text">
                                <label for="superplasticChronicPulpitis" class="my-auto">Υπερπλαστική</label>
                            </div>

                            <minus-circle-outline v-if="!endoTreatment.chronicPulpitis"
                                                  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.chronicPulpitis)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.necrosis.display">
                            <div class="input-group-text">
                                <input type="checkbox" id="necrosis" v-model="endoTreatment.necrosis">
                            </div>

                            <div class="input-group-text col">
                                <label for="necrosis" class="my-1">Νέκρωση</label>
                            </div>

                            <minus-circle-outline v-if="!endoTreatment.necrosis"
                                                  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.necrosis)"/>
                        </div>

                    </div>
                </div>

                <div class="card mb-2 col-12 row" v-if="haveTissuesFields">

                    <div class="card-header row">
                        <span>Περιακροριζικοί ιστοί</span>
                    </div>

                    <div class="card-body row px-0 ml-1">

                        <div class="input-group row mb-2" v-if="fields.abscess.display">
                            <div class="input-group-text">
                                <input type="checkbox" id="abscess" v-model="endoTreatment.abscess">
                            </div>

                            <div class="input-group-text col">
                                <label for="abscess" class="my-1">Απόστημα</label>
                            </div>

                            <minus-circle-outline v-if="!endoTreatment.abscess"
                                                  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.abscess)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.granulation.display">
                            <div class="input-group-text">
                                <input type="checkbox" id="granulation" v-model="endoTreatment.granulation">
                            </div>

                            <div class="input-group-text col">
                                <label for="granulation" class="my-1">Κοκκίωμα</label>
                            </div>

                            <minus-circle-outline v-if="!endoTreatment.granulation"
                                                  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.granulation)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.cyst.display">
                            <div class="input-group-text">
                                <input type="checkbox" id="cyst" v-model="endoTreatment.cyst">
                            </div>

                            <div class="input-group-text col">
                                <label for="cyst" class="my-1">Κύστη</label>
                            </div>

                            <minus-circle-outline v-if="!endoTreatment.cyst"
                                                  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.cyst)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields.reactiveOsteoconduction.display">
                            <div class="input-group-text">
                                <input type="checkbox" id="reactiveOsteoconduction"
                                       v-model="endoTreatment.reactiveOsteoconduction">
                            </div>

                            <div class="input-group-text col">
                                <label for="reactiveOsteoconduction" class="my-1">Αντιδραστική οστεροπύκνωση</label>
                            </div>

                            <minus-circle-outline v-if="!endoTreatment.reactiveOsteoconduction"
                                                  class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                                  @click="removeField(fields.reactiveOsteoconduction)"/>
                        </div>

                    </div>
                </div>

                <div class="input-group row mb-2" v-if="fields.endoPeriodontalDamageCheck.display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input type="checkbox" id="endoPeriodontalDamageCheck"
                                   v-model="endoTreatment.endoPeriodontalDamageCheck">
                        </div>

                        <div class="input-group-text">
                            <label for="endoPeriodontalDamage" class="my-auto">Ενδοπεριοδοντική βλάβη</label>
                        </div>
                    </div>

                    <input id="endoPeriodontalDamage" type="text" class="form-control"
                           v-model="endoTreatment.endoPeriodontalDamage" maxlength="20"
                           :disabled="!endoTreatment.endoPeriodontalDamageCheck">
                    <minus-circle-outline v-if="!endoTreatment.endoPeriodontalDamageCheck"
                                          class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.endoPeriodontalDamageCheck)"/>
                    <form-error v-if="response.errors.endoPeriodontalDamage"
                                :error="response.errors.endoPeriodontalDamage[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.absorption.display">
                    <div class="input-group-text">
                        <input type="checkbox" id="absorption" v-model="endoTreatment.absorption">
                    </div>

                    <div class="input-group-text col">
                        <label for="absorption" class="my-auto">Απορρόφηση</label>
                    </div>

                    <div class="input-group-text">
                        <input type="radio" id="innerAbsorption" name="absorptionChecked"
                               value="innerAbsorption"
                               :disabled="!endoTreatment.absorption">
                    </div>

                    <div class="input-group-text">
                        <label for="innerAbsorption" class="my-auto">Εσωτερική</label>
                    </div>

                    <div class="input-group-text">
                        <input type="radio" id="outerAbsorption" name="absorptionChecked"
                               value="outerAbsorption"
                               :disabled="!endoTreatment.absorption">
                    </div>

                    <div class="input-group-text">
                        <label for="outerAbsorption" class="my-auto">Εξωτερική</label>
                    </div>

                    <minus-circle-outline v-if="!endoTreatment.absorption"
                                          class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.absorption)"/>
                </div>

                <div class="input-group row mb-2" v-if="fields.fracture.display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input type="checkbox" id="fractureCheck" v-model="endoTreatment.fractureCheck">
                        </div>

                        <div class="input-group-text">
                            <label for="fracture" class="my-auto">Κάταγμα</label>
                        </div>
                    </div>

                    <input id="fracture" type="text" class="form-control"
                           v-model="endoTreatment.fracture" maxlength="20">
                    <minus-circle-outline v-if="!endoTreatment.fractureCheck"
                                          class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.fracture)"/>
                    <form-error v-if="response.errors.fracture"
                                :error="response.errors.fracture[0]"/>
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

    props: {
        chozenTooth: Object
    },

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
                revelationCheck: {
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
                endoPeriodontalDamageCheck: {
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

        // Check if any of pulse fields are enabled
        havePulseFields () {
            return (
                this.fields.revelationCheck.display ||
                this.fields.hyperemia.display ||
                this.fields.acutePulpitis.display ||
                this.fields.chronicPulpitis.display ||
                this.fields.necrosis.display
            )
        },

        // Check if any of tissues fields are enabled
        haveTissuesFields () {
            return (
                this.fields.abscess.display ||
                this.fields.granulation.display ||
                this.fields.cyst.display ||
                this.fields.reactiveOsteoconduction.display
            )
        },

        patientId: function () {
            return this.$route.params.id
        },

        toothNumber: function () {
            return this.chozenTooth.number
        }
    },

    watch: {
        // Send back to parent component
        loading () {
            this.$emit('loading', this.loading)
        },

        toothNumber () {
            this.getEndoTreatmentCard()
        }
    },

    created: function () {
        // this.getEndoTreatmentCard()
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

            api.getEndoTreatmentCard(this.patientId, this.toothNumber)
                .then(response => {
                    this.loading = false

                    if (response.status === 200) {
                        this.endoTreatment = response.data

                        this.checkEndoTreatmentFields()
                    }

                    if (response.status === 204) {
                        this.resetEndotreatment()

						this.setAllFieldsFalse()
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
        checkEndoTreatmentFields () {
            Object.keys(this.endoTreatment).forEach(key => {
                if (this.endoTreatment[key] === null ||
                    this.endoTreatment[key] === 0 ||
                    this.endoTreatment[key].length < 1) {
                    return
                }

                if (this.fields[key] === undefined) {
                    return
                }

                this.fields[key].display = true
            })

            this.fields.pain.display = this.painFields()
        },

		// Reset fields
        setAllFieldsFalse () {
            Object.keys(this.fields).forEach(key =>
                this.fields[key].display = false
            )
        },

        /**
         * Εξαφάνιση του πεδίου
         *
         * @param field
         */
        removeField (field) {
            field.display = false
        },

		// Reset values of endoTreatment
		resetEndotreatment () {
			this.endoTreatment = {
				patient_id: this.patientId,
				tooth_number: this.toothNumber,
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
