import {Knex} from "knex";

async function seed(knex: Knex){
  await knex('items').insert([
    {title: "Molas e amortecedores", image:"m&a.png"},
    {title: "Pneus 175/70/13", image:"pneu.png"},
    {title: "Filtro de ar", image:"fa.png"},
    {title: "Rolamento traseiro marea", image:"bomba.png"},
    {title: "Junta cabeçote peogeout 207", image:"lasanha.png"},
    {title: "Galao de óleo 20l", image:"oleo.png"},
    {title: "Galao de graxa 30kg", image:"graxa.png"},
  ]);
};

export {seed};