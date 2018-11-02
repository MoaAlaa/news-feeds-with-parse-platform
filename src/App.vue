<template>
  <div id="app">
    <navbar></navbar>
    <b-container>
      <br>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>