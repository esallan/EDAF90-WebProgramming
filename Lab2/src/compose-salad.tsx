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
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import { Salad } from './salad';

function selectType(type: IngredientType, inventory: Inventory): string[] {
  return ['copy ', 'the ', 'structure ', 'from ', 'lab 1 ', 'makeOptions '];
}

type PropType = {
  inventory: Inventory;
};
function ComposeSalad({ inventory }: PropType) {
  const [foundation, setFoundation] = useState('Sallad');
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
    <form>
      <SelectIngredient
        label="Välj bas"
        value={foundation}
        options={baseNames}
        onValueChange={setFoundation}
        inventory={inventory}
      ></SelectIngredient>
      foundation:{foundation}
    </form>
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
}: SelectIngredientType) {
  return (
    <Label className="grid grid-cols-1 gap-2 mb-4">
      <span className="text-base font-semibold -mb-1">{label}</span>
      <Select name={label} value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-sm">
          <SelectValue placeholder="gör ett val" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="{name}" key="{name}">
            TODO, TODO kr
          </SelectItem>
        </SelectContent>
      </Select>
    </Label>
  );
}

export default ComposeSalad;
