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
import { CircleCheckIcon } from 'lucide-react';
import { useState } from 'react';

type PropsType = { cart: Salad[] };
function ViewCart({ cart }: PropsType) {
  return (
    <>
      <Card className="w-full p-3">
        {cardHead}
        <CardContent>
          <Table>
            {tableHead}
            <TableBody>
              {cart.map((salad) => (
              <TableRow key="{salad.uuid}">
                <TableCell className="font-normal">
                  {Object.keys(salad.ingredients).join(' ,')}
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
                  {salad.price()}
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Totalt</TableCell>
                <TableCell className="text-right tabular-nums">
                  {cart.reduce((total, salad) => total + salad.price() , 0)}
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
