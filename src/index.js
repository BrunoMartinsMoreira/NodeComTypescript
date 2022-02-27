const express = require("express");
const {v4} = require('uuid');

const app = express();
app.use(express.json())

const clients = [];
app.post('/cadastro', (req, res)=>{
  const { name, age } = req.body;
  const id = v4()

  const client = {
    id,
    name,
    age
  }

   clients.push(client)
   return res.json(client)
})

app.get('/cadastro',  (req, res)=> {
  return res.json(clients)
})

app.put('/cadastro/:id', (req, res)=>{
  const {id} = req.params;
  const{name, age} = req.body;

  const client = clients.filter(item => item.id = id);
  if(!client) {
    return res.status(400).json({
      error: 'nao encontrado'
    })
  }

  const clientAtt = {
    id,
    name,
    age
  }

  return res.json(clientAtt)
})

app.delete('/cadastro/:id', (req, res)=>{
  const {id} = req.params;
  const client = clients.filter(item => item.id !== id)
  return res.status(204).json(client)
})

app.listen(3005, () => {
  console.log('server subiu')
});