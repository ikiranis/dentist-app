<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Ιατρικό ιστορικό</h1>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: 1 } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" valign="mx-auto" toggle="lg" />

            <div class="container">

                <form class="row col-12">

                    <div class="col-lg-6 col-12">

                        <div class="form-group row">
                            <label for="respiratoryDiseases" class="col-md-4 col-form-label text-md-right">Α. Νόσοι αναπνευστικού</label>
                            <div class="col-md-8 my-auto">
                                <input id="respiratoryDiseases" type="text" class="form-control"
                                       v-model="medicalHistory.respiratoryDiseases" maxlength="60">
                                <form-error v-if="response.errors.respiratoryDiseases" :error="response.errors.respiratoryDiseases[0]"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="cardiovascularDiseases" class="col-md-4 col-form-label text-md-right">Β. Καρδιαγγειακές παθήσεις</label>
                            <div class="col-md-8 my-auto">
                                <input id="cardiovascularDiseases" type="text" class="form-control"
                                       v-model="medicalHistory.cardiovascularDiseases" maxlength="60">
                                <form-error v-if="response.errors.cardiovascularDiseases" :error="response.errors.cardiovascularDiseases[0]"/>
                            </div>
                        </div>

                    </div>


                    <div class="col-lg-6 col-12">

                        <div class="form-group row">
                            <label for="pregnancy" class="col-md-3 col-form-label text-md-right">Εγκυμοσύνη</label>

                            <div class="form-check col-md-1 form-check-inline" id="pregnacyCheck">
                                <input class="form-check-input" type="checkbox">
                            </div>

                            <div class="col-md-7 my-auto">
                                <input id="pregnancy" type="text" class="form-control"
                                       v-model="medicalHistory.pregnancy" maxlength="60">
                                <form-error v-if="response.errors.pregnancy" :error="response.errors.pregnancy[0]"/>
                            </div>
                        </div>

                    </div>

                </form>

            </div>

        </div>
    </div>
</template>

<script>
    import MenuBar from "@/components/basic/MenuBar";
    import DisplayError from "@/components/basic/DisplayError";
    import FormError from "@/components/basic/FormError";

    export default {
        components: { MenuBar, DisplayError, FormError },

        data() {
            return {

                response: {
                    message: '',
                    status: '',
                    errors: []
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
                        route: '/periodDentalGram',
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
                ],

                medicalHistory: {
                    respiratoryDiseases: '',
                    cardiovascularDiseases: '',

                    pregnancy: '',
                }
            }
        },

        methods: {
            //
        }
    }
</script>

<style lang="scss" scoped>

    input[type=checkbox]
    {
        /* Double-sized Checkboxes */
        -ms-transform: scale(2); /* IE */
        -moz-transform: scale(2); /* FF */
        -webkit-transform: scale(2); /* Safari and Chrome */
        -o-transform: scale(2); /* Opera */
        padding: 10px;
    }



</style>

