export const state = () => ({
  user: {
    publicAddress: [],
  },
  symbols: {
    BTCUSDT: {symbol: 'BTCUSDT', last_price: 0, volume: 0},
    ETHUSDT: {symbol: 'ETHUSDT', last_price: 0, volume: 0},
    BNBUSDT: {symbol: 'BNBUSDT', last_price: 0, volume: 0}
  }
})

export const mutations = {
  setPublicAddress(state, address) {
    state.user.publicAddress = address;
  },
  setSymbol(state, datas){
    state.symbols[datas.symbol] = datas;
  }
}

export const getters = {
  isAuth(state) {
    return state.user.publicAddress.length > 0;
  },
  getUser(state) {
    return state.user;
  },
  getSymbols(state){
    return state.symbols;
  }
}

function floor(numb, x) {
  if (isNaN(numb))
    return 0;
  let sep = numb.toString().split(".");
  if (!sep[1])
    return (parseFloat(sep[0]).toFixed(x))
  return (parseFloat(sep[0] + '.' + sep[1].slice(0, x)))
}
