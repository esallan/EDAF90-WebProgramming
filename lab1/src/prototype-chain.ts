import { Salad } from "./salad";
import { IngredientInfo, inventory } from "./inventory";
import { GourmetSalad } from "./gourmet-salad";
//import { ... } from './prototype-chain';

const caesarSalad = new Salad()
  .add("Sallad", inventory["Sallad"])
  .add("Kycklingfilé", inventory["Kycklingfilé"])
  .add("Bacon", inventory["Bacon"])
  .add("Krutonger", inventory["Krutonger"])
  .add("Parmesan", inventory["Parmesan"])
  .add("Ceasardressing", inventory["Ceasardressing"])
  .add("Gurka", inventory["Gurka"]);

console.log(
  "own properties of caesarSalad:",
  Object.getOwnPropertyNames(caesarSalad).join(", ")
);

console.log(
  "own properties of Salad:",
  Object.getOwnPropertyNames(Salad).join(", ")
);

function sharedOwnPropertyNamesOfObject(obj: Object): string[] {
  return Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
}
function sharedOwnPropertyNamesOfClass(constructor: Function): string[] {
  const ownProps = Object.getOwnPropertyNames(constructor.prototype);
  return ownProps;
}

console.log("typeof Salad:", typeof Salad);
//Var jag tvungen att lägga till dessa?
console.log(
  "GourmetSalad.prototype properties:",
  Object.getOwnPropertyNames(GourmetSalad.prototype)
);
console.log(
  "Salad.prototype properties:",
  Object.getOwnPropertyNames(Salad.prototype)
);
console.log(
  "sharedOwnPropertyNamesOfClass(GourmetSalad):",
  sharedOwnPropertyNamesOfClass(GourmetSalad)
);

function className(obj: Object): string {
  return obj.constructor.name;
}

const chickenSalad = new GourmetSalad()
  .add("Sallad", inventory["Sallad"], 0.5)
  .add("Kycklingfilé", inventory["Kycklingfilé"], 2);

type SaladPrices = {
  saladPrice: number;
  gourmetSaladPrice: number;
};
function saladPrices(salad: GourmetSalad): SaladPrices {
  const saladPrice = Salad.prototype.price.call(salad); // Call Salad's price() method
  const gourmetSaladPrice = salad.price(); // Call GourmetSalad's price() method
  return { saladPrice, gourmetSaladPrice };
}

export {
  className,
  saladPrices,
  sharedOwnPropertyNamesOfObject,
  sharedOwnPropertyNamesOfClass,
};
