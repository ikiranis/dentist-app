<template functional>

    <b-modal ref="noteModal" size="md" centered hide-footer title="Εισαγωγή σημείωσης">

        <form class="container-fluid">

            <div class="form-group row">
                <label for="description" class="col-md-4 col-form-label text-md-right">Περιγραφή</label>
                <div class="col-md-8">
                    <input id="description" type="text" class="form-control" maxlength="60"
                           v-model="props.note.description" required>
                    <!--<form-error v-if="response.errors.description" :error="response.errors.description[0]"/>-->
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
    name: 'DentalGramNotesModal',

    props: {
        note: {
            required: true,
            type: Object
        }
    }
}
</script>
