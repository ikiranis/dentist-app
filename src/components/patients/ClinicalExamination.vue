<template>
    <div>

        <div class="col-12 text-center">
            <h1>Κλινική εξέταση</h1>
        </div>

        <FieldsList :fields="fields"/>

        <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!fieldSelected">
            Επιλογή πεδίων
        </div>

        <form class="row col-12 mt-3" v-if="fieldSelected">

            <div class="col-lg-6 col-12">

                <div class="col-12 text-center">
                    <h3>Εξωστοματική</h3>
                </div>

                <div class="input-group row mb-2" v-if="fields[0].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="edema" class="my-auto">Οίδημα</label>
                        </div>
                    </div>

                    <input id="edema" type="text" class="form-control"
                           v-model="clinicalExamination.edema" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(0)"/>
                    <form-error v-if="response.errors.edema"
                                :error="response.errors.edema[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[1].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="asymmetry" class="my-auto">Ασυμετρία</label>
                        </div>
                    </div>

                    <input id="asymmetry" type="text" class="form-control"
                           v-model="clinicalExamination.asymmetry" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(1)"/>
                    <form-error v-if="response.errors.asymmetry"
                                :error="response.errors.asymmetry[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[2].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="swelling" class="my-auto">Διόγκωση</label>
                        </div>
                    </div>

                    <input id="swelling" type="text" class="form-control"
                           v-model="clinicalExamination.swelling" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(2)"/>
                    <form-error v-if="response.errors.swelling"
                                :error="response.errors.swelling[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[3].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="damages" class="my-auto">Βλάβες</label>
                        </div>
                    </div>

                    <input id="damages" type="text" class="form-control"
                           v-model="clinicalExamination.damages" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(3)"/>
                    <form-error v-if="response.errors.damages"
                                :error="response.errors.damages[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[4].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="complexion" class="my-auto">Χροιά</label>
                        </div>
                    </div>

                    <input id="complexion" type="text" class="form-control"
                           v-model="clinicalExamination.complexion" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(4)"/>
                    <form-error v-if="response.errors.complexion"
                                :error="response.errors.complexion[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[5].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="convulsion" class="my-auto">Συγχειλίτιδα</label>
                        </div>
                    </div>

                    <input id="convulsion" type="text" class="form-control"
                           v-model="clinicalExamination.convulsion" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(5)"/>
                    <form-error v-if="response.errors.convulsion"
                                :error="response.errors.convulsion[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[6].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="neckEdema" class="my-auto">Τράχηλος : Οίδημα</label>
                        </div>
                    </div>

                    <input id="neckEdema" type="text" class="form-control"
                           v-model="clinicalExamination.neckEdema" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(6)"/>
                    <form-error v-if="response.errors.neckEdema"
                                :error="response.errors.neckEdema[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[7].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="neckSwelling" class="my-auto">Τράχηλος : Διόγκωση</label>
                        </div>
                    </div>

                    <input id="neckSwelling" type="text" class="form-control"
                           v-model="clinicalExamination.neckSwelling" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(7)"/>
                    <form-error v-if="response.errors.neckSwelling"
                                :error="response.errors.neckSwelling[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[8].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="hypotensionLymphNodes" class="my-auto">Υπογενείδιοι λεμφαδένες</label>
                        </div>
                    </div>

                    <input id="hypotensionLymphNodes" type="text" class="form-control"
                           v-model="clinicalExamination.hypotensionLymphNodes" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(8)"/>
                    <form-error v-if="response.errors.hypotensionLymphNodes"
                                :error="response.errors.hypotensionLymphNodes[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[9].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="submandibularLymphNodes" class="my-auto">Υπογνάθιοι λεμφαδένες</label>
                        </div>
                    </div>

                    <input id="submandibularLymphNodes" type="text" class="form-control"
                           v-model="clinicalExamination.submandibularLymphNodes" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(9)"/>
                    <form-error v-if="response.errors.submandibularLymphNodes"
                                :error="response.errors.submandibularLymphNodes[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[10].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="superficialCervicalLymphNodes" class="my-auto">Επιπολής τραχηλικοί λεμφαδένες</label>
                        </div>
                    </div>

                    <input id="superficialCervicalLymphNodes" type="text" class="form-control"
                           v-model="clinicalExamination.superficialCervicalLymphNodes" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(10)"/>
                    <form-error v-if="response.errors.superficialCervicalLymphNodes"
                                :error="response.errors.superficialCervicalLymphNodes[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[11].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="InsideTheCervicalLymphNodes" class="my-auto">Εν τω βαθεί τραχηλικοί λεμφαδένες</label>
                        </div>
                    </div>

                    <input id="InsideTheCervicalLymphNodes" type="text" class="form-control"
                           v-model="clinicalExamination.InsideTheCervicalLymphNodes" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(11)"/>
                    <form-error v-if="response.errors.InsideTheCervicalLymphNodes"
                                :error="response.errors.InsideTheCervicalLymphNodes[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[12].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="clicking" class="my-auto">Clicking</label>
                        </div>
                    </div>

                    <input id="clicking" type="text" class="form-control"
                           v-model="clinicalExamination.clicking" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(12)"/>
                    <form-error v-if="response.errors.clicking"
                                :error="response.errors.clicking[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[13].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="cry" class="my-auto">Κριγμός</label>
                        </div>
                    </div>

                    <input id="cry" type="text" class="form-control"
                           v-model="clinicalExamination.cry" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(13)"/>
                    <form-error v-if="response.errors.cry"
                                :error="response.errors.cry[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[14].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="painfulPalpationOfMuscles" class="my-auto">Επώδυνη ψηλάφηση μυών</label>
                        </div>
                    </div>

                    <input id="painfulPalpationOfMuscles" type="text" class="form-control"
                           v-model="clinicalExamination.painfulPalpationOfMuscles" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(14)"/>
                    <form-error v-if="response.errors.painfulPalpationOfMuscles"
                                :error="response.errors.painfulPalpationOfMuscles[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[15].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="reducedMobility" class="my-auto">Μειωμένη κινητικότητα</label>
                        </div>
                    </div>

                    <input id="reducedMobility" type="text" class="form-control"
                           v-model="clinicalExamination.reducedMobility" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(15)"/>
                    <form-error v-if="response.errors.reducedMobility"
                                :error="response.errors.reducedMobility[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[16].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="deratingWhenOpening" class="my-auto">Παρέκκλιση κατά τη διάνοιξη</label>
                        </div>
                    </div>

                    <input id="deratingWhenOpening" type="text" class="form-control"
                           v-model="clinicalExamination.deratingWhenOpening" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(16)"/>
                    <form-error v-if="response.errors.deratingWhenOpening"
                                :error="response.errors.deratingWhenOpening[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[17].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="impairedOpening" class="my-auto">Ελαττωμένη διάνοιξη</label>
                        </div>
                    </div>

                    <input id="impairedOpening" type="text" class="form-control"
                           v-model="clinicalExamination.impairedOpening" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(17)"/>
                    <form-error v-if="response.errors.impairedOpening"
                                :error="response.errors.impairedOpening[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[18].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="tonsil" class="my-auto">Παρωτίδα</label>
                        </div>
                    </div>

                    <input id="tonsil" type="text" class="form-control"
                           v-model="clinicalExamination.tonsil" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(18)"/>
                    <form-error v-if="response.errors.tonsil"
                                :error="response.errors.tonsil[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[19].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="underTheJaw" class="my-auto">Υπογνάθιος</label>
                        </div>
                    </div>

                    <input id="underTheJaw" type="text" class="form-control"
                           v-model="clinicalExamination.underTheJaw" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(19)"/>
                    <form-error v-if="response.errors.underTheJaw"
                                :error="response.errors.underTheJaw[0]"/>
                </div>

            </div>

            <div class="col-lg-6 col-12">

                <div class="col-12 text-center">
                    <h3>Ενδοστοματική</h3>
                </div>

                <div class="input-group row mb-2" v-if="fields[20].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="lips" class="my-auto">Χείλη</label>
                        </div>
                    </div>

                    <input id="lips" type="text" class="form-control"
                           v-model="clinicalExamination.lips" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(20)"/>
                    <form-error v-if="response.errors.lips"
                                :error="response.errors.lips[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[21].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="jowl" class="my-auto">Παρεία</label>
                        </div>
                    </div>

                    <input id="jowl" type="text" class="form-control"
                           v-model="clinicalExamination.jowl" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(21)"/>
                    <form-error v-if="response.errors.jowl"
                                :error="response.errors.jowl[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[22].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="palate" class="my-auto">Υπερώα</label>
                        </div>
                    </div>

                    <input id="palate" type="text" class="form-control"
                           v-model="clinicalExamination.palate" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(22)"/>
                    <form-error v-if="response.errors.palate"
                                :error="response.errors.palate[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[23].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="oralGrouno" class="my-auto">Έδαφος στόματος</label>
                        </div>
                    </div>

                    <input id="oralGrouno" type="text" class="form-control"
                           v-model="clinicalExamination.oralGrouno" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(23)"/>
                    <form-error v-if="response.errors.oralGrouno"
                                :error="response.errors.oralGrouno[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[24].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="tongue" class="my-auto">Γλώσσα</label>
                        </div>
                    </div>

                    <input id="tongue" type="text" class="form-control"
                           v-model="clinicalExamination.tongue" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(24)"/>
                    <form-error v-if="response.errors.tongue"
                                :error="response.errors.tongue[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[25].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="oralPharynx" class="my-auto">Στοματοφάρρυγας</label>
                        </div>
                    </div>

                    <input id="oralPharynx" type="text" class="form-control"
                           v-model="clinicalExamination.oralPharynx" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(25)"/>
                    <form-error v-if="response.errors.oralPharynx"
                                :error="response.errors.oralPharynx[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[26].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="hawks" class="my-auto">Χαλινοί</label>
                        </div>
                    </div>

                    <input id="hawks" type="text" class="form-control"
                           v-model="clinicalExamination.hawks" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(26)"/>
                    <form-error v-if="response.errors.hawks"
                                :error="response.errors.hawks[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fields[27].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="alveolarProcess" class="my-auto">Φατνιακή απόφυση</label>
                        </div>
                    </div>

                    <input id="alveolarProcess" type="text" class="form-control"
                           v-model="clinicalExamination.alveolarProcess" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(27)"/>
                    <form-error v-if="response.errors.alveolarProcess"
                                :error="response.errors.alveolarProcess[0]"/>
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

            fields: [
                {
                    id: 0,
                    label: 'Οίδημα',
                    display: false
                },
                {
                    id: 1,
                    label: 'Ασυμμετρία',
                    display: false
                },
                {
                    id: 2,
                    label: 'Διόγκωση',
                    display: false
                },
                {
                    id: 3,
                    label: 'Βλάβες',
                    display: false
                },
                {
                    id: 4,
                    label: 'Χροιά',
                    display: false
                },
                {
                    id: 5,
                    label: 'Συγχειλίτιδα',
                    display: false
                },
                {
                    id: 6,
                    label: 'Τράχηλος : Οίδημα',
                    display: false
                },
                {
                    id: 7,
                    label: 'Τράχηλος : Διόγκωση',
                    display: false
                },
                {
                    id: 8,
                    label: 'Υπογενείδιοι λεμφαδένες',
                    display: false
                },
                {
                    id: 9,
                    label: 'Υπογνάθιοι λεμφαδένες',
                    display: false
                },
                {
                    id: 10,
                    label: 'Επιπολής τραχηλικοί λεμφαδένες',
                    display: false
                },
                {
                    id: 11,
                    label: 'Εν τω βαθεί τραχηλικοί λεμφαδένες',
                    display: false
                },
                {
                    id: 12,
                    label: 'Clicking',
                    display: false
                },
                {
                    id: 13,
                    label: 'Κριγμός',
                    display: false
                },
                {
                    id: 14,
                    label: 'Επώδυνη ψηλάφηση μυών',
                    display: false
                },
                {
                    id: 15,
                    label: 'Μειωμένη κινητικότητα',
                    display: false
                },
                {
                    id: 16,
                    label: 'Παρέκκλιση κατά τη διάνοιξη',
                    display: false
                },
                {
                    id: 17,
                    label: 'Ελαττωμένη διάνοιξη',
                    display: false
                },
                {
                    id: 18,
                    label: 'Παρωτίδα',
                    display: false
                },
                {
                    id: 19,
                    label: 'Υπογνάθιος',
                    display: false
                },
                {
                    id: 20,
                    label: 'Χείλη',
                    display: false
                },
                {
                    id: 21,
                    label: 'Παρεία',
                    display: false
                },
                {
                    id: 22,
                    label: 'Υπερώα',
                    display: false
                },
                {
                    id: 23,
                    label: 'Έδαφος στόματος',
                    display: false
                },
                {
                    id: 24,
                    label: 'Γλώσσα',
                    display: false
                },
                {
                    id: 25,
                    label: 'Στοματοφάρρυγας',
                    display: false
                },
                {
                    id: 26,
                    label: 'Χαλινοί',
                    display: false
                },
                {
                    id: 27,
                    label: 'Φατνιακή απόφυση',
                    display: false
                }
            ],

            clinicalExamination: {
                edema: '',
                asymmetry: '',
                swelling: '',
                damages: '',
                complexion: '',
                convulsion: '',
                neckEdema: '',
                neckSwelling: '',
                hypotensionLymphNodes: '',
                submandibularLymphNodes: '',
                superficialCervicalLymphNodes: '',
                InsideTheCervicalLymphNodes: '',
                clicking: '',
                cry: '',
                painfulPalpationOfMuscles: '',
                reducedMobility: '',
                deratingWhenOpening: '',
                impairedOpening: '',
                tonsil: '',
                underTheJaw: '',
                lips: '',
                jowl: '',
                palate: '',
                oralGround: '',
                tongue: '',
                oralPharynx: '',
                hawks: '',
                alveolarProcess: ''
            }

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

        /**
         * Εξαφάνιση του πεδίου
         *
         * @param field
         */
        removeField (field) {
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
