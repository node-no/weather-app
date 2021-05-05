if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;
const port = 3000;

const axios = require("axios");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/weather", (req, res) => {
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  if (typeof latitude !== "number" || longitude == "number") {
    return res.status("400").send("Bad Request");
  }

  const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${latitude},${longitude}`;
  axios({
    method: "GET",
    url: url,
  }).then((data) => res.json(data.data.currently));
});

app.listen(port, () => {
  console.log("App is listening ...");
});
