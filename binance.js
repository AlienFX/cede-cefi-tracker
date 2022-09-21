let io = false;

async function makeServer(){
  const http = require('http');
  const { Server } = require("socket.io");

  const server = http.createServer();
  io = new Server(server, {
      cors: {
          origin: "*",
          methods: ["GET", "POST"]
      }
  });

  io.on("connection", (socket) => {
      socket.emit("connected");
      socket.join("binance");
      socket.on("login", (user, callback) => {
          console.log(user, "is connected")
      });
      socket.on("disconnect", () => {
          console.log(socket.id, "is disconnected");
      });
  });

  server.listen(3001);
}
module.exports.makeServer = makeServer;

async function getMarkets(){
  require('dotenv').config();

  if(!io) await makeServer();

  const { WebsocketClient } = require('binance');
  const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];

  const wsClient = new WebsocketClient({
    api_key: process.env.BINANCE_KEY,
    api_secret: process.env.BINANCE_SECRET,
    beautify: true
  });

  wsClient.on('message', (data) => {
    io.in("binance").emit('new_price', {
      'symbol': data.s,
      'last_price': data.c,
      'volume': data.v
    });
  });
  for(let i in symbols){
    wsClient.subscribeSpotSymbol24hrTicker(symbols[i]);
  }
  return 'ok';
}
module.exports.getMarkets = getMarkets;

getMarkets();
