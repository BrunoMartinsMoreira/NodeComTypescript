import {Knex} from "knex";

async function seed(knex: Knex){
  await knex('items').insert([
    {
      title: "Molas e amortecedores", 
      description:"kits de molas e amortecedore variados"
    },
    {
      title: "Pneus 175/70/13", 
      description:"carga de 500 unidades da marca pirelli"
    },
    {
      title: "Filtro de ar", 
      description:"50 unidade de filtro de ar esportivo"
    },
    {
      title: "Pastilhas de freio", 
      description:"120 kits de pastilhas para freios abs"
    },
    {
      title: "Cabeçote peogeout 207", 
      description:"O patrao vai ficar rico de tanto vender essa, saporra estraga a cada 2 meses"
    },
    {
      title: "Galao de óleo 20l", 
      description:"120 unidades de oleo lubrificante shell"
    },
    {
      title: "Galao de graxa 30kg", 
      description:"250 unidades de graxa premium para importados"
    },
    {
      title: "Kit suspensão a ar", 
      description:"30 kits de suspensão a ar para os boy luxar na pista"
    },
    {
      title: "Item aleatório", 
      description:"Aqui vai um item totalmente aleatório por que faltou criatividade, gastei tudo no item de cima"
    },
  ]);
};

export {seed};