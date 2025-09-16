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

  constructor(init?: PartialGourmetInventory, uuid?: String) {
    super(undefined, uuid);
    this.ingredients = init ||  {};
  }

  add(name: string, info: IngredientInfo, amount = 1): GourmetSalad {
    const existing = this.ingredients[name as keyof GourmetInventory];
    const newAmount = (existing?.amount || 0) + amount;
    
    // This line creates a new ingredient object by copying all properties from 'info'
    // and adding/updating the 'amount' property to reflect the new total amount.
    const updatedInfo: GourmetIngredientInfo = { ...info, amount: newAmount };
    const newIngredients: PartialGourmetInventory = {
      ...this.ingredients,
       [name]: updatedInfo,
    } as PartialGourmetInventory;

    return new GourmetSalad(newIngredients);
  }

  price(): number {
    return Object.values(this.ingredients).reduce((sum, info) => sum + info.price * info.amount, 0)
  }
}

export { GourmetSalad };
