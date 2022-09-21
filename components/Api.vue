<template></template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters([
      "isAuth",
    ]),
  },
  mounted() {
    this.$root.$refs.Api = this;
  },
  methods: {
    getMarkets() {
      this.socket = this.$nuxtSocket({
        channel: "/",
      });
      this.socket.on("connected", () => {
        this.socketConnected = true;
      });
      this.socket.on("new_price", (datas) => {
        this.$store.commit("setSymbol", datas);
      });
    },
  },
};
</script>
