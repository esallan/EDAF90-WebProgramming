import { GourmetSalad } from './gourmet-salad';
import { inventory, IngredientInfo } from './inventory';
import { Salad } from './salad';

const caesarSalad = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);
/*
console.log(
  'own properties of caesarSalad:',
  Object.getOwnPropertyNames(caesarSalad).join(', ')
);
console.log(
  'own properties of Salad:',
  Object.getOwnPropertyNames(Salad).join(', ')
);
*/

function sharedOwnPropertyNamesOfObject(obj: Object): string[] {
  return ['todo'];
}
function sharedOwnPropertyNamesOfClass(constructor: Function): string[] {
  return ['todo'];
}

// console.log('typeof Salad:', typeof Salad);

function className(obj: Object): string {
  return 'todo';
}

const chickenSalad = new GourmetSalad()
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Kycklingfilé', inventory['Kycklingfilé'], 2);

type SaladPrices = {
  saladPrice: number;
  gourmetSaladPrice: number;
};
function saladPrices(salad: GourmetSalad): SaladPrices {
  const saladPrice = salad.price.call(salad); // TODO, call price() in Salad
  const gourmetSaladPrice = salad.price();
  return { saladPrice, gourmetSaladPrice };
}

export {
  className,
  saladPrices,
  sharedOwnPropertyNamesOfObject,
  sharedOwnPropertyNamesOfClass,
};
