<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>#{{ patient.id }} {{ patient.fname }} {{ patient.lname }}</h1>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" valign="mx-auto" toggle="lg" />

            <div class="container">

                <!-- Στοιχεία ασθενή -->
                <form class="row">

                    <div class="col-lg-6 col-12">

                        <div class="form-group row">
                            <label for="lname" class="col-md-6 col-form-label text-md-right">Επώνυμο</label>
                            <div class="col-md-6">
                                <input id="lname" type="text" class="form-control"
                                       v-model="patient.lname" required maxlength="20">
                                <form-error v-if="response.errors.lname" :error="response.errors.lname[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="lname" class="col-md-6 col-form-label text-md-right">Όνομα</label>
                            <div class="col-md-6">
                                <input id="fname" type="text" class="form-control"
                                       v-model="patient.fname" required maxlength="20">
                                <form-error v-if="response.errors.fname" :error="response.errors.fname[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="fatherName" class="col-md-6 col-form-label text-md-right">Όνομα πατρός</label>
                            <div class="col-md-6">
                                <input id="fatherName" type="text" class="form-control"
                                       v-model="patient.fatherName" maxlength="20">
                                <form-error v-if="response.errors.fatherName" :error="response.errors.fatherName[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="birthday" class="col-md-6 col-form-label text-md-right">Ημ. γέννησης</label>
                            <div class="col-md-6">
                                <input id="birthday" type="date" class="form-control"
                                       v-model="patient.birthday">
                                <form-error v-if="response.errors.birthday" :error="response.errors.birthday[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="phoneLandline" class="col-md-6 col-form-label text-md-right">Τηλέφωνο
                                (σταθερό)</label>
                            <div class="col-md-6">
                                <input id="phoneLandline" type="text" class="form-control"
                                       v-model="patient.phoneLandline" maxlength="10">
                                <form-error v-if="response.errors.phoneLandline"
                                            :error="response.errors.phoneLandline[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="phoneMobile" class="col-md-6 col-form-label text-md-right">Τηλέφωνο
                                (κινητό)</label>
                            <div class="col-md-6">
                                <input id="phoneMobile" type="text" class="form-control"
                                       v-model="patient.phoneMobile" maxlength="10">
                                <form-error v-if="response.errors.phoneMobile" :error="response.errors.phoneMobile[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="address" class="col-md-6 col-form-label text-md-right">Διεύθυνση</label>
                            <div class="col-md-6">
                                <input id="address" type="text" class="form-control"
                                       v-model="patient.address" maxlength="60">
                                <form-error v-if="response.errors.address" :error="response.errors.address[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="dateCreated" class="col-md-6 col-form-label text-md-right">Ημ. Εγγραφής</label>
                            <div class="col-md-6">
                                <input id="dateCreated" type="date" class="form-control"
                                       v-model="patient.dateCreated" disabled>
                                <form-error v-if="response.errors.dateCreated" :error="response.errors.dateCreated[0]"/>
                            </div>
                        </div>

                    </div>

                    <div class="col-lg-6 col-12">

                        <!-- Σημειώσεις -->
                        <div class="card">

                            <div class="card-header">
                                Σημειώσεις
                            </div>

                            <div class="card-body">

                                <div class="form-group row my-1">
                                    <label for="disease" class="col-md-5 col-form-label text-md-right">
                                        Ασθένεια <biohazard-icon title="Ασθένεια"/>
                                    </label>
                                    <div class="col-md-7">
                                        <input id="disease" type="text" class="form-control col-form"
                                               v-model="patient.icons[0].name" maxlength="60">
                                    </div>
                                </div>

                                <div class="form-group row my-1">
                                    <label for="treatment" class="col-md-5 col-form-label text-md-right">
                                        Εκρεμείς θεραπείες <medical-bag-icon title="Εκρεμείς θεραπείες"/>
                                    </label>
                                    <div class="col-md-7">
                                        <input id="treatment" type="text" class="form-control col-form"
                                               v-model="patient.icons[1].name" maxlength="60">
                                    </div>
                                </div>

                                <div class="form-group row my-1">
                                    <label for="debt" class="col-md-5 col-form-label text-md-right">
                                        Χρέος <currency-eur-icon title="Χρέος"/>
                                    </label>
                                    <div class="col-md-7">
                                        <input id="debt" type="text" class="form-control col-form"
                                               v-model="patient.icons[2].name" maxlength="60">
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </form>

                <div class="row">
                    <button class="btn btn-success col-lg-6 col-12 my-3 mx-auto" @click="saveInfo">Αποθήκευση</button>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
import FormError from '@/components/basic/FormError'
import MenuBar from '@/components/basic/MenuBar'

export default {
    components: { FormError, MenuBar },

    data () {
        return {
            response: {
                message: '',
                status: '',
                errors: []
            },

            patient: {
                id: 0,
                fname: 'Rosana',
                lname: 'Lundquist',
                fatherName: 'Luann',
                icons: [
                    { id: 1, label: 'Ασθένεια', name: '' },
                    { id: 2, label: 'Εκρεμείς θεραπείες', name: '' },
                    { id: 3, label: 'Χρέος', name: '' }
                ],
                birthday: '1974-11-12',
                phoneMobile: '697056325',
                phoneLandline: '2463056325',
                address: '25ης Μαρτίου 1345',
                dateCreated: '2019-01-15'
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
                    route: '/periodontalChart',
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
            ]
        }
    },

    computed: {
        patientId: function () {
            return this.$route.params.id
        }
    },

    props: {
        // patientId: Number
    },

    methods: {

        saveInfo () {
            alert('Saving...')
        }
    }
}
</script>
