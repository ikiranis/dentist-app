<template functional>
    <div>
        <div class="col-12 text-center">
            <h3>Σημειώσεις</h3>
        </div>

        <table class="table">
            <thead>
            <tr>
                <th scope="col">Ημ/νία</th>
                <th scope="col">Περιγραφή</th>
            </tr>
            </thead>

            <tbody v-for="note in props.notes" :key="note.id">
            <tr>
                <th scope="row">{{ note.date }}</th>
                <td>
                    {{ note.description }}
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        props: {
            notes: {
                required: true,
                type: Array
            }
        }
    }
</script>
