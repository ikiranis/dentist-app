<template>
    <div class="card mb-2 w-100 mx-auto">
        <div class="card-header text-center">
            <div class="input-group row mb-2 mx-auto">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <label for="chozenRoot" class="my-auto">Ρίζα</label>
                    </div>
                </div>

                <select class="form-control" id="chozenRoot"
                        v-model="treatment.root_id">
                    <option v-for="root in roots"
                            :key="root.id"
                            :value="root.id">
                        {{ root.name }}
                    </option>
                </select>
            </div>
        </div>

        <div class="card-body">

            <div class="input-group mb-3 mx-autο">
                <div class="input-group-prepend">
                    <div class="input-group-text ">
                        <label for="tooth_number" class="my-auto">Επιλογή δοντιού</label>
                    </div>
                </div>

                <select class="form-control" id="tooth_number"
                        v-model="treatment.tooth_number">
                    <option v-for="tooth in teeth"
                            :key="tooth.id"
                            :value="tooth.number"
                            :selected="(tooth.number === treatment.tooth_number) ? 'selected' : ''">
                        {{ tooth.number }}
                    </option>
                </select>
            </div>

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
                               v-model="treatment.counter" maxlength="10">
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
                               v-model="treatment.radiography" maxlength="10">
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
                       v-model="treatment.workingLength" maxlength="10">
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
                       v-model="treatment.benchmark" maxlength="20">

                <select class="form-control" id="chozenBenchmark"
                        v-model="treatment.benchmark_id">
                    <option v-for="benchmark in treatment.benchmarks"
                            :key="benchmark.id"
                            :value="benchmark.id"
                            :selected="(benchmark.id === treatment.benchmark_id) ? 'selected' : ''">
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
                       v-model="treatment.MAF" maxlength="10">
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
                       v-model="treatment.chemicalMechanicalTreatment" maxlength="10">
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
                        v-model="treatment.blocking_technique_id">
                    <option v-for="blockingTechnique in treatment.blockingTechniques"
                            :key="blockingTechnique.id"
                            :value="blockingTechnique.id"
                            :selected="(blockingTechnique.id === treatment.blocking_technique_id) ? 'selected' : ''">
                        {{ blockingTechnique.name }}
                    </option>
                </select>
            </div>

            <div class="row">
                <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                       @click="saveData(treatment)" value="Αποθήκευση">
            </div>

        </div>
    </div>
</template>

<script>
    import FormError from '@/components/basic/FormError'

    export default {
        components: { FormError },

        props: {
            treatment: {
                required: true,
                type: Object
            },
            roots: {
                required: true,
                type: Array
            },
            teeth: {
                required: true,
                type: Array
            },
            response: {
                required: true,
                type: Object
            },
            saveData: {
                required: true,
                type: Function
            }
        },

        methods: {
        //
        }
    }
</script>
