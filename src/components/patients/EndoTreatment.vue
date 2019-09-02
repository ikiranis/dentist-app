<template>

    <div>

        <div class="input-group row mb-2 mx-auto">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <label for="chozenRoot" class="my-auto">Ρίζες</label>
                </div>
            </div>

            <select class="form-control" id="chozenRoot"
                    multiple
                    v-model="chozenRoots"
                    @change="getEndoTreatment">
                <option v-for="root in roots"
                        :key="root.id"
                        :value="root.id"
                        :selected="(root.id === chozenRoots) ? 'selected' : ''">
                    {{root.id}} {{ root.name }}
                </option>
            </select>
        </div>

        <div class="container col-lg-7 col-12 mt-3"
             v-for="chozenRoot in chozenRoots" >

            <div v-if="endoTreatments[chozenRoot]">

                <h1>{{ roots[chozenRoot-1].name }}</h1>

                <div class="card mb-2 w-100 mx-auto">
                    <div class="card-header">
                        <span>Μήκος εργαλείου</span>
                    </div>

                    <div class="card-body">

                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <label for="counter" class="my-auto">Μετρητής</label>
                                </div>
                            </div>
                            <input id="counter" type="text" class="form-control"
                                   v-model="endoTreatments[chozenRoot].counter" maxlength="10">
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
                                   v-model="endoTreatments[chozenRoot].radiography" maxlength="10">
                            <form-error v-if="response.errors.radiography"
                                        :error="response.errors.radiography[0]"/>
                        </div>
                    </div>

                </div>

                <div class="input-group row mb-2 mx-auto">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="workingLength" class="my-auto">Μήκος εργασίας</label>
                        </div>
                    </div>

                    <input id="workingLength" type="text" class="form-control"
                           v-model="endoTreatments[chozenRoot].workingLength" maxlength="10">
                    <form-error v-if="response.errors.workingLength"
                                :error="response.errors.workingLength[0]"/>
                </div>

                <div class="input-group row mb-2 mx-auto">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="benchmark" class="my-auto">Σημείο αναφοράς</label>
                        </div>
                    </div>

                    <input id="benchmark" type="text" class="form-control"
                           v-model="endoTreatments[chozenRoot].benchmark" maxlength="20">

                    <select class="form-control" id="chozenBenchmark" v-model="endoTreatments[chozenRoot].benchmark_id">
                        <option v-for="benchmark in endoTreatments[chozenRoot].benchmarks"
                                :key="benchmark.id"
                                :value="benchmark.id"
                                :selected="(benchmark.id === endoTreatments[chozenRoot].benchmark_id) ? 'selected' : ''">
                            {{ benchmark.name }}
                        </option>
                    </select>

                    <form-error v-if="response.errors.benchmark"
                                :error="response.errors.benchmark[0]"/>
                </div>

                <div class="input-group row mb-2 mx-auto">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="MAF" class="my-auto">MAF</label>
                        </div>
                    </div>

                    <input id="MAF" type="text" class="form-control"
                           v-model="endoTreatment.MAF" maxlength="10">
                    <form-error v-if="response.errors.MAF"
                                :error="response.errors.MAF[0]"/>
                </div>

                <div class="input-group row mb-2 mx-auto">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="chemicalMechanicalTreatment"
                                   class="my-auto">Χημικομηχανική επεξεργασία</label>
                        </div>
                    </div>

                    <input id="chemicalMechanicalTreatment" type="text" class="form-control"
                           v-model="endoTreatments[chozenRoot].chemicalMechanicalTreatment" maxlength="10">
                    <form-error v-if="response.errors.chemicalMechanicalTreatment"
                                :error="response.errors.chemicalMechanicalTreatment[0]"/>
                </div>

                <div class="input-group row mb-2 mx-auto">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <label for="chozenBlockingTechnique" class="my-auto">Τεχνική έφραξης</label>
                        </div>
                    </div>

                    <select class="form-control" id="chozenBlockingTechnique"
                            v-model="endoTreatments[chozenRoot].blocking_technique_id">
                        <option v-for="blockingTechnique in endoTreatments[chozenRoot].blockingTechniques"
                                :key="blockingTechnique.id"
                                :value="blockingTechnique.id"
                                :selected="(blockingTechnique.id === endoTreatments[chozenRoot].blocking_technique_id) ? 'selected' : ''">
                            {{ blockingTechnique.name }}
                        </option>
                    </select>
                </div>

                <div class="row">
                    <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                           @click="updateEndoTreatment(chozenRoot)" value="Αποθήκευση">
                </div>

            </div>

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
    import utility from '../../library/utility'
    import api from '../../api'
    import DisplayError from '@/components/basic/DisplayError'

    export default {
        components: {FormError, DisplayError},

        data() {
            return {
                response: {
                    message: ' ',
                    status: '',
                    errors: []
                },

                loading: false,

                roots: [],

                endoTreatment: {
                    root_id: 0,
                    roots: [],
                    counter: null,
                    radiography: null,
                    workingLength: null,
                    benchmark: null,
                    benchmark_id: 0,
                    benchmarks: [],
                    MAF: null,
                    chemicalMechanicalTreatment: null,
                    blocking_technique_id: 0,
                    blockingTechniques: []
                },

                endoTreatments: {},

                chozenRoots: []
            }
        },

        computed: {
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
            this.getRoots()
            this.getEndoTreatment()
        },

        methods: {
            /**
             * Get Endo Treatment info
             */
            getEndoTreatment() {
                this.loading = true

                this.endoTreatments = {}

                this.chozenRoots.forEach(async chozenRoot => {
                    await api.getEndoTreatment(this.patientId, chozenRoot)
                        .then(response => {
                            if (response.status === 200) {
                                this.$set(this.endoTreatments, chozenRoot, response.data)
                            }
                        })
                        .catch(error => {
                            this.loading = false

                            this.response.message = error.response.data.message
                            this.response.status = false

                            utility.debug(error.response.data.debug)
                        })
                })

                // await this.chozenRoots.map(async chozenRoot => {
                //
                //     await api.getEndoTreatment(this.patientId, chozenRoot)
                //         .then(response => {
                //             if (response.status === 200) {
                //                 this.endoTreatments[chozenRoot] = response.data
                //             }
                //         })
                //         .catch(error => {
                //             this.loading = false
                //
                //             this.response.message = error.response.data.message
                //             this.response.status = false
                //
                //             utility.debug(error.response.data.debug)
                //         })
                //
                // })


                // console.log(this.roots)
                console.log(this.endoTreatments)


                this.loading = false
            },

            /**
             * Update the Endo Treatment info
             */
            updateEndoTreatment(chozenRoot) {
                this.loading = true

                api.updateEndoTreatment(this.endoTreatment, this.endoTreatment.id)
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
             * Get all roots
             */
            getRoots() {
                api.getRoots()
                    .then(response => {
                        if (response.status === 200) {
                            this.roots = response.data

                            return
                        }

                        this.roots = []
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message
                        this.response.status = false

                        utility.debug(error.response.data.debug)
                    })
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
