const express = require("express");

const app = express();
app.get('/',  (req, res)=> {
  console.log('server subiu')
  return res.json("fala desgraaaçaaa")
})

app.listen(3003);