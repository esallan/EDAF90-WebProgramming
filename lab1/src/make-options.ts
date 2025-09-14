import { IngredientType, Inventory, inventory, PartialInventory } from "./inventory";

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
  inventory: Inventory,
  type: IngredientType
): string[] {
  return Object.entries(inventory)
    .filter(([name, info]) => info?.type === type)
    .sort(([aName], [bName]) => aName.localeCompare(bName, "sv"))
    .map(
      ([name, info]) =>
        `<option value="${name}" key="${name}"> ${name}, ${info.price} kr</option>`
    );
}

export { makeOptions };
