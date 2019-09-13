<template functional>
    <div>

        <table class="table">
            <thead>
            <tr>
                <th scope="col" class="user-label"></th>
                <th scope="col" class="user-label">#</th>
                <th scope="col" class="user-label">Username</th>
                <th scope="col" class="user-label">email</th>
                <th scope="col" class="user-label">Admin</th>
            </tr>
            </thead>
            <tbody v-for="user in props.users" :key="user.id">
            <tr>
                <td class="text-center btn-icon">
                    <delete class="deleteUser"
                            @click="listeners.deleteUser(user.id)"
                            title="Διαγραφή ασθενή"/>
                </td>
                <th scope="row" class="userId">{{ user.id }}</th>
                <td>
                    <span>{{ user.name }}</span>
                </td>
                <td>
                    <span>{{ user.email }}</span>
                </td>
                <td>
                    <span @click="listeners.toggleAdmin(user.id)"
                          v-if="user.id !== props.currentUserId">
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
