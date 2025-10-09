import type { IngredientType, Inventory, PartialInventory } from '../inventory';
import { useState, type FormEvent } from 'react';
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
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';


const CardHead = () => (
  <CardHeader>
    <CardTitle>Komponera en sallad</CardTitle>
    <CardDescription>Välj de ingredienser som ingår i salladen.</CardDescription>
    <CardAction></CardAction>
  </CardHeader>
);

function selectType(type: IngredientType, inventory: Inventory): string[] {
  return Object.entries(inventory)
    .filter(([, info]) => info?.type === type) //"_" konvention för att visa att nyckeln inte kommer användas 
    .sort(([aName], [bName]) => aName.localeCompare(bName, 'sv'))
    .map(([name]) => name);
}

type PropsType = {
  inventory: Inventory;
  addSalad: (salad: Salad) => void;
};

function ComposeSalad() {
  const { inventory, addSalad} = useOutletContext<PropsType>() ?? { inventory: {}, addSalad: () => {} };


  const [foundation, setFoundation] = useState('');
  const [protein, setProtein] = useState('');
  const [extra, setExtra] = useState<PartialInventory>({});
  const [dressing, setDressing] = useState('');
  
  const [, setErrorMessage] = useState(""); 
  const [submitted, setSubmitted] = useState(false);

  const baseNames = selectType('foundation', inventory);
  const proteinNames = selectType('protein', inventory);
  const extraNames = selectType('extra', inventory);
  const dressingNames = selectType('dressing', inventory);

  const navigate = useNavigate();

  function handleChangeExtra(name: string, checked: boolean) {
    if (checked) {
      setExtra({ ...extra, [name]: inventory[name] });
    } else {
      const newExtra = { ...extra };
      delete newExtra[name];
      setExtra(newExtra);
    }
  }

  function handleSubmit(e : FormEvent<HTMLFormElement>){
    e.preventDefault();
    setSubmitted(true);

    if (!foundation || !protein || !dressing) {
      setErrorMessage("Vänligen gör ett val");
      return;
    }
    if (Object.entries(extra).length < 2) {
      setErrorMessage("Vänligen välj minst två extra ingredienser")
      return;
    }

    setErrorMessage("");

    let newSalad = new Salad()
                .add(foundation, inventory[foundation])
                .add(protein, inventory[protein])
                .add(dressing, inventory[dressing]);
              
                for (const [name, info] of Object.entries(extra)) {
                  newSalad = newSalad.add(name, info);
                }
                
                addSalad(newSalad);

                navigate(`/view-cart/salad/${newSalad.uuid}`);

              // Rensa valen efter klick
              setFoundation('');
              setProtein('');
              setDressing('');
              setExtra({});

  }


  return (
    <Card className="w-full p-3">
      <CardHead />
      <CardContent>
        <form onSubmit={handleSubmit}>
          
            <SelectIngredient
            label="Välj bas"
            value={foundation}
            options={baseNames}
            onValueChange={setFoundation}
            inventory={inventory}
            />
            {submitted && !foundation && (
              <Alert variant="destructive" className='border-none'>
              <AlertDescription><div className="flex gap-1 items-center"><Info className='h-4 w-4'/><span>Gör ett val</span></div></AlertDescription>
              </Alert>
            )}

            <SelectIngredient
            label="Välj protein"
            value={protein}
            options={proteinNames}
            onValueChange={setProtein}
            inventory={inventory}
           />
           {submitted && !protein && (
              <Alert variant="destructive" className='border-none'>
              <AlertDescription><div className="flex gap-1 items-center"><Info className='h-4 w-4'/><span>Gör ett val</span></div></AlertDescription>
              </Alert>
            )}

        <Label className="grid grid-cols-1 gap-2 mb-4">
          <span className="text-base font-semibold mb-1">
            Välj minst två extra ingredienser*
          </span>
          <div className="grid grid-cols-4 grid-rows-7 gap-2">
            {extraNames.map(name => (
              <div key={name} className='flex flex-row gap-2'>
                <Checkbox id={name}
                checked={Boolean(extra[name])}
                onCheckedChange={checked => {
                  handleChangeExtra(name, Boolean(checked));}}
              />
             
              <Label htmlFor={name}>
                <span>
                  {name}, {inventory[name].price} kr
                </span>
              </Label>
              </div>
          ))}
          </div>{submitted && Object.entries(extra).length < 2 && (
              <Alert variant="destructive" className='border-none'>
              <AlertDescription><div className="flex gap-1 items-center"><Info className='h-4 w-4'/><span>Välj minst två</span></div></AlertDescription>
              </Alert>
            )}
        </Label>

        <SelectIngredient
          label= {"Välj dressing"}
          value={dressing}
          options={dressingNames}
          onValueChange={setDressing}
          inventory={inventory}
        />
        {submitted && !dressing &&(
          <Alert variant="destructive" className="border-none">
              <AlertDescription><div className="flex gap-1 items-center"><Info className='h-4 w-4'/><span>Gör ett val</span></div></AlertDescription>
              </Alert>
        )}
        <div className="flex justify-end mt-4">
          <Button type="submit">
            Lägg till i varukorgen
          </Button>
        </div>
       
        </form>
      </CardContent>
    </Card>
  );
}

export default ComposeSalad;
