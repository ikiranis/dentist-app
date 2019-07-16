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

                <!--                <FieldsList :fields="fields"/>-->

                <form class="row col-12">

                    <div class="col-lg-6 col-12">

                        <div class="input-group row mb-2">
                            <div class="input-group-text mr-3">
                                <input type="checkbox" id="frequentStrokes">
                            </div>

                            <div class="col">
                                <label for="frequentStrokes" class="my-1">Συχνές οδονταλγίες</label>
                            </div>
                        </div>

                        <div class="input-group row mb-2">
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
                            <form-error v-if="response.errors.sensitivityToStimuli"
                                        :error="response.errors.sensitivityToStimuli[0]"/>
                        </div>

                        <div class="form-group row">
                            <label for="painWhenChewing" class="col-md-3 col-form-label text-md-right">Πόνος κατά τη
                                μάσηση</label>

                            <div class="form-check form-check-inline" id="painWhenChewingCheck">
                                <input class="form-check-input" type="checkbox">
                            </div>

                            <div class="col-md-8 my-auto">
                                <input id="painWhenChewing" type="text" class="form-control"
                                       v-model="dentalHistory.painWhenChewing" maxlength="20">
                                <form-error v-if="response.errors.painWhenChewing"
                                            :error="response.errors.painWhenChewing[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="gingivalBleeding" class="col-md-3 col-form-label text-md-right">Αιμοραγία
                                ούλων</label>

                            <div class="form-check form-check-inline" id="gingivalBleedingCheck">
                                <input class="form-check-input" type="checkbox">
                            </div>

                            <div class="col-md-8 my-auto">
                                <input id="gingivalBleeding" type="text" class="form-control"
                                       v-model="dentalHistory.gingivalBleeding" maxlength="20">
                                <form-error v-if="response.errors.gingivalBleeding"
                                            :error="response.errors.gingivalBleeding[0]"/>
                            </div>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-text mr-3">
                                <input type="checkbox" id="tasteAbnormality">
                            </div>

                            <div class="col">
                                <label for="tasteAbnormality" class="my-1">Ανωμαλία
                                    γεύσης</label>
                            </div>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-text mr-3">
                                <input type="checkbox" id="dryMouth">
                            </div>

                            <div class="col">
                                <label for="dryMouth" class="my-1">Ξηροστομία</label>
                            </div>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-text mr-3">
                                <input type="checkbox" id="badSmell">
                            </div>

                            <div class="col">
                                <label for="badSmell" class="my-1">Κακοσμία</label>
                            </div>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-text mr-3">
                                <input type="checkbox" id="burningMouth">
                            </div>

                            <div class="col">
                                <label for="burningMouth" class="my-1">Καυσαλγία</label>
                            </div>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-text mr-3">
                                <input type="checkbox" id="painFromCrownFibrousStructure">
                            </div>

                            <div class="col">
                                <label for="painFromCrownFibrousStructure" class="my-1">Πόνος
                                    από ΚΓΔ</label>
                            </div>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-text mr-3">
                                <input type="checkbox" id="soundFromCrownFibrousStructure">
                            </div>

                            <div class="col">
                                <label for="soundFromCrownFibrousStructure" class="my-1">Ήχος
                                    από ΚΓΔ</label>
                            </div>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-text mr-3">
                                <input type="checkbox" id="prosopalgia">
                            </div>

                            <div class="col">
                                <label for="prosopalgia" class="my-1">Προσωπαλγία</label>
                            </div>
                        </div>

                    </div>

                    <div class="col-lg-6 col-12">

                        <div class="form-group row">
                            <label for="surgicalProcedures" class="col-md-4 col-form-label text-md-right">Χειρουργικές
                                επεμβάσεις</label>
                            <div class="col-md-8 my-auto">
                                <input id="surgicalProcedures" type="text" class="form-control"
                                       v-model="dentalHistory.surgicalProcedures" maxlength="60">
                                <form-error v-if="response.errors.surgicalProcedures"
                                            :error="response.errors.surgicalProcedures[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="traumaticLesions" class="col-md-4 col-form-label text-md-right">Τραυματικές
                                βλάβες</label>
                            <div class="col-md-8 my-auto">
                                <input id="traumaticLesions" type="text" class="form-control"
                                       v-model="dentalHistory.traumaticLesions" maxlength="60">
                                <form-error v-if="response.errors.traumaticLesions"
                                            :error="response.errors.traumaticLesions[0]"/>
                            </div>
                        </div>

                        <div class="input-group row mb-2">
                            <div class="input-group-text mr-3">
                                <input type="checkbox" id="problemsWithLocalAnesthesia">
                            </div>

                            <div class="col">
                                <label for="problemsWithLocalAnesthesia" class="my-1">Προβλήματα
                                    με τοπική αναισθησία</label>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="radiotherapy"
                                   class="col-md-4 col-form-label text-md-right">Ακτινοθεραπεία</label>
                            <div class="col-md-8 my-auto">
                                <input id="radiotherapy" type="text" class="form-control"
                                       v-model="dentalHistory.radiotherapy" maxlength="60">
                                <form-error v-if="response.errors.radiotherapy"
                                            :error="response.errors.radiotherapy[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="oralSprains" class="col-md-4 col-form-label text-md-right">Στοματικές
                                έξεις</label>
                            <div class="col-md-8 my-auto">
                                <input id="oralSprains" type="text" class="form-control"
                                       v-model="dentalHistory.oralSprains" maxlength="60">
                                <form-error v-if="response.errors.oralSprains" :error="response.errors.oralSprains[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="oralHygiene" class="col-md-4 col-form-label text-md-right">Στοματική
                                υγιεινή</label>
                            <div class="col-md-8 my-auto">
                                <input id="oralHygiene" type="text" class="form-control"
                                       v-model="dentalHistory.oralHygiene" maxlength="20">
                                <form-error v-if="response.errors.oralHygiene" :error="response.errors.oralHygiene[0]"/>
                            </div>
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

    export default {
        components: {MenuBar, FormError},

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
            //
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

</style>
