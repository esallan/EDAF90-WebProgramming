import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from '@radix-ui/react-navigation-menu';
import ComposeSalad from './salad-composition/compose-salad';
import ViewCart from './view-cart';
import { inventory } from './inventory';
import { Salad } from './salad';


const initialCart: Salad[] = [];

export function App() {
  const [cart, setCart] = useState<Salad[]>(initialCart);

  function addSalad(salad: Salad) {
    setCart([...cart, salad]);
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Rubrik */}
      <h1 className="text-3xl font-bold text-center mb-6">Min egen salladsbar</h1>

      {/* Navigation Menu med shadcn + react-router Link */}
      <NavigationMenu className = "flex justify-center gap-12 mb-10 list-none">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/">Välkommen</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/view-cart">Visa varukorg</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/compose-salad">Komponera sallad</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenu>
    
      

      {/* Outlet för att rendera barnsidor */}
      <Outlet context={{ inventory, cart, addSalad }} />
      
      
    </div>
  );
}

export default App;
