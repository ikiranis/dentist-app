<template functional>
    <div>
        <table class="table table-hover">
            <thead>
            <tr>
                <th scope="col">Μικρογραφία</th>
                <th scope="col">Αρχείο</th>
                <th scope="col">Περιγραφή</th>
                <th scope="col">Ημ/νία</th>
                <th scope="col">Μέγεθος</th>
            </tr>
            </thead>

            <tbody v-for="file in props.files" :key="file.id">
            <tr>
                <th scope="row" class="text-center">
                    <img :src="file.thumbnail">
                </th>
                <td class="align-middle">
                    {{ file.filename }}
                </td>
                <td class="align-middle">
                    {{ file.description }}
                </td>
                <td class="align-middle">
                    {{ file.created_at }}
                </td>
                <td class="align-middle">
                    {{ file.size }} kb
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        props: {
            files: {
                required: true,
                type: Array
            }
        }
    }
</script>
