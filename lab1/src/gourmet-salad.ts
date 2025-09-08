import { IngredientInfo, Inventory } from './inventory';
import { Salad } from './salad';

interface GourmetIngredientInfo extends IngredientInfo {
  amount: number;
}

type GourmetInventory = Readonly<
  Record<keyof Inventory, GourmetIngredientInfo>
>;
type PartialGourmetInventory = Readonly<
  Record<keyof GourmetInventory, GourmetIngredientInfo>
>;

class GourmetSalad extends Salad {
  protected readonly ingredients: PartialGourmetInventory;

  constructor(init?: PartialGourmetInventory) {
    super(init);
    // TODO
    this.ingredients = {};
  }

  add(name: string, info: IngredientInfo, amount = 1): GourmetSalad {
    // TODO
    return this;
  }

  price(): number {
    // TODO
    return -1;
  }
}

export { GourmetSalad };
