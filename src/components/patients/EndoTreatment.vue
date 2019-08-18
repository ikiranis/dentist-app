<template>

    <div>

        <div class="col-12 text-center">
            <h1>Ενδοδοντική θεραπεία</h1>
        </div>

        <FieldsList :fields="fields"/>

        <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!fieldSelected">
            Επιλογή πεδίων
        </div>

        <form @submit.prevent class="container col-lg-7 col-12 mt-3">

            <div class="input-group row mb-2 mx-auto">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <label for="chozenRoot" class="my-auto">Ρίζες</label>
                    </div>
                </div>

                <select class="form-control" id="chozenRoot">
                    <option v-for="root in roots"
                            :key="root.id"
                            :value="root.id">{{ root.name }}</option>
                </select>
            </div>

            <div class="card mb-2 w-100 mx-auto" v-if="fields.counter.display">
                <div class="card-header">
                    <span>Μήκος εργαλείου</span>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.counter)"/>
                </div>

                <div class="card-body">

                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <label for="counter" class="my-auto">Μετρητής</label>
                            </div>
                        </div>

                        <input id="counter" type="text" class="form-control"
                               v-model="endoTreatment.counter" maxlength="10">
                        <form-error v-if="response.errors.counter"
                                    :error="response.errors.counter[0]"/>
                    </div>

                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <label for="radiography" class="my-auto">Ακτινογραφία</label>
                            </div>
                        </div>

                        <input id="radiography" type="text" class="form-control"
                               v-model="endoTreatment.radiography" maxlength="10">
                        <form-error v-if="response.errors.radiography"
                                    :error="response.errors.radiography[0]"/>
                    </div>
                </div>

            </div>

            <div class="input-group row mb-2 mx-auto" v-if="fields.workingLength.display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <label for="workingLength" class="my-auto">Μήκος εργασίας</label>
                    </div>
                </div>

                <input id="workingLength" type="text" class="form-control"
                       v-model="endoTreatment.workingLength" maxlength="10">
                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.workingLength)"/>
                <form-error v-if="response.errors.workingLength"
                            :error="response.errors.workingLength[0]"/>
            </div>

            <div class="input-group row mb-2 mx-auto" v-if="fields.benchmark.display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <label for="benchmark" class="my-auto">Σημείο αναφοράς</label>
                    </div>
                </div>

                <input id="benchmark" type="text" class="form-control"
                       v-model="endoTreatment.benchmark" maxlength="20">

                <select class="form-control" id="chozenBenchmark">
                    <option v-for="benchmark in benchmarks"
                            :key="benchmark.id"
                            :value="benchmark.id">{{ benchmark.name }}
                    </option>
                </select>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.benchmark)"/>
                <form-error v-if="response.errors.benchmark"
                            :error="response.errors.benchmark[0]"/>
            </div>

            <div class="input-group row mb-2 mx-auto" v-if="fields.MAF.display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <label for="MAF" class="my-auto">MAF</label>
                    </div>
                </div>

                <input id="MAF" type="text" class="form-control"
                       v-model="endoTreatment.MAF" maxlength="10">
                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.MAF)"/>
                <form-error v-if="response.errors.MAF"
                            :error="response.errors.MAF[0]"/>
            </div>

            <div class="input-group row mb-2 mx-auto" v-if="fields.chemicalMechanicalTreatment.display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <label for="chemicalMechanicalTreatment" class="my-auto">Χημικομηχανική επεξεργασία</label>
                    </div>
                </div>

                <input id="chemicalMechanicalTreatment" type="text" class="form-control"
                       v-model="endoTreatment.chemicalMechanicalTreatment" maxlength="10">
                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.chemicalMechanicalTreatment)"/>
                <form-error v-if="response.errors.chemicalMechanicalTreatment"
                            :error="response.errors.chemicalMechanicalTreatment[0]"/>
            </div>

            <div class="input-group row mb-2 mx-auto" v-if="fields.blockingTechnique.display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <label for="chozenBlockingTechnique" class="my-auto">Τεχνική έφραξης</label>
                    </div>
                </div>

                <select class="form-control" id="chozenBlockingTechnique">
                    <option value="0">Πλάγια</option>
                    <option value="1">Θερμοπλαστική</option>
                </select>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.blockingTechnique)"/>
            </div>

            <div v-if="fields.notes.display">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Ημ/νία</th>
                        <th scope="col">Περιγραφή</th>
                    </tr>
                    </thead>

                    <tbody v-for="note in notes" :key="note.id">
                    <tr>
                        <th scope="row">{{ note.date }}</th>
                        <td>
                            {{ note.description }}
                        </td>
                    </tr>
                    </tbody>
                </table>

                <form @submit.prevent class="container-fluid">

                    <div class="form-group row">
                        <label for="date" class="col-md-4 col-form-label text-md-right">Ημ/νία</label>
                        <div class="col-md-8">
                            <input id="date" type="date" class="form-control"
                                   v-model="note.date">
                            <form-error v-if="response.errors.date" :error="response.errors.date[0]"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="description" class="col-md-4 col-form-label text-md-right">Περιγραφή</label>
                        <div class="col-md-8">
                            <input id="description" type="text" class="form-control"
                                   v-model="note.description" required>
                            <form-error v-if="response.errors.description" :error="response.errors.description[0]"/>
                        </div>
                    </div>

                    <div class="row">
                        <button class="btn btn-success col-lg-6 col-12 my-3 mx-auto" @click="saveNote">Εισαγωγή
                            Σημείωσης
                        </button>
                    </div>

                </form>
            </div>

        </form>

        <div class="row" v-if="fieldSelected">
            <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                   @click="updateEndoTreatment" value="Αποθήκευση">
        </div>

        <display-error v-if="response.message" :response="response"/>

    </div>

