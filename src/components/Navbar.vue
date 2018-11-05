<template>
    <b-navbar toggleable="md" type="dark" variant="dark">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/" exact>News Feed</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <b-nav-item to="/" key="feeds" exact>Feeds</b-nav-item>
                <b-nav-item to="create-feed" key="create-feed" v-if="isAuth() && userCanWrite('feed-editor')" >Create Feed</b-nav-item>
                <b-nav-item to="create-roles" key="create-roles" v-if="isAuth() && userCanWrite('role-editor')" >Create Roles</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-navbar-nav v-if="isGuest()">
                    <b-nav-item to="/login" key="login">Login</b-nav-item>
                    <b-nav-item to="/register" key="register">Register</b-nav-item>
                    <!-- <b-nav-item to="create-feed" key="create-feed">Create Feed</b-nav-item> -->
                </b-navbar-nav>

                <b-nav-item-dropdown v-if="isAuth()" right>
                    <!-- Using button-content slot -->
                    <template slot="button-content">
                        <em v-text="username"></em>
                    </template>
                    <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
                    <b-dropdown-item @click.prevent="logout">Signout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
        </b-navbar>
    
</template>

<script>
export default {
    computed: {
        username() {
            return this.user().get('username');
        }
    },
    methods: {
        logout() {            
            Parse.User.logOut();
            this.$router.go();
        }
    }
}
</script>

