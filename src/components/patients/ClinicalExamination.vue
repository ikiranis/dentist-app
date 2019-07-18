<template>
    <div>

        <div class="col-12 text-center">
            <h1>Κλινική εξέταση</h1>
        </div>

        <FieldsList :fields="fieldsClinic"/>

        <form class="row col-12 mt-3">

            <div class="col-lg-6 col-12">

                <div class="col-12 text-center">
                    <h3>Εξωστοματική</h3>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[0].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="edema" class="my-auto">Οίδημα</label>
                        </div>
                    </div>

                    <input id="edema" type="text" class="form-control"
                           v-model="dentalHistoryClinic.edema" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(0)"/>
                    <form-error v-if="response.errors.edema"
                                :error="response.errors.edema[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[1].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="asymmetry" class="my-auto">Ασυμετρία</label>
                        </div>
                    </div>

                    <input id="asymmetry" type="text" class="form-control"
                           v-model="dentalHistoryClinic.asymmetry" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(1)"/>
                    <form-error v-if="response.errors.asymmetry"
                                :error="response.errors.asymmetry[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[2].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="swelling" class="my-auto">Διόγκωση</label>
                        </div>
                    </div>

                    <input id="swelling" type="text" class="form-control"
                           v-model="dentalHistoryClinic.swelling" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(2)"/>
                    <form-error v-if="response.errors.swelling"
                                :error="response.errors.swelling[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[3].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="damages" class="my-auto">Βλάβες</label>
                        </div>
                    </div>

                    <input id="damages" type="text" class="form-control"
                           v-model="dentalHistoryClinic.damages" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(3)"/>
                    <form-error v-if="response.errors.damages"
                                :error="response.errors.damages[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[4].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="complexion" class="my-auto">Χροιά</label>
                        </div>
                    </div>

                    <input id="complexion" type="text" class="form-control"
                           v-model="dentalHistoryClinic.complexion" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(4)"/>
                    <form-error v-if="response.errors.complexion"
                                :error="response.errors.complexion[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[5].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="convulsion" class="my-auto">Συγχειλίτιδα</label>
                        </div>
                    </div>

                    <input id="convulsion" type="text" class="form-control"
                           v-model="dentalHistoryClinic.convulsion" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(5)"/>
                    <form-error v-if="response.errors.convulsion"
                                :error="response.errors.convulsion[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[6].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="neckEdema" class="my-auto">Τράχηλος : Οίδημα</label>
                        </div>
                    </div>

                    <input id="neckEdema" type="text" class="form-control"
                           v-model="dentalHistoryClinic.neckEdema" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(6)"/>
                    <form-error v-if="response.errors.neckEdema"
                                :error="response.errors.neckEdema[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[7].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="neckSwelling" class="my-auto">Τράχηλος : Διόγκωση</label>
                        </div>
                    </div>

                    <input id="neckSwelling" type="text" class="form-control"
                           v-model="dentalHistoryClinic.neckSwelling" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(7)"/>
                    <form-error v-if="response.errors.neckSwelling"
                                :error="response.errors.neckSwelling[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[8].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="hypotensionLymphNodes" class="my-auto">Υπογενείδιοι λεμφαδένες</label>
                        </div>
                    </div>

                    <input id="hypotensionLymphNodes" type="text" class="form-control"
                           v-model="dentalHistoryClinic.hypotensionLymphNodes" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(8)"/>
                    <form-error v-if="response.errors.hypotensionLymphNodes"
                                :error="response.errors.hypotensionLymphNodes[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[9].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="submandibularLymphNodes" class="my-auto">Υπογνάθιοι λεμφαδένες</label>
                        </div>
                    </div>

                    <input id="submandibularLymphNodes" type="text" class="form-control"
                           v-model="dentalHistoryClinic.submandibularLymphNodes" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(9)"/>
                    <form-error v-if="response.errors.submandibularLymphNodes"
                                :error="response.errors.submandibularLymphNodes[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[10].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="superficialCervicalLymphNodes" class="my-auto">Επιπολής τραχηλικοί λεμφαδένες</label>
                        </div>
                    </div>

                    <input id="superficialCervicalLymphNodes" type="text" class="form-control"
                           v-model="dentalHistoryClinic.superficialCervicalLymphNodes" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(10)"/>
                    <form-error v-if="response.errors.superficialCervicalLymphNodes"
                                :error="response.errors.superficialCervicalLymphNodes[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[11].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="InsideTheCervicalLymphNodes" class="my-auto">Εν τω βαθεί τραχηλικοί λεμφαδένες</label>
                        </div>
                    </div>

                    <input id="InsideTheCervicalLymphNodes" type="text" class="form-control"
                           v-model="dentalHistoryClinic.InsideTheCervicalLymphNodes" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(11)"/>
                    <form-error v-if="response.errors.InsideTheCervicalLymphNodes"
                                :error="response.errors.InsideTheCervicalLymphNodes[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[12].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="clicking" class="my-auto">Clicking</label>
                        </div>
                    </div>

                    <input id="clicking" type="text" class="form-control"
                           v-model="dentalHistoryClinic.clicking" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(12)"/>
                    <form-error v-if="response.errors.clicking"
                                :error="response.errors.clicking[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[13].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="cry" class="my-auto">Κριγμός</label>
                        </div>
                    </div>

                    <input id="cry" type="text" class="form-control"
                           v-model="dentalHistoryClinic.cry" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(13)"/>
                    <form-error v-if="response.errors.cry"
                                :error="response.errors.cry[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[14].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="painfulPalpationOfMuscles" class="my-auto">Επώδυνη ψηλάφηση μυών</label>
                        </div>
                    </div>

                    <input id="painfulPalpationOfMuscles" type="text" class="form-control"
                           v-model="dentalHistoryClinic.painfulPalpationOfMuscles" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(14)"/>
                    <form-error v-if="response.errors.painfulPalpationOfMuscles"
                                :error="response.errors.painfulPalpationOfMuscles[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[15].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="reducedMobility" class="my-auto">Μειωμένη κινητικότητα</label>
                        </div>
                    </div>

                    <input id="reducedMobility" type="text" class="form-control"
                           v-model="dentalHistoryClinic.reducedMobility" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(15)"/>
                    <form-error v-if="response.errors.reducedMobility"
                                :error="response.errors.reducedMobility[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[16].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="deratingWhenOpening" class="my-auto">Παρέκκλιση κατά τη διάνοιξη</label>
                        </div>
                    </div>

                    <input id="deratingWhenOpening" type="text" class="form-control"
                           v-model="dentalHistoryClinic.deratingWhenOpening" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(16)"/>
                    <form-error v-if="response.errors.deratingWhenOpening"
                                :error="response.errors.deratingWhenOpening[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[17].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="impairedOpening" class="my-auto">Ελαττωμένη διάνοιξη</label>
                        </div>
                    </div>

                    <input id="impairedOpening" type="text" class="form-control"
                           v-model="dentalHistoryClinic.impairedOpening" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(17)"/>
                    <form-error v-if="response.errors.impairedOpening"
                                :error="response.errors.impairedOpening[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[18].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="tonsil" class="my-auto">Παρωτίδα</label>
                        </div>
                    </div>

                    <input id="tonsil" type="text" class="form-control"
                           v-model="dentalHistoryClinic.tonsil" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(18)"/>
                    <form-error v-if="response.errors.tonsil"
                                :error="response.errors.tonsil[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[19].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="underTheJaw" class="my-auto">Υπογνάθιος</label>
                        </div>
                    </div>

                    <input id="underTheJaw" type="text" class="form-control"
                           v-model="dentalHistoryClinic.underTheJaw" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(19)"/>
                    <form-error v-if="response.errors.underTheJaw"
                                :error="response.errors.underTheJaw[0]"/>
                </div>

            </div>

            <div class="col-lg-6 col-12">

                <div class="col-12 text-center">
                    <h3>Ενδοστοματική</h3>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[20].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="lips" class="my-auto">Χείλη</label>
                        </div>
                    </div>

                    <input id="lips" type="text" class="form-control"
                           v-model="dentalHistoryClinic.lips" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(20)"/>
                    <form-error v-if="response.errors.lips"
                                :error="response.errors.lips[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[21].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="jowl" class="my-auto">Παρεία</label>
                        </div>
                    </div>

                    <input id="jowl" type="text" class="form-control"
                           v-model="dentalHistoryClinic.jowl" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(21)"/>
                    <form-error v-if="response.errors.jowl"
                                :error="response.errors.jowl[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[22].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="palate" class="my-auto">Υπερώα</label>
                        </div>
                    </div>

                    <input id="palate" type="text" class="form-control"
                           v-model="dentalHistoryClinic.palate" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(22)"/>
                    <form-error v-if="response.errors.palate"
                                :error="response.errors.palate[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[23].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="oralGrouno" class="my-auto">Έδαφος στόματος</label>
                        </div>
                    </div>

                    <input id="oralGrouno" type="text" class="form-control"
                           v-model="dentalHistoryClinic.oralGrouno" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(23)"/>
                    <form-error v-if="response.errors.oralGrouno"
                                :error="response.errors.oralGrouno[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[24].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="tongue" class="my-auto">Γλώσσα</label>
                        </div>
                    </div>

                    <input id="tongue" type="text" class="form-control"
                           v-model="dentalHistoryClinic.tongue" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(24)"/>
                    <form-error v-if="response.errors.tongue"
                                :error="response.errors.tongue[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[25].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="oralPharynx" class="my-auto">Στοματοφάρρυγας</label>
                        </div>
                    </div>

                    <input id="oralPharynx" type="text" class="form-control"
                           v-model="dentalHistoryClinic.oralPharynx" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(25)"/>
                    <form-error v-if="response.errors.oralPharynx"
                                :error="response.errors.oralPharynx[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[26].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="hawks" class="my-auto">Χαλινοί</label>
                        </div>
                    </div>

                    <input id="hawks" type="text" class="form-control"
                           v-model="dentalHistoryClinic.hawks" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(26)"/>
                    <form-error v-if="response.errors.hawks"
                                :error="response.errors.hawks[0]"/>
                </div>

                <div class="input-group row mb-2" v-if="fieldsClinic[27].display">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="alveolarProcess" class="my-auto">Φατνιακή απόφυση</label>
                        </div>
                    </div>

                    <input id="alveolarProcess" type="text" class="form-control"
                           v-model="dentalHistoryClinic.alveolarProcess" maxlength="20">
                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeFieldClinic(27)"/>
                    <form-error v-if="response.errors.alveolarProcess"
                                :error="response.errors.alveolarProcess[0]"/>
                </div>

            </div>

        </form>

        <div class="row">
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

            fieldsClinic: [
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

            dentalHistoryClinic: {
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

    methods: {

        /**
         * Εξαφάνιση του πεδίου
         *
         * @param field
         */
        removeFieldClinic (field) {
            this.fieldsClinic[field].display = false
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
