const express = require("express");

const app = express();
app.get('/',  (req, res)=> {
  return res.json({
    message: 'chegou no get'
  })
})

app.post('/', (req, res)=>{
  return res.json({
    message: 'chegou no post'
  })
})

app.put('/', (req, res)=>{
  return res.json({
    message: 'chegou no put'
  })
})

app.delete('/', (req, res)=>{
  return res.json({
    message: 'chegou no delete'
  })
})

app.listen(3003, () => {
  console.log('server subiu')
});