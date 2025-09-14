import { IngredientInfo, PartialInventory } from "./inventory";

type SaladInfo = {
  vegan: boolean;
  gluten: boolean;
  lactose: boolean;
};

class Salad {
  protected static instanceCounter = 1;
  protected readonly ingredients: PartialInventory;
  readonly uuid;

  constructor(init?: PartialInventory) {
    this.ingredients = {};
    this.uuid = "salad_" + "1"; //Salad.instanceCounter++;
  }

  /**
   * @returns a new salad object with the ingredient @name added.
   */
  add(name: string, info: IngredientInfo): Salad {


    return this;
  }

  /**
   * @returns a new salad object with the ingredient @name removed.
   */
  remove(name: string): Salad {
    return this;
  }

  /**
   * @returns the price of this salad.
   */
  price(): number {
    return -1;
    //must use array.prototype.reduce
  }

  /**
   * @returns the aggregated info of of all ingredients.
   * vegan is true if all ingredients are vegan.
   * lactose and gluten is true if any of the ingredients contain the allergenic
   */
  info(): SaladInfo {
    return { vegan: false, gluten: false, lactose: false };
    //must use array.prototype.reduce
  }

  /**
   * @param json is a JSON string with an array of Salad objects
   * @returns an array of Salad objects.
   * @throws if json is not an array, or any of the objects do not
   * have the ingredients attribute
   */
  static parse(json: string): Salad[] {
    const list = JSON.parse(json);
    return [];
  }
}

export { Salad };
