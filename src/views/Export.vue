<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Εξαγωγή δεδομένων για τον ασθενή με id: {{patientId}}</h1>
            </div>

            <div class="container">
                <patient />
                <medical-history />
                <dental-history />
                <clinical-examination />
                <dental-gram />
                <periodontal-chart />
                <treatment-history />
                <endo-treatment-card />
                <endo-treatment />
                <endo-treatment-notes />
                <files />
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
                //
            }
        },

        computed: {
            patientId: function () {
                return this.$route.params.id
            }
        },

        methods: {
            //
        }
    }
</script>
