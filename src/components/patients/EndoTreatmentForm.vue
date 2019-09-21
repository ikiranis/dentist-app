<template>
    <td>
        <tr class="label">
            <select class="form-control" id="chozenRoot"
                    v-model="treatment.root_id">
                <option v-for="root in roots"
                        :key="root.id"
                        :value="root.id">
                    {{ root.name }}
                </option>
            </select>
        </tr>

        <tr class="label">
            <select class="form-control" id="tooth_number"
                    v-model="treatment.tooth_number">
                <option v-for="tooth in teeth"
                        :key="tooth.id"
                        :value="tooth.number"
                        :selected="(tooth.number === treatment.tooth_number) ? 'selected' : ''">
                    {{ tooth.number }}
                </option>
            </select>
        </tr>

        <tr class="label"> </tr>

        <tr class="label">
            <input id="counter" type="text" class="form-control"
                   v-model="treatment.counter" maxlength="10">
            <form-error v-if="response.errors.counter"
                        :error="response.errors.counter[0]"/>
        </tr>


        <tr class="label">
            <input id="radiography" type="text" class="form-control"
                   v-model="treatment.radiography" maxlength="10">
            <form-error v-if="response.errors.radiography"
                        :error="response.errors.radiography[0]"/>
        </tr>


        <tr class="label">
            <input id="workingLength" type="text" class="form-control"
                   v-model="treatment.workingLength" maxlength="10">
            <form-error v-if="response.errors.workingLength"
                        :error="response.errors.workingLength[0]"/>
        </tr>

        <tr class="label">

            <div class="input-group">
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
        </tr>



        <tr class="label">
            <input id="MAF" type="text" class="form-control"
                   v-model="treatment.MAF" maxlength="10">
            <form-error v-if="response.errors.MAF"
                        :error="response.errors.MAF[0]"/>
        </tr>


        <tr class="label">
            <input id="chemicalMechanicalTreatment" type="text" class="form-control"
                   v-model="treatment.chemicalMechanicalTreatment" maxlength="10">
            <form-error v-if="response.errors.chemicalMechanicalTreatment"
                        :error="response.errors.chemicalMechanicalTreatment[0]"/>
        </tr>


        <tr class="label">
            <select class="form-control" id="chozenBlockingTechnique"
                    v-model="treatment.blocking_technique_id">
                <option v-for="blockingTechnique in treatment.blockingTechniques"
                        :key="blockingTechnique.id"
                        :value="blockingTechnique.id"
                        :selected="(blockingTechnique.id === treatment.blocking_technique_id) ? 'selected' : ''">
                    {{ blockingTechnique.name }}
                </option>
            </select>
        </tr>

        <tr class="label">
            <div class="row">
                <zip-disk class="btn-icon ml-auto my-auto"
                        @click="saveData(treatment)"
                        title="Αποθήκευση"/>

                <delete v-if="treatment.id !== 0"
                        class="btn-icon mr-auto my-auto"
                        @click="deleteEndoTreatment(treatment.id)"
                        title="Διαγραφή"/>

            </div>
        </tr>

    </td>

</template>

<script>
    import FormError from '@/components/basic/FormError'

    export default {
        components: {FormError},

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
            },
            deleteEndoTreatment: {
                required: true,
                type: Function
            }
        },

        methods: {
            //
        }
    }
</script>

<style scoped>
    .label {
        height: 3em;

    }

    td {
        width: 10em;
    }

</style>
