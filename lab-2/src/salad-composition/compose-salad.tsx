import type { IngredientType, Inventory, PartialInventory } from '../inventory';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { SelectIngredient } from './ingredient-select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Salad } from '@/salad';

const CardHead = () => (
  <CardHeader>
    <CardTitle>Komponera en sallad</CardTitle>
    <CardDescription>Välj de ingredienser som ingår i salladen.</CardDescription>
    <CardAction></CardAction>
  </CardHeader>
);

function selectType(type: IngredientType, inventory: Inventory): string[] {
  return Object.entries(inventory)
    .filter(([_, info]) => info?.type === type)
    .sort(([aName], [bName]) => aName.localeCompare(bName, 'sv'))
    .map(([name]) => name);
}

type Props = {
  inventory: Inventory;
  addToCart: (salad: Salad) => void;
};

function ComposeSalad({ inventory, addToCart }: Props) {
  const [foundation, setFoundation] = useState('');
  const [protein, setProtein] = useState('');
  const [extra, setExtra] = useState<PartialInventory>({});
  const [dressing, setDressing] = useState('');
  const [hasSelectedAllRequired, setHasSelectedAllRequired] = useState(false);

  const baseNames = selectType('foundation', inventory);
  const proteinNames = selectType('protein', inventory);
  const extraNames = selectType('extra', inventory);
  const dressingNames = selectType('dressing', inventory);

  function handleChangeExtra(name: string, checked: boolean) {
    if (checked) {
      setExtra({ ...extra, [name]: inventory[name] });
    } else {
      const newExtra = { ...extra };
      delete newExtra[name];
      setExtra(newExtra);
    }
  }

  useEffect(() => {
    if (!foundation || !protein || !dressing) {
      setHasSelectedAllRequired(false);
      return;
    }

    if (Object.entries(extra).length < 2) {
      setHasSelectedAllRequired(false);
      return;
    } else {
      setHasSelectedAllRequired(true);
      return;
    }
  }, [extra, foundation, protein, dressing]);

  return (
    <Card className="w-full p-3">
      <CardHead />
      <CardContent>
        <SelectIngredient
          label="Välj bas"
          value={foundation}
          options={baseNames}
          onValueChange={setFoundation}
          inventory={inventory}
        />

        <SelectIngredient
          label="Välj protein"
          value={protein}
          options={proteinNames}
          onValueChange={setProtein}
          inventory={inventory}
        />

        <Label className="grid grid-cols-1 gap-2 mb-4">
          <span className="text-base font-semibold mb-1">
            Välj minst två extra ingredienser
          </span>
          <div className="grid grid-cols-4 grid-rows-7 gap-2">
            {extraNames.map(name => (
              <Label key={name}>
                <Checkbox
                  checked={Boolean(extra[name])}
                  onCheckedChange={checked => {
                    handleChangeExtra(name, Boolean(checked));}}
                    aria-label={name}
                />
                <span>
                  {name}, {inventory[name].price} kr
                </span>
              </Label>
            ))}
          </div>
        </Label>

        <SelectIngredient
          label="Välj dressing"
          value={dressing}
          options={dressingNames}
          onValueChange={setDressing}
          inventory={inventory}
        />

        <div className="flex justify-end mt-4">
          <Button
            disabled={!hasSelectedAllRequired}
            onClick={() => {
              let newSalad = new Salad()
                .add(foundation, inventory[foundation])
                .add(protein, inventory[protein])
                .add(dressing, inventory[dressing]);
              
                for (const [name, info] of Object.entries(extra)) {
                  newSalad = newSalad.add(name, info);
                }

              // Object.entries(extra).forEach(([name, info]) => newSalad.add(name, info));

              addToCart(newSalad);

              // Rensa valen efter klick
              setFoundation('');
              setProtein('');
              setDressing('');
              setExtra({});
            }}
          >
            Lägg i varukorgen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ComposeSalad;
