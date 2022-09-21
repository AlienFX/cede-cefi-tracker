<template>
  <div class="dashboard">

    <div>
      <div v-if="!isAuth">
        <div>
          <h1>Hello World</h1>
        </div>
        <div>
          <p>
            <b>Begin your journey with us..</b><br/>
            <a
               @click="connectWallet()"
               style="cursor: pointer; border-bottom: 1px solid #ffa500; color: #ffa500; font-weight: bold;"
             >GO TO APP ></a>
          </p>
        </div>
      </div>
      <div v-else>
        <div class="rows">
          <div class="row title">
            <div>Currency</div>
            <div>Price</div>
            <div>Volume</div>
          </div>
          <div class="row" v-for="symbol in getSymbols">
            <div>{{ symbol.symbol }}</div>
            <div>{{ formatUSD(symbol.last_price) }}</div>
            <div>{{ formatUSD(symbol.volume) }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "isAuth",
      "getSymbols"
    ])
  },
  name: "Dashboard",
  mounted() {

  },
  data() {
    return {

    };
  },
  methods: {
    async connectWallet(){

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        this.$store.commit("setPublicAddress", accounts);
        this.$root.$refs.Api.getMarkets();
      }catch(e){ console.log(e); }

    },
    formatUSD(price){
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });
      return formatter.format(price);
    }
  },
};
</script>
<style type="text/css">
  .rows .row.title {
    font-weight: bold;
  }
  .rows .row {
    clear: both;
    height: 30px;
    line-height: 30px;
  }
  .rows .row:hover {
    background-color: #1e1e1e;
  }
  .rows .row div {
    float: left;
    width: 32%;
  }
</style>
