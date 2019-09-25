<template functional>
    <div>

        <table class="table">
            <thead>
            <tr>
                <th scope="col" class="user-label"></th>
                <th scope="col" class="user-label">#</th>
                <th scope="col" class="user-label">Χρήστης</th>
                <th scope="col" class="user-label">email</th>
                <th scope="col" class="user-label">Ρόλος</th>
            </tr>
            </thead>
            <tbody v-for="user in props.users" :key="user.id">
            <tr>
                <td class="text-center align-middle">
                    <delete class="deleteUser btn-icon"
                            @click="listeners.deleteUser(user.id)"
                            title="Διαγραφή ασθενή"/>
                </td>
                <th scope="row" class="userId align-middle">{{ user.id }}</th>
                <td class="align-middle">
                    <span>{{ user.name }}</span>
                </td>
                <td class="align-middle">
                    <span>{{ user.email }}</span>
                </td>
                <td class="align-middle">
					<swap-horizontal-bold v-if="user.id !== props.currentUserId"
										  class="toggleRole btn-icon"
										  @click="listeners.toggleRole(user)"
										  title="Αλλαγή ρόλου"/>

                    <span @click="listeners.toggleRole(user)">
                        {{ user.isAdmin ? 'Διαχειριστής' : 'Χρήστης' }}
                    </span>
                </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
export default {
    name: 'UsersTable',

    props: {
        users: {
            required: true,
            type: Array
        },
        currentUserId: {
            required: true,
            type: Number
        }
    }
}
</script>
