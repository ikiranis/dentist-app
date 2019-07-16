<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Οδοντιατρικό ιστορικό</h1>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: 1 } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" valign="mx-auto" toggle="lg"/>

            <div class="container">

                <FieldsList :fields="fields"/>

                <form class="row col-12 mt-3">

                    <div class="col-lg-6 col-12">

                        <div class="input-group row mb-2" v-if="fields[0].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="frequentStrokes">
                            </div>

                            <div class="input-group-text col">
                                <label for="frequentStrokes" class="my-1">Συχνές οδονταλγίες</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(0)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[1].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="checkbox" id="sensitivityToStimuliCheck">
                                </div>

                                <div class="input-group-text">
                                    <label for="sensitivityToStimuli" class="my-auto">Ευαισθησία σε ερεθίσματα</label>
                                </div>
                            </div>

                            <input id="sensitivityToStimuli" type="text" class="form-control"
                                   v-model="dentalHistory.sensitivityToStimuli" maxlength="20">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(1)"/>
                            <form-error v-if="response.errors.sensitivityToStimuli"
                                        :error="response.errors.sensitivityToStimuli[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[2].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="checkbox" id="painWhenChewingCheck">
                                </div>

                                <div class="input-group-text">
                                    <label for="painWhenChewing" class="my-auto">Πόνος κατά τη
                                        μάσηση</label>
                                </div>

                            </div>

                            <input id="painWhenChewing" type="text" class="form-control"
                                   v-model="dentalHistory.painWhenChewing" maxlength="20">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(2)"/>
                            <form-error v-if="response.errors.painWhenChewing"
                                        :error="response.errors.painWhenChewing[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[3].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="checkbox" id="gingivalBleedingCheck">
                                </div>

                                <div class="input-group-text">
                                    <label for="painWhenChewing" class="my-auto">Αιμοραγία
                                        ούλων</label>
                                </div>
                            </div>

                            <input id="gingivalBleeding" type="text" class="form-control"
                                   v-model="dentalHistory.gingivalBleeding" maxlength="20">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(3)"/>
                            <form-error v-if="response.errors.gingivalBleeding"
                                        :error="response.errors.gingivalBleeding[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[4].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="tasteAbnormality">
                            </div>

                            <div class="input-group-text col">
                                <label for="tasteAbnormality" class="my-1">Ανωμαλία
                                    γεύσης</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(4)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[5].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="dryMouth">
                            </div>

                            <div class="input-group-text col">
                                <label for="dryMouth" class="my-1">Ξηροστομία</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(5)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[6].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="badSmell">
                            </div>

                            <div class="input-group-text col">
                                <label for="badSmell" class="my-1">Κακοσμία</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(6)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[7].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="burningMouth">
                            </div>

                            <div class="input-group-text col">
                                <label for="burningMouth" class="my-1">Καυσαλγία</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(7)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[8].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="painFromCrownFibrousStructure">
                            </div>

                            <div class="input-group-text col">
                                <label for="painFromCrownFibrousStructure" class="my-1">Πόνος
                                    από ΚΓΔ</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(8)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[9].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="soundFromCrownFibrousStructure">
                            </div>

                            <div class="input-group-text col">
                                <label for="soundFromCrownFibrousStructure" class="my-1">Ήχος
                                    από ΚΓΔ</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(9)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[10].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="prosopalgia">
                            </div>

                            <div class="input-group-text col">
                                <label for="prosopalgia" class="my-1">Προσωπαλγία</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(10)"/>
                        </div>

                    </div>

                    <div class="col-lg-6 col-12">

                        <div class="input-group row mb-2" v-if="fields[11].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="surgicalProcedures" class="my-auto">Χειρουργικές
                                        επεμβάσεις</label>
                                </div>
                            </div>

                            <input id="surgicalProcedures" type="text" class="form-control"
                                   v-model="dentalHistory.surgicalProcedures" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(11)"/>
                            <form-error v-if="response.errors.surgicalProcedures"
                                        :error="response.errors.surgicalProcedures[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[12].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="traumaticLesions" class="my-auto">Τραυματικές
                                        βλάβες</label>
                                </div>
                            </div>

                            <input id="traumaticLesions" type="text" class="form-control"
                                   v-model="dentalHistory.traumaticLesions" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(12)"/>
                            <form-error v-if="response.errors.traumaticLesions"
                                        :error="response.errors.traumaticLesions[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[13].display">
                            <div class="input-group-text">
                                <input type="checkbox" id="problemsWithLocalAnesthesia">
                            </div>

                            <div class="input-group-text col">
                                <label for="problemsWithLocalAnesthesia" class="my-1">Προβλήματα
                                    με τοπική αναισθησία</label>
                            </div>

                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(13)"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[14].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="radiotherapy" class="my-auto">Ακτινοθεραπεία</label>
                                </div>
                            </div>

                            <input id="radiotherapy" type="text" class="form-control"
                                   v-model="dentalHistory.radiotherapy" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(14)"/>
                            <form-error v-if="response.errors.radiotherapy"
                                        :error="response.errors.radiotherapy[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[15].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="oralSprains" class="my-auto">Στοματικές
                                        έξεις</label>
                                </div>
                            </div>

                            <input id="oralSprains" type="text" class="form-control"
                                   v-model="dentalHistory.oralSprains" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(15)"/>
                            <form-error v-if="response.errors.oralSprains"
                                        :error="response.errors.oralSprains[0]"/>
                        </div>

                        <div class="input-group row mb-2" v-if="fields[16].display">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="oralHygiene" class="my-auto">Στοματική
                                        υγιεινή</label>
                                </div>
                            </div>

                            <input id="oralHygiene" type="text" class="form-control"
                                   v-model="dentalHistory.oralHygiene" maxlength="60">
                            <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου" @click="removeField(16)"/>
                            <form-error v-if="response.errors.oralHygiene"
                                        :error="response.errors.oralHygiene[0]"/>
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

        data() {
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
                        id: 0,
                        label: 'Συχνές οδονταλγίες',
                        display: false
                    },
                    {
                        id: 1,
                        label: 'Ευαισθησία σε ερεθίσματα',
                        display: false
                    },
                    {
                        id: 2,
                        label: 'Πόνος κατά τη μάσηση',
                        display: false
                    },
                    {
                        id: 3,
                        label: 'Αιμοραγία ούλων',
                        display: false
                    },
                    {
                        id: 4,
                        label: 'Ανωμαλία γεύσης',
                        display: false
                    },
                    {
                        id: 5,
                        label: 'Ξηροστομία',
                        display: false
                    },
                    {
                        id: 6,
                        label: 'Κακοσμία',
                        display: false
                    },
                    {
                        id: 7,
                        label: 'Καυσαλγία',
                        display: false
                    },
                    {
                        id: 8,
                        label: 'Πόνος από ΚΓΔ',
                        display: false
                    },
                    {
                        id: 9,
                        label: 'Ήχος από ΚΓΔ',
                        display: false
                    },
                    {
                        id: 10,
                        label: 'Προσωπαλγία',
                        display: false
                    },
                    {
                        id: 11,
                        label: 'Χειρουργικές επεμβάσεις',
                        display: false
                    },
                    {
                        id: 12,
                        label: 'Τραυματικές βλάβες',
                        display: false
                    },
                    {
                        id: 13,
                        label: 'Προβλήματα με τοπική αναισθησία',
                        display: false
                    },
                    {
                        id: 14,
                        label: 'Ακτινοθεραπεία',
                        display: false
                    },
                    {
                        id: 15,
                        label: 'Στοματικές έξεις',
                        display: false
                    },
                    {
                        id: 16,
                        label: 'Στοματική υγιεινή',
                        display: false
                    }
                ],

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
