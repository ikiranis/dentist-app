<template>
    <div>
        <table class="table table-hover">
            <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Μικρογραφία</th>
                <th scope="col">Αρχείο</th>
                <th scope="col">Περιγραφή</th>
                <th scope="col">Ημ/νία</th>
                <th scope="col">Μέγεθος</th>
            </tr>
            </thead>

            <tbody v-for="file in files" :key="file.id">
            <tr>
                <td class="align-middle">
                    <delete class="btn-icon"
                            @click="clickDelete(file.id)"
                            title="Διαγραφή αρχείου"/>
                </td>
                <th scope="row" class="text-center">
                    <!--                    <img :src="file.thumbnail">-->

                    <span class="col-5 text-right">
                        <span v-if="checkFileExtension(file.filename)">
                            <eye-icon @click.native="getFile(file.id)" class="btn-icon" title="View image"/>
                        </span>
                        <span v-else>
                            <download-icon @click.native="getFile(file.id)" class="btn-icon"
                                           title="Download file"/>
                        </span>
                    </span>
                </th>
                <td class="align-middle">
                    <a href="#" class="px-2"
                       @click="clickUpdate(file.id)">{{ file.path + file.filename }}</a>
                </td>
                <td class="align-middle">
                    {{ file.description }}
                </td>
                <td class="align-middle">
                    {{ file.created_at }}
                </td>
                <td class="align-middle">
                    {{ (file.size/1024).toFixed(1) }} kb
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
            },
            clickUpdate: {
                required: true,
                type: Function
            },
            clickDelete: {
                required: true,
                type: Function
            },
            checkFileExtension: {
                required: true,
                type: Function
            },
            getFile: {
                required: true,
                type: Function
            }
        }
    }
</script>
