<template>
  <div class="bg-background" id="app">
    <Api />
    <Tracker />
  </div>
</template>

<script>
const axios = require("axios");
import Api from "../components/Api";
import Tracker from "../components/Tracker";
import { mapGetters } from "vuex";

export default {
  data() {
    return {

    };
  },
  name: "IndexPage",
  components: {
    Tracker,
    Api,
  },
  computed: {
    ...mapGetters([
      "isAuth"
    ]),
  },
  async mounted() {
    this.$root.$refs.Index = this;
  },
  methods: {

  },
};
</script>

<style>
body {
  font-family: Montserrat, sans-serif !important;
  background-color: #131211;
  color: #a7a7a7;
}
#app {
  margin: 0 auto;
  width: 740px;
}
</style>
