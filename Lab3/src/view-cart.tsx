import { Button } from './components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';
import type { Salad } from './salad';
import { Badge, CircleCheckIcon } from 'lucide-react';
import { useOutletContext } from 'react-router';
import type { Inventory } from './inventory';
import { useParams } from 'react-router-dom';
import { Alert, AlertDescription } from './components/ui/alert';


type PropsType = { inventory: Inventory;
  cart: Salad[];
  addSalad: (s: Salad) => void; };

function ViewCart() {
  const { cart } = useOutletContext<PropsType>() ?? {cart: [], addSalad: () => {}, inventory: {} } ;
  const { saladId } = useParams<{ saladId: string }>() ?? {saladId: undefined} ;
  const newSalad = cart.find(s => s.uuid === saladId);

  return (
    <>
      <Card className="w-full p-3">
        {cardHead}
        <CardContent>
          {newSalad && (
            <Alert className="mb-4">
              <AlertDescription> En ny sallad har lagts till i varukorgen <br/> Den kostar {newSalad.price()} kr </AlertDescription>
            </Alert>)}
          <Table>
            {tableHead}
            <TableBody>
              {cart.map((salad) => (
              <TableRow
                key={salad.uuid}
              >
                <TableCell className="font-normal">
                  {Object.keys(salad.ingredients).join(', ')}
                  {salad.uuid === saladId && (
                    <Badge className="ml-2" >
                      Ny!
                    </Badge>
                  )}
                </TableCell>

                <TableCell>
                  <div>{salad.info().vegan ? (
                    <CircleCheckIcon className='text-primary m-auto'/> ) : null}
                  </div>
                </TableCell>

                <TableCell>
                  <div>{salad.info().lactose ? (
                    <CircleCheckIcon className="text-primary m-auto"></CircleCheckIcon>) : null}
                  </div>
                </TableCell>

                <TableCell>
                  <div>{salad.info().gluten ? (
                    <CircleCheckIcon className="text-primary m-auto"></CircleCheckIcon>) : null}
                  </div>
                </TableCell>

                <TableCell className="font-normal text-right tabular-nums">
                  {salad.price() + ' kr'}
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Totalt</TableCell>
                <TableCell className="text-right tabular-nums">
                  {cart.reduce((total, salad) => total + salad.price() , 0) + ' kr'}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

/*
 * static content, rendered when the file is loaded.
 */
const orderButton = (
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
const tableHead = (
  <TableHeader>
    <TableRow>
      <TableHead className="font-semibold">Ingredienser</TableHead>
      <TableHead className="font-semibold text-center">Vegan</TableHead>
      <TableHead className="font-semibold text-center">Lactose</TableHead>
      <TableHead className="font-semibold text-center">Gluten</TableHead>
      <TableHead className="font-semibold text-right">Pris</TableHead>
    </TableRow>
  </TableHeader>
);
const cardHead = (
  <CardHeader>
    <CardTitle>Varukorgen</CardTitle>
    <CardDescription>Här listas alla sallader du skapat.</CardDescription>
    <CardAction>{orderButton}</CardAction>
  </CardHeader>
);

export default ViewCart;
