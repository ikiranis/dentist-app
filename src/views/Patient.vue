<template>
    <div class="container my-3">
        <div class="justify-content-center">

            <div class="col-12">
                <h1>#{{ patientId }} {{ patient.info.fname }} {{ patient.info.lname }}</h1>
            </div>

            <!-- Στοιχεία ασθενή -->
            <form class="row">

                <div class="col-lg-6 col-12">

                    <div class="form-group row">
                        <label for="lname" class="col-md-6 col-form-label text-md-right">Επώνυμο</label>
                        <div class="col-md-6">
                            <input id="lname" type="text" class="form-control"
                                   v-model="patient.info.lname" required>
                            <form-error v-if="response.errors.lname" :error="response.errors.lname[0]"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="lname" class="col-md-6 col-form-label text-md-right">Όνομα</label>
                        <div class="col-md-6">
                            <input id="fname" type="text" class="form-control"
                                   v-model="patient.info.fname" required>
                            <form-error v-if="response.errors.fname" :error="response.errors.fname[0]"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="fatherName" class="col-md-6 col-form-label text-md-right">Όνομα πατρός</label>
                        <div class="col-md-6">
                            <input id="fatherName" type="text" class="form-control"
                                   v-model="patient.info.fatherName" required>
                            <form-error v-if="response.errors.fatherName" :error="response.errors.fatherName[0]"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="birthday" class="col-md-6 col-form-label text-md-right">Ημ. γέννησης</label>
                        <div class="col-md-6">
                            <input id="birthday" type="date" class="form-control"
                                   v-model="patient.info.birthday" required>
                            <form-error v-if="response.errors.birthday" :error="response.errors.birthday[0]"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="phoneLandline" class="col-md-6 col-form-label text-md-right">Τηλέφωνο
                            (σταθερό)</label>
                        <div class="col-md-6">
                            <input id="phoneLandline" type="text" class="form-control"
                                   v-model="patient.info.phoneLandline">
                            <form-error v-if="response.errors.phoneLandline" :error="response.errors.phoneLandline[0]"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="phoneMobile" class="col-md-6 col-form-label text-md-right">Τηλέφωνο (κινητό)</label>
                        <div class="col-md-6">
                            <input id="phoneMobile" type="text" class="form-control"
                                   v-model="patient.info.phoneMobile">
                            <form-error v-if="response.errors.phoneMobile" :error="response.errors.phoneMobile[0]"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="address" class="col-md-6 col-form-label text-md-right">Διεύθυνση</label>
                        <div class="col-md-6">
                            <input id="address" type="text" class="form-control"
                                   v-model="patient.info.address">
                            <form-error v-if="response.errors.address" :error="response.errors.address[0]"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="dateCreated" class="col-md-6 col-form-label text-md-right">Ημ. Εγγραφής</label>
                        <div class="col-md-6">
                            <input id="dateCreated" type="date" class="form-control"
                                   v-model="patient.info.dateCreated">
                            <form-error v-if="response.errors.dateCreated" :error="response.errors.dateCreated[0]"/>
                        </div>
                    </div>

                </div>

                <div class="col-lg-6 col-12">

                    <!-- Επιλογές -->
                    <div class="col-lg-8 col-12 mb-2 mx-auto">
                        <router-link to="/patients">
                            <button class="btn btn-secondary col-12">Ιατρικό ιστορικό</button>
                        </router-link>
                    </div>

                    <div class="col-lg-8 col-12 mb-2 mx-auto">
                        <router-link to="/economy">
                            <button class="btn btn-secondary col-12">Οδοντιατρικό ιστορικό</button>
                        </router-link>
                    </div>

                    <div class="col-lg-8 col-12 mb-2 mx-auto">
                        <router-link to="/calendar">
                            <button class="btn btn-secondary col-12">Οδοντόγραμμα</button>
                        </router-link>
                    </div>

                    <div class="col-lg-8 col-12 mb-2 mx-auto">
                        <router-link to="/tools">
                            <button class="btn btn-secondary col-12">Περιοδοντόγραμμα</button>
                        </router-link>
                    </div>

                    <div class="col-lg-8 col-12 mb-2 mx-auto">
                        <router-link to="/tools">
                            <button class="btn btn-secondary col-12">Ιστορικό θεραπειών</button>
                        </router-link>
                    </div>

                    <div class="col-lg-8 col-12 mb-2 mx-auto">
                        <router-link to="/tools">
                            <button class="btn btn-secondary col-12">Απονεύρωση</button>
                        </router-link>
                    </div>

                    <div class="col-lg-8 col-12 mb-2 mx-auto">
                        <router-link to="/tools">
                            <button class="btn btn-secondary col-12">Αρχεία</button>
                        </router-link>
                    </div>

                    <!-- Σημειώσεις -->
                    <div class="card">

                        <div class="card-header">
                            Σημειώσεις
                        </div>

                        <div class="card-body">

                            <div class="form-group row my-1">
                                <label for="disease" class="col-md-4 col-form-label text-md-right">
                                    <eye-icon title="Ασθένεια"/>
                                    Ασθένεια
                                </label>
                                <div class="col-md-8">
                                    <input id="disease" type="text" class="form-control"
                                           v-model="patient.info.disease">
                                    <form-error v-if="response.errors.disease" :error="response.errors.disease[0]"/>
                                </div>
                            </div>

                            <div class="form-group row my-1">
                                <label for="treatment" class="col-md-4 col-form-label text-md-right">
                                    <pencil-icon title="Θεραπείες"/>
                                    Θεραπείες
                                </label>
                                <div class="col-md-8">
                                    <input id="treatment" type="text" class="form-control"
                                           v-model="patient.info.treatment">
                                    <form-error v-if="response.errors.treatment" :error="response.errors.treatment[0]"/>
                                </div>
                            </div>

                            <div class="form-group row my-1">
                                <label for="debt" class="col-md-4 col-form-label text-md-right">
                                    <file-hidden-icon title="Χρέος"/>
                                    Χρέος
                                </label>
                                <div class="col-md-8">
                                    <input id="debt" type="text" class="form-control"
                                           v-model="patient.info.debt">
                                    <form-error v-if="response.errors.debt" :error="response.errors.debt[0]"/>
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
</template>

<script>
    import DisplayError from "@/components/basic/DisplayError";
    import FormError from "@/components/basic/FormError";

    export default {
        components: {DisplayError, FormError},

        data() {
            return {
                response: {
                    message: '',
                    status: '',
                    errors: []
                },

                patient: {
                    info: {
                        fname: 'Rosana',
                        lname: 'Lundquist',
                        fatherName: 'Luann',
                        birthday: '12/11/1974',
                        phoneLandline: '2463056325',
                        phoneMobile: '6954568234',
                        address: '25ης Μαρτίου 1345',
                        dateCreated: '01/06/2019'
                    }
                }
            }
        },

        computed: {
            patientId: function () {
                return this.$route.params.id;
            },
        },

        props: {
            patientId: Number
        },

        methods: {

            saveInfo() {
                //
            }
        }
    }
</script>