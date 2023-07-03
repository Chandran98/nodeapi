const asyncHanlder = require("express-async-handler");

const axios = require("axios");
module.exports.getCrypto = asyncHanlder(async (req, res) => {
  let coin = ["BTC", "ETH", "DOT"];
  try {
    const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coin}&tsyms=USD&api_key=${process.env.CRYPTO_COMPARE_API_KEY}`;

    const data = await axios.get(url);
    const coinData = data.data;
    res.status(200).json([coinData]);
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});
