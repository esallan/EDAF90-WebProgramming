import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import type { IngredientType, Inventory, PartialInventory } from './inventory';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import { useState, type FormEvent } from 'react';
import { Checkbox } from './components/ui/checkbox';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { Alert, AlertTitle } from './components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import { Salad } from './salad';
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from './components/ui/alert-dialog';
import { AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';



type PropType = {
  inventory: Inventory;
};
function ComposeSalad({ inventory }: PropType) {
  const [foundation, setFoundation] = useState('');
  const [protein, setProtein] = useState('');
  const [extra, setExtra] = useState<PartialInventory>({});
  const [dressing, setDressing] = useState('');
  const baseNames = selectType('foundation', inventory);
  const proteinNames = selectType('protein', inventory);
  const extraNames = selectType('extra', inventory);
  const dressingNames = selectType('dressing', inventory);

  function handleChangeExtra(name: string, checked: CheckedState) {
    // setExtra( TODO )
  }

  return (
      <Card className = "w-full p-3">
        {cardHead}
        <CardContent>
        <SelectIngredient
        label="Välj bas"
        value={foundation}
        options={baseNames}
        onValueChange={setFoundation}
        inventory={inventory}
      ></SelectIngredient>
      <SelectIngredient
        label="Välj protein"
        value={protein}
        options={proteinNames}
        onValueChange={setProtein}
        inventory={inventory}
      ></SelectIngredient>
        </CardContent>
      </Card>
  );
}

type SelectIngredientType = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  inventory: Inventory;
};


function SelectIngredient({
  label,
  value,
  onValueChange,
  options,
  inventory,
}: 

SelectIngredientType) {
  return (
    <Label className="grid grid-cols-1 gap-2 mb-4">
      <span className="text-base font-semibold -mb-1">{label}</span>
      <Select name={label} value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-sm">
          <SelectValue placeholder="gör ett val" />
        </SelectTrigger>
        <SelectContent>
          {options.map((name) => (
          <SelectItem value={name} key={name}>
            {name}, {inventory[name].price} kr
          </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Label>
  );
}

const addToCartButton = (
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

function selectType(
  type: IngredientType, 
  inventory: Inventory
): string[] {
  return Object.entries(inventory).filter(([_, info]) => info?.type === type)
  .sort(([aName], [bName]) => aName.localeCompare(bName, "sv"))
  .map(([name]) => name)
}


const cardHead = (
  <CardHeader>
    <CardTitle>Komponera en sallad</CardTitle>
    <CardDescription>Välj de ingredienser som ingår i salladen.</CardDescription>
    <CardAction>{addToCartButton}</CardAction>
  </CardHeader>
);

export default ComposeSalad;
