<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header"><h1 class="text-center">Λίστα ασθενών</h1></div>

                    <div class="card-body">
                         <b-table striped hover :items="patients" :fields="fields"></b-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                fields: [
                    {
                        key: 'id',
                        label: 'id',
                        sortable: false
                    },
                    {
                        key: 'lname',
                        label: 'Επώνυμο',
                        sortable: true
                    },
                    {
                        key: 'fname',
                        label: 'Όνομα',
                        sortable: true
                    }
                ],

                patients: [
                    {
                        id: 1,
                        lname: 'Lundquist',
                        fname: 'Rosana'
                    },
                    {
                        id: 2,
                        lname: 'Gulbranson',
                        fname: 'Kati'
                    },
                    {
                        id: 3,
                        lname: 'Gamet',
                        fname: 'Dayle'
                    },
                    {
                        id: 4,
                        lname: 'Henriquez',
                        fname: 'Luann'
                    },
                    {
                        id: 5,
                        lname: 'Matas',
                        fname: 'Minnie'
                    },
                    {
                        id: 6,
                        lname: 'Battle',
                        fname: 'Pedro'
                    }
                ]
            }
        }

    }
</script>