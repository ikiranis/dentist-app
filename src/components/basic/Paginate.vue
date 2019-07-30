<template functional>
    <div>
        <nav v-if="props.pagination.links" aria-label="Patients navigation" class="col-12 row mt-3">
            <ul class="pagination ml-auto mr-auto">
                <li class="page-item" :class="props.pagination.links.prev ? '' : 'disabled'">
                    <span class="page-link btn-icon"
                          @click="listeners.click(props.pagination.links.prev)">Προηγούμενη</span>
                </li>
                <li class="page-item disabled">
                    <span class="page-link">Page {{ props.pagination.meta.current_page }} of {{ props.pagination.meta.last_page }}</span>
                </li>
                <li class="page-item" :class="props.pagination.links.next ? '' : 'disabled' ">
                    <span class="page-link btn-icon"
                          @click="listeners.click(props.pagination.links.next)">Επόμενη</span>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Paginate',

    props: {
        pagination: {
            required: true,
            type: Object
        }
    }
}
</script>
