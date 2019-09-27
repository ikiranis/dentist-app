<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Εξαγωγή δεδομένων για τον ασθενή με id: {{patientId}}</h1>
            </div>

            <div class="container">
                <patient readOnly="true" />
                <medical-history readOnly="true" />
                <dental-history readOnly="true" />
                <clinical-examination readOnly="true" />
                <dental-gram readOnly="true" />
                <periodontal-chart readOnly="true" />
                <treatment-history readOnly="true" />
                <endo-treatment-card v-for="tooth in haveTeeth"
                                     readOnly="true"
                                     :selectedTooth="tooth" />
                <endo-treatment v-for="tooth in haveTeeth"
                                readOnly="true"
                                :selectedTooth="tooth" />
                <endo-treatment-notes v-for="tooth in haveTeeth"
                                      readOnly="true"
                                      :selectedTooth="tooth" />
                <files readOnly="true" />
            </div>

        </div>
    </div>
</template>

<script>
    import Patient from "./Patient"
    import MedicalHistory from './MedicalHistory'
    import DentalHistory from "@/components/patients/DentalHistoryCompo"
    import ClinicalExamination from "@/components/patients/ClinicalExamination"
    import DentalGram from './DentalGram'
    import PeriodontalChart from "./PeriodontalChart";
    import TreatmentHistory from "./TreatmentHistory";
    import EndoTreatmentCard from "../components/patients/EndoTreatmentCard";
    import EndoTreatment from "../components/patients/EndoTreatment";
    import Files from "./Files";
    import EndoTreatmentNotes from "../components/patients/EndoTreatmentNotes";
    import api from "../api";
    import utility from "../library/utility";

    export default {
        components: {
            EndoTreatmentNotes,
            Files,
            EndoTreatment,
            EndoTreatmentCard,
            TreatmentHistory,
            PeriodontalChart, DentalGram, ClinicalExamination, DentalHistory, Patient, MedicalHistory },

        data() {
            return {
                endoTreatmentCards: [],

                haveTeeth: {},
            }
        },

        computed: {
            patientId: function () {
                return this.$route.params.id
            }
        },

        watch: {
            // Check when endoTreatmentCards change
            endoTreatmentCards () {
                this.haveTeeth = {}

                this.endoTreatmentCards.forEach((card, index) => {
                    let tooth = {
                        endoTreatmentIndex: index,
                        number: card.tooth_number,
                        display: false
                    }

                    this.$set(this.haveTeeth, card.id, tooth)
                })
            }
        },

        created: function () {
            this.getSimpleEndoTreatmentCards()
        },

        methods: {
            /**
             * Get all simple endo treatment cards for patientId
             */
            getSimpleEndoTreatmentCards () {
                this.loading = true

                api.getSimpleEndoTreatmentCards(this.patientId)
                    .then(response => {
                        this.loading = false

                        if (response.status === 200) {
                            this.endoTreatmentCards = response.data

                            return
                        }

                        this.endoTreatmentCards = []
                    })
                    .catch(error => {
                        this.loading = false

                        this.response.message = error.response.data.message
                        this.response.status = false

                        utility.debug(error.response.data.debug)
                    })
            }
        }
    }
</script>
