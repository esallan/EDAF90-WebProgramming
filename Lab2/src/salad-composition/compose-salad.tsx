import type { IngredientType, Inventory, PartialInventory } from '../inventory';
import { Button } from '../components/ui/button';
import { useEffect, useState } from 'react';
import type { CheckedState } from '@radix-ui/react-checkbox';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '../components/ui/alert-dialog';
import { AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { SelectIngredient } from './ingredient-select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const AddToCartButton = () => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button>Skicka beställningen</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Under utveckling</AlertDialogTitle>
        <AlertDialogDescription>
          Denna funktion implementeras under labb 4.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const CardHead = () => (
  <CardHeader>
    <CardTitle>Komponera en sallad</CardTitle>
    <CardDescription>Välj de ingredienser som ingår i salladen.</CardDescription>
    <CardAction>
      <AddToCartButton />
    </CardAction>
  </CardHeader>
);

function selectType(
  type: IngredientType, 
  inventory: Inventory
): string[] {
  return Object.entries(inventory).filter(([_, info]) => info?.type === type)
  .sort(([aName], [bName]) => aName.localeCompare(bName, "sv"))
  .map(([name]) => name)
}

type Props = {
  inventory: Inventory;
};

function ComposeSalad({ inventory }: Props) {
  const [foundation, setFoundation] = useState('');
  const [protein, setProtein] = useState('');
  const [extra, setExtra] = useState<PartialInventory>({});
  const [dressing, setDressing] = useState('');
  
  const baseNames = selectType('foundation', inventory);
  const proteinNames = selectType('protein', inventory);
  const extraNames = selectType('extra', inventory);
  const dressingNames = selectType('dressing', inventory);

  function handleChangeExtra(name: string, checked: CheckedState) {
    const ingredientInfo = inventory[name]; // We need hard brackets since the key is dynamic
    const shouldAdd = Boolean(checked);
    if (shouldAdd) {
      const newExtra = {
        ...extra,
        [name]: ingredientInfo,
      }
      setExtra(newExtra);
    } else {
      const newExtra = {...extra};
      delete newExtra[name];
      setExtra(newExtra);
    }
  }

  useEffect(() => {
    console.log(extra)
  }, [extra])

  return (
      <Card className="w-full p-3">
        <CardHead/>
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
            <span className="text-base font-semibold mb-1">Välj minst två extra ingredienser</span>
            <div className='grid grid-cols-4 grid-rows-7 gap-2'>
              {extraNames.map(name => (
                <Label>
                  <Checkbox checked={Boolean(extra[name])} onCheckedChange={(checked) => handleChangeExtra(name, checked)} />
                  <span>{name}, {inventory[name].price} kr</span>
                </Label>
            ))}
            </div>
          </Label>
        </CardContent>
      </Card>
  );
}

export default ComposeSalad;
