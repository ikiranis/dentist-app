<template>
    <div>

        <div class="col-12 text-center">
            <h1>Διάγνωση</h1>
        </div>

        <FieldsList :fields="fields"/>

        <form class="row col-12 mt-3">

            <div class="input-group row mb-2" v-if="fields[0].display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" id="revelationCheck">
                    </div>

                    <div class="input-group-text">
                        <label for="revelation" class="my-auto">Αποκάλυψη</label>
                    </div>
                </div>

                <input id="revelation" type="text" class="form-control"
                       v-model="diagnosis.revelation" maxlength="20">
                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(0)"/>
                <form-error v-if="response.errors.revelation"
                            :error="response.errors.revelation[0]"/>
            </div>

            <div class="input-group row mb-2" v-if="fields[1].display">
                <div class="input-group-text">
                    <input type="checkbox" id="hyperemia">
                </div>

                <div class="input-group-text col">
                    <label for="hyperemia" class="my-1">Υπεραιμία</label>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(1)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields[2].display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" id="acutePulpitis">
                    </div>

                    <div class="input-group-text">
                        <label for="acutePulpitis" class="my-auto">Οξεία πολφίτιδα</label>
                    </div>
                </div>

                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" id="partialAcutePulpitis">
                    </div>

                    <div class="input-group-text">
                        <label for="partialAcutePulpitis" class="my-auto">Μερική</label>
                    </div>
                </div>

                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" id="universalAcutePulpitis">
                    </div>

                    <div class="input-group-text">
                        <label for="universalAcutePulpitis" class="my-auto">Καθολική</label>
                    </div>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(2)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields[3].display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" id="chronicPulpitis">
                    </div>

                    <div class="input-group-text">
                        <label for="chronicPulpitis" class="my-auto">Χρονία πολφίτιδα</label>
                    </div>
                </div>

                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" id="ulceratingChronicPulpitis">
                    </div>

                    <div class="input-group-text">
                        <label for="ulceratingChronicPulpitis" class="my-auto">Ελκωτική</label>
                    </div>
                </div>

                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" id="superplasticChronicPulpitis">
                    </div>

                    <div class="input-group-text">
                        <label for="superplasticChronicPulpitis" class="my-auto">Υπερπλαστική</label>
                    </div>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(3)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields[4].display">
                <div class="input-group-text">
                    <input type="checkbox" id="necrosis">
                </div>

                <div class="input-group-text col">
                    <label for="necrosis" class="my-1">Νέκρωση</label>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(4)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields[5].display">
                <div class="input-group-text">
                    <input type="checkbox" id="abscess">
                </div>

                <div class="input-group-text col">
                    <label for="abscess" class="my-1">Απόστημα</label>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(5)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields[6].display">
                <div class="input-group-text">
                    <input type="checkbox" id="granulation">
                </div>

                <div class="input-group-text col">
                    <label for="granulation" class="my-1">Κοκκίωμα</label>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(6)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields[7].display">
                <div class="input-group-text">
                    <input type="checkbox" id="cyst">
                </div>

                <div class="input-group-text col">
                    <label for="cyst" class="my-1">Κύστη</label>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(7)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields[8].display">
                <div class="input-group-text">
                    <input type="checkbox" id="reactiveOsteoconduction">
                </div>

                <div class="input-group-text col">
                    <label for="reactiveOsteoconduction" class="my-1">Αντιδραστική οστεροπύκνωση</label>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(8)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields[9].display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" id="endoPeriodontalDamageCheck">
                    </div>

                    <div class="input-group-text">
                        <label for="endoPeriodontalDamage" class="my-auto">Ενδοπεριοδοντική βλάβη</label>
                    </div>
                </div>

                <input id="endoPeriodontalDamage" type="text" class="form-control"
                       v-model="diagnosis.endoPeriodontalDamage" maxlength="20">
                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(9)"/>
                <form-error v-if="response.errors.endoPeriodontalDamage"
                            :error="response.errors.endoPeriodontalDamage[0]"/>
            </div>

            <div class="input-group row mb-2" v-if="fields[10].display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" id="absorption">
                    </div>

                    <div class="input-group-text">
                        <label for="absorption" class="my-auto">Απορρόφηση</label>
                    </div>
                </div>

                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" id="innerAbsorption">
                    </div>

                    <div class="input-group-text">
                        <label for="innerAbsorption" class="my-auto">Εσωτερική</label>
                    </div>
                </div>

                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" id="outerAbsorption">
                    </div>

                    <div class="input-group-text">
                        <label for="outerAbsorption" class="my-auto">Εξωτερική</label>
                    </div>
                </div>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(10)"/>
            </div>

            <div class="input-group row mb-2" v-if="fields[11].display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" id="fractureCheck">
                    </div>

                    <div class="input-group-text">
                        <label for="fracture" class="my-auto">Κάταγμα</label>
                    </div>
                </div>

                <input id="fracture" type="text" class="form-control"
                       v-model="diagnosis.fracture" maxlength="20">
                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(11)"/>
                <form-error v-if="response.errors.fracture"
                            :error="response.errors.fracture[0]"/>
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

            fields: [
                {
                    id: 0,
                    label: 'Αποκάλυψη',
                    display: false
                },
                {
                    id: 1,
                    label: 'Υπεραιμία',
                    display: false
                },
                {
                    id: 2,
                    label: 'Οξεία Πολφίτιδα',
                    display: false
                },
                {
                    id: 3,
                    label: 'Χρονία Πολφίτιδα',
                    display: false
                },
                {
                    id: 4,
                    label: 'Νέκρωση',
                    display: false
                },
                {
                    id: 5,
                    label: 'Απόστημα',
                    display: false
                },
                {
                    id: 6,
                    label: 'Κοκκίωμα',
                    display: false
                },
                {
                    id: 7,
                    label: 'Κύστη',
                    display: false
                },
                {
                    id: 8,
                    label: 'Αντιδραστική οστεοπύκνωση',
                    display: false
                },
                {
                    id: 9,
                    label: 'Ενδοπεριοδοντική βλάβη',
                    display: false
                },
                {
                    id: 10,
                    label: 'Απορρόφηση',
                    display: false
                },
                {
                    id: 11,
                    label: 'Κάταγμα',
                    display: false
                }
            ],

            diagnosis: {
                revelation: '',
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
                endoPeriodontalDamage: '',
                endoPeriodontalDamageCheck: false,
                absorption: false,
                innerAbsorption: false,
                outerAbsorption: false,
                fracture: '',
                fractureCheck: false
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