</template>

<script>
import FormError from '@/components/basic/FormError'
import FieldsList from '@/components/patients/FieldsList'
import utility from "../../library/utility";
import api from "../../api";
import DisplayError from '@/components/basic/DisplayError'

export default {
    components: { FormError, FieldsList, DisplayError },

    data () {
        return {
            response: {
                message: '',
                status: '',
                errors: []
            },

            loading: false,

            fields: {
                counter: {
                    label: 'Μήκος εργαλείου',
                    display: false
                },
                workingLength: {
                    label: 'Μήκος εργασίας',
                    display: false
                },
                benchmark: {
                    label: 'Σημείο αναφοράς',
                    display: false
                },
                MAF: {
                    label: 'MAF',
                    display: false
                },
                chemicalMechanicalTreatment: {
                    label: 'Χημικομηχανική επεξεργασία',
                    display: false
                },
                blockingTechnique: {
                    label: 'Τεχνική έμφραξης',
                    display: false
                },
                notes: {
                    label: 'Σημειώσεις',
                    display: false
                }
            },

            endoTreatment: {
                counter: null,
                radiography: null,
                workingLength: null,
                benchmark: null,
                chozenBenchmark: 0,
                MAF: null,
                chemicalMechanicalTreatment: null,
                chozenBlockingTechnique: 0,
                chozenRoot: 0
            },

            roots: [
                {
                    id: 0,
                    name: 'Απερώια'
                },
                {
                    id: 1,
                    name: 'Προστομιακή'
                },
                {
                    id: 2,
                    name: 'Προστομιακή εγγύς'
                },
                {
                    id: 3,
                    name: 'Προστομιακή άπω'
                },
                {
                    id: 4,
                    name: '2η προσ. εγγύς'
                },
                {
                    id: 5,
                    name: 'Υπερώια'
                },
                {
                    id: 6,
                    name: 'Άπο γλωσσική'
                },
                {
                    id: 7,
                    name: 'Εγγύς γλωσσική'
                },
                {
                    id: 8,
                    name: 'Άπω προστομιακή'
                },
                {
                    id: 9,
                    name: 'Εγγύς προστομιακή'
                }
            ],

            benchmarks: [
                {
                    id: 0,
                    name: 'Κοπτικό χείλος'
                },
                {
                    id: 1,
                    name: 'Παρειακό φύμα'
                },
                {
                    id: 2,
                    name: 'Υπερώιο φύμα'
                },
                {
                    id: 3,
                    name: 'Εγγύς παρειακό'
                },
                {
                    id: 4,
                    name: 'Άπω παρειακό'
                },
                {
                    id: 5,
                    name: 'Εγγύς γλωσσικό'
                },
                {
                    id: 6,
                    name: 'Άπω γλωσσικό'
                },
                {
                    id: 7,
                    name: 'Εγγύς υπερώιο'
                },
                {
                    id: 8,
                    name: 'Άπω υπερώιο'
                }
            ],

            notes: [
                {
                    id: 0,
                    date: '12/01/2019',
                    description: 'something'
                },
                {
                    id: 1,
                    date: '22/01/2019',
                    description: 'something about something'
                },
                {
                    id: 2,
                    date: '13/02/2019',
                    description: 'something for something'
                },
                {
                    id: 3,
                    date: '25/03/2019',
                    description: 'somethings about somethings'
                }
            ],

            note: {
                id: 0,
                date: '',
                description: ''
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
        loading() {
            this.$emit('loading', this.loading)
        }
    },

    created: function () {
        this.getEndoTreatment()
    },

    methods: {
        /**
         * Get Endo Treatment info
         */
        getEndoTreatment ()
        {
            this.loading = true

            api.getEndoTreatment(this.patientId)
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
         * Update the Endo Treatment info
         */
        updateEndoTreatment ()
        {
            this.loading = true

            api.updateEndoTreatment(this.endoTreatment, this.patientId)
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
        checkFields ()
        {
            Object.keys(this.endoTreatment).forEach(key => {
                if (this.endoTreatment[key] === null || this.endoTreatment[key].length<1) {
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
