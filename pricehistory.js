const path = require("path");
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 8000;

// mongoose
//   .connect("mongodb://localhost:27017/blogify")
//   .then(() => console.log("mongo connected"));


app.use(cors("*"));

app.use(express.json());

app.use(express.static(path.resolve("./public")));

app.get("/purl", async (req, res) => {
  try {
    if (req.query.url) {

      // //for development res
      // const producutInfo = require("./pHistoryFiles/cb48c04a088c79c767d50ca4460ed458a5429d8ebd9950d9af6a6650079fb17b.json")
      // const producutPriceInfo = require("./pHistoryFiles/Price-cb48c04a088c79c767d50ca4460ed458a5429d8ebd9950d9af6a6650079fb17b.json")
      // return res.json({ producutInfo, producutPriceInfo });
      // //for development res



      let trackmypriceApiRes = await fetch(
        `https://www.trackmyprice.in/api/getDetails?url=${req.query.url}`
      );
      trackmypriceApiRes = await trackmypriceApiRes.json();

      let trackmypriceProductPrice = await fetch(
        `https://www.trackmyprice.in/api/priceHistory/${trackmypriceApiRes.productId}`
      );
      trackmypriceProductPrice = await trackmypriceProductPrice.json();
      console.log(trackmypriceProductPrice);
      const producutInfo = trackmypriceApiRes
      const producutPriceInfo = trackmypriceProductPrice
      return res.json({ producutInfo, producutPriceInfo });
      // return res.json({ trackmypriceApiRes, trackmypriceProductPrice });
    } else {
      return res.json({ err: "Product Url Not Found." });
    }
  } catch (error) {
    console.log(error);
    return res.json({ err: "Some Err has Happened With server." });
  }
});

app.listen(PORT, () =>
  console.log(`server started : http://localhost:${PORT}`)
);

