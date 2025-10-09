import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Inventory } from "@/inventory";

type SelectIngredientType = {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    options: string[];
    inventory: Inventory;
};

export function SelectIngredient({
    label,
    value,
    onValueChange,
    options,
    inventory
}: SelectIngredientType) {
    return (
      <Label className="grid grid-cols-2 mb-1">
        <span className="text-base font-semibold -mb-1">{label}</span>
        <Select required name={label} value={value} onValueChange={onValueChange}>
        <span aria-hidden="true">* </span> 
        <SelectTrigger aria-invalid={true} className="w-sm">
          <SelectValue placeholder={"gör ett val"} />
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