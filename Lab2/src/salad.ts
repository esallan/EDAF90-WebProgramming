import type { IngredientInfo, PartialInventory } from "./inventory";
import { v4 as uuidv4 } from "uuid";

type SaladInfo = {
  vegan: boolean;
  gluten: boolean;
  lactose: boolean;
};

class Salad {
  protected static instanceCounter = 1;
  readonly ingredients: PartialInventory;
  readonly uuid;

  constructor(init?: PartialInventory, uuid?: String) {
    this.ingredients = init || {}; //ensures that ingridients is always an object and never null/undefined
    this.uuid = uuid ?? "salad_" + uuidv4(); //if uuid is null -> generate a new one
  }

  /**
   * @returns a new salad object with the ingredient @name added.
   */
  add(name: string, info: IngredientInfo): Salad {
    const newSalad: PartialInventory = { ...this.ingredients, [name]: info };
    return new Salad(newSalad, this.uuid);
  }

  /**
   * @returns a new salad object with the ingredient @name removed.
   */
  remove(name: string): Salad {
    const newSalad = { ...this.ingredients };
    delete newSalad[name];
    return new Salad(newSalad, this.uuid);
  }

  /**
   * @returns the price of this salad.
   */
  price(): number {
    return Object.values(this.ingredients).reduce(
      (total, ingredient) => total + ingredient.price,
      0
    );
  }

  /**
   * @returns the aggregated info of of all ingredients.
   * vegan is true if all ingredients are vegan.
   * lactose and gluten is true if any of the ingredients contain the allergenic
   */
  info(): SaladInfo {
    return Object.values(this.ingredients).reduce(
      (info: SaladInfo, ingredient) => ({
        vegan: info.vegan && (ingredient.vegan || false),
        gluten: info.gluten || !!ingredient.gluten, //does same as others, (can use every och some)
        lactose: info.lactose || ingredient.lactose || false,
      }),
      { vegan: true, gluten: false, lactose: false }
    );
  }

  /**
   * @param json is a JSON string with an array of Salad objects
   * @returns an array of Salad objects.
   * @throws if json is not an array, or any of the objects do not
   * have the ingredients attribute
   */
  static parse(json: string): Salad[] {
    const list = JSON.parse(json);
    if (!Array.isArray(list)) {
      throw new Error("Expected an array");
    }

    return list.map((obj) => {
      if (!obj || typeof obj !== "object" || !("ingredients" in obj)) {
        throw new Error("Missing ingredients");
      }

      return new Salad(obj.ingredients, obj.uuid);
    });
  }
}


export { Salad };
