<template functional>

    <b-modal ref="noteModal" size="md" centered hide-footer title="Εισαγωγή μετρήσεων">

        <form class="container-fluid">

            <div class="form-group row">
                <label for="number1" class="sr-only">Number</label>
                <div class="col-md-4 mb-2">
                    <input id="number1" type="number" class="form-control"
                           v-model="props.note.measurements[0].number" required>
                </div>

                <label for="number2" class="sr-only">Number</label>
                <div class="col-md-4 mb-2">
                    <input id="number2" type="number" class="form-control"
                           v-model="props.note.measurements[1].number" required>
                </div>

                <label for="number3" class="sr-only">Number</label>
                <div class="col-md-4 mb-2">
                    <input id="number3" type="number" class="form-control"
                           v-model="props.note.measurements[2].number" required>
                </div>

                <label for="number4" class="sr-only">Number</label>
                <div class="col-md-4 mb-2">
                    <input id="number4" type="number" class="form-control"
                           v-model="props.note.measurements[3].number" required>
                </div>

                <label for="number5" class="sr-only">Number</label>
                <div class="col-md-4 mb-2">
                    <input id="number5" type="number" class="form-control"
                           v-model="props.note.measurements[4].number" required>
                </div>

                <label for="number6" class="sr-only">Number</label>
                <div class="col-md-4 mb-2">
                    <input id="number6" type="number" class="form-control"
                           v-model="props.note.measurements[5].number" required>
                </div>
            </div>

            <div class="row">
                <button class="btn btn-success col-lg-6 col-12 my-3 mx-auto" @click="listeners.click">Εισαγωγή</button>
            </div>

        </form>

    </b-modal>

</template>

<script>
export default {
    name: 'PeriodontalNotesModal',

    props: {
        note: {
            required: true,
            type: Object
        }
    }
}
</script>
