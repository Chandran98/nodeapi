const Binance = require("node-binance-api");
// const Binance = require("binance-api-node").default;
const mongoose = require("mongoose");

const expressAsyncHandler = require("express-async-handler");

const binance = new Binance().options({
  // KAIRA Live API key
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_SECRET_KEY,
  useServerTime: true,
  recvWindow: 60000,
  reconnect: true,
  // "urls" : { base:'https://testnet.binance.vision/api/' }
});

module.exports.exchangeInfo = expressAsyncHandler(async (req, res) => {});

module.exports.placeOrder = expressAsyncHandler(async (req, res) => {
  const symbol = req.query.symbol;
  const side = req.query.side;
  const quantity = req.query.quantity;
  binance.marketBuy(symbol, quantity, (err, response) => {
    if (err) {
      console.log("Error placing order:", error);
      res.status(400).json({ message: "Failed to place order", err: err });
    }
    if (response) {
      console.log("Order placed successfully:", response);
      res.status(200).json({ success: true, order: response });
    }
  });
});
module.exports.accountInfo = expressAsyncHandler(async (req, res) => {
  binance.account((err, response) => {
    if (err) {
      console.log("Error fetching account information:", err);
      res.status(500).json({ error: "Failed to fetch account information" });
    }
    if (response) {
      console.log("Account information:", response);
      res.status(200).json(response);
    }
  });
});

module.exports.priceInfo = expressAsyncHandler(async (req, res) => {
  const { ticker } = req.body;

  console.log();
  binance.prices(ticker, (err, response) => {
    if (err) {
      console.log("Error fetching Price information:", err);
      res.status(500).json({ error: "Failed to fetch Price information" });
    }
    if (response) {
      res.status(200).json(response);
      
      console.log("Price information BNBBTC:", response.BNBBTC);
    }
  });
});
module.exports.bidPrice = expressAsyncHandler(async (req, res) => {
    const { ticker } = req.body;
  
    console.log(ticker);
    binance.bookTickers(ticker, (err, response) => {
      if (err) {
        console.log("Error fetching Price information:", err);
        res.status(500).json({ error: "Failed to fetch Price information" });
      }
      if (response) {
        res.status(200).json(response);
        
        console.log("Price information BNBBTC:", response.BNBBTC);
      }
    });
  });

  module.exports.depth = expressAsyncHandler(async (req, res) => {
    const { ticker } = req.body;
  
  
    console.log(ticker);
    var options = {
        url: "https://data.binance.com/api/v3/depth",
        headers: { "Content-Type": "application/json" },
        qs: {
          symbol:"BNBBTC",
          limit: 20,
        },
      };
    binance.depth("BNBBTC", (err, response) => {
      if (err) {
        console.log("Error fetching Price information:", err);
        res.status(500).json({ error: "Failed to fetch Price information" });
      }
      if (response) {
        res.status(200).json(response);
        
        console.log("Price information BNBBTC:", response);
      }
    });
  });
