<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Εξαγωγή δεδομένων για τον ασθενή με id: {{patientId}}</h1>
            </div>

            <div class="container">
<!--                TODO να μπούνε τίτλοι
                    TODO να δω αν μπορούν να χωριστούν σε σελίδες, για εκτύπωση-->
				<div class="row bg-secondary text-light">
					<h1 class="mx-auto">Στοιχεία ασθενή</h1>
				</div>
                <patient readOnly="true" />

				<div class="row bg-secondary text-light">
					<h1 class="mx-auto">Ιατρικό ιστορικό</h1>
				</div>
				<medical-history readOnly="true" />

				<div class="row bg-secondary text-light">
					<h1 class="mx-auto">Οδοντιατρικό ιστορικό</h1>
				</div>
				<dental-history readOnly="true" />

				<div class="row bg-secondary text-light">
					<h1 class="mx-auto">Κλινική εξέταση</h1>
				</div>
				<clinical-examination readOnly="true" />

				<div class="row bg-secondary text-light">
					<h1 class="mx-auto">Οδοντόγραμμα</h1>
				</div>
				<dental-gram readOnly="true" />

				<div class="row bg-secondary text-light">
					<h1 class="mx-auto">Περιοδοντόγραμμα</h1>
				</div>
				<periodontal-chart readOnly="true" />

				<div class="row bg-secondary text-light">
					<h1 class="mx-auto">Ιστορικό θεραπειών</h1>
				</div>
				<treatment-history readOnly="true" />

				<div class="row bg-secondary text-light">
					<h1 class="mx-auto">Απονεύρωση</h1>
				</div>
				<div class="row">
					<h3 class="mx-auto">Δελτία ενδοδοντικής θεραπείας</h3>
				</div>
				<endo-treatment-card v-for="tooth in haveTeeth" :key="tooth.id"
                                     readOnly="true"
                                     :selectedTooth="tooth" />

				<div class="row">
					<h3 class="mx-auto">Ενδοδοντικές θεραπείες</h3>
				</div>
                <endo-treatment v-for="tooth in haveTeeth" :key="tooth.id"
                                readOnly="true"
                                :selectedTooth="tooth" />

				<div class="row">
					<h3 class="mx-auto">Σημειώσεις</h3>
				</div>
				<endo-treatment-notes v-for="tooth in haveTeeth" :key="tooth.id"
                                      readOnly="true"
                                      :selectedTooth="tooth" />

				<div class="row bg-secondary text-light">
					<h1 class="mx-auto">Αρχεία</h1>
				</div>
				<files readOnly="true" />
            </div>

        </div>
    </div>
</template>

<script>
import Patient from './Patient'
import MedicalHistory from './MedicalHistory'
import DentalHistory from '@/components/patients/DentalHistoryCompo'
import ClinicalExamination from '@/components/patients/ClinicalExamination'
import DentalGram from './DentalGram'
import PeriodontalChart from './PeriodontalChart'
import TreatmentHistory from './TreatmentHistory'
import EndoTreatmentCard from '../components/patients/EndoTreatmentCard'
import EndoTreatment from '../components/patients/EndoTreatment'
import Files from './Files'
import EndoTreatmentNotes from '../components/patients/EndoTreatmentNotes'
import api from '../api'
import utility from '../library/utility'

export default {
    components: {
        EndoTreatmentNotes,
        Files,
        EndoTreatment,
        EndoTreatmentCard,
        TreatmentHistory,
        PeriodontalChart,
        DentalGram,
        ClinicalExamination,
        DentalHistory,
        Patient,
        MedicalHistory },

    data () {
        return {
            endoTreatmentCards: [],

            haveTeeth: {}
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
