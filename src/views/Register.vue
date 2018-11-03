<template>
    <div>
        <b-row>
            <b-col cols="2"></b-col>   
            <b-col cols="8">
                <b-card header="Register">
                    <b-form>
                        <b-form-group id="username" label-for="username">
                            <b-form-input id="username" type="text" v-model="user.username" required placeholder="User Name"></b-form-input>
                        </b-form-group>
                        
                        <b-form-group id="email" label-for="email">
                            <b-form-input id="email" type="email" v-model="user.email" required placeholder="User Email"></b-form-input>
                        </b-form-group>
                        
                        <b-form-group id="password" label-for="password">
                            <b-form-input id="password" type="password" v-model="user.password" required placeholder="User password"></b-form-input>
                        </b-form-group>
                        
                        
                        <b-button type="button" @click="register" variant="primary">register</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            user: {
                username: '',
                email: '',
                password: ''
            }
        };
    },
    methods: {
        register() {
            const user = new Parse.User();

            user.set("username", this.user.username);
            user.set("password", this.user.password);
            user.set("email", this.user.email); // opthinal

            user.signUp()
                .then(data =>  this.$router.go('/'));


            
        }
    }
}
</script>
