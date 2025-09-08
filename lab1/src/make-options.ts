import { IngredientType, inventory, PartialInventory } from "./inventory";

// remove comment below to see printouts

const names = Object.keys(inventory);
names.forEach((name) => console.log(name));

for (const name in inventory) {
  console.log(name);
}
const myString = `We have ${names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: "case" }))
  .join(", ")} in stock.`;
console.log(myString);

function makeOptions(
  inventory: PartialInventory,
  type: IngredientType
): string[] {
  return Object.entries(inventory) // 1. alla [name, info] par
    .filter(([name, info]) => info?.type === type) // 2. filtrera på type
    .sort(([aName], [bName]) => aName.localeCompare(bName, "sv")) // 3. sortera
    .map(([name]) => `<option value="${name}">${name}</option>`); // 4. <option>
}

export { makeOptions };
