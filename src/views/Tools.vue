<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Εργαλεία</h1>
            </div>

            <div class="container mb-3 col-12 col-lg-4 mx-auto">
                <router-link to="/backup">
                    <b-button variant="secondary" class="w-100 mt-3">Backup</b-button>
                </router-link>

                <router-link to="/export">
                    <b-button variant="secondary" class="w-100 mt-3">Εξαγωγή δεδομένων</b-button>
                </router-link>
            </div>


        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //
            }
        },

        methods: {
            //
        }
    }
</script>