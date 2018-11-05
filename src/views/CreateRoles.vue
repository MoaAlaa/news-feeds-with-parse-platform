<template>
    <div>
        <b-row>
            <b-col cols="2"></b-col>   
            <b-col cols="8">
                <b-card header="Add New Role">
                    <b-form @submit.prevent="createNewRole">
                        <b-form-group id="name" label-for="name">
                            <b-form-input id="name" type="text" v-model="role.name" required placeholder="Role name"></b-form-input>
                        </b-form-group>
                        
                        <b-form-group id="user" label-for="user">
                            <b-form-select v-model="role.user" :options="users" required ></b-form-select>
                        </b-form-group>

                        <b-form-group id="user" label-for="user">
                            <b-form-checkbox v-model="role.read" :value="true" :unchecked-value="false">
                                Read
                            </b-form-checkbox>
                            
                            <b-form-checkbox v-model="role.write" :value="true" :unchecked-value="false">
                                Write
                            </b-form-checkbox>
                        </b-form-group>
                        
                        <b-button type="submit" variant="success">Creat Role</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'CreateRoles',
    data() {
        return {
            users: [],
            role: {
                name: '',
                user: '',
                read: false,
                write: false
            }
        };
    },
    mounted() {
        // this.getAllRoles();
        this.getAllUsers();        
    },
    methods: {
        getAllRoles() {
            new Parse.Query(Parse.Role).find()
            .then(data => {
                console.log(data);
            });
        },

        getAllUsers() {
            new Parse.Query(Parse.User).find()
            .then(data => {
                this.users = data.map(d => {
                    return {
                        value: d,
                        text: d.get('username')
                    }
                    
                })
            });
        },
        createNewRole() {
            let roleACL = new Parse.ACL();
            roleACL.setPublicReadAccess(true);
            let role = new Parse.Role(this.role.name, roleACL);
            role.save();            

            let postACL = new Parse.ACL();
            postACL.setRoleWriteAccess(role, this.role.write);
            postACL.setRoleReadAccess(role, this.role.read);

            let user = this.role.user;
            user.setACL(postACL);
            user.save();
            
        }
    }
}
</script>
