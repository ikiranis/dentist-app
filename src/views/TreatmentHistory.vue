<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Ιστορικό θεραπειών</h1>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: 1 } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" align="mx-auto" toggle="lg" />

            <div class="container">

            </div>

        </div>
    </div>
</template>

<script>
    import MenuBar from "@/components/basic/MenuBar";

    export default {
        components: { MenuBar },

        data() {
            return {
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
                ]
            }
        },

        methods: {
            //
        }
    }
</script>

