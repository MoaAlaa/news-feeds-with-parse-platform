<template>
    <div>
        <b-row>
            <b-col cols="2"></b-col>   
            <b-col cols="8">
                <b-card header="Login">
                    <b-form>
                        <b-form-group id="username" label-for="username">
                            <b-form-input id="username" type="text" v-model="user.username" required placeholder="User Name"></b-form-input>
                        </b-form-group>
                       
                        <b-form-group id="password" label-for="password">
                            <b-form-input id="password" type="password" v-model="user.password" required placeholder="User password"></b-form-input>
                        </b-form-group>
                        
                        
                        <b-button type="button" @click="login" variant="primary">Login</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        };
    },
    methods: {
        login() {
            Parse.User.logIn(this.user.username, this.user.password)
                .then(data =>  this.$router.go('/'));

        }
    }
}
</script>
