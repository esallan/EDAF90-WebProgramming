import App from "./App";
import ComposeSalad from "./salad-composition/compose-salad";
import ViewCart from "./view-cart";


 const routerConfig = [
    {
      path: "/",
      Component: App,
      children:[
        {index: true, Component: Home},
        {path: "compose-salad", Component: ComposeSalad},
        {path: "view-cart/salad/:saladId" , Component: ViewCart},
        {path: "view-cart", Component: ViewCart},
        {path: "*", Component: PageNotFound},
        
      ],
    }];

    function Home(){
        return <h2 className="text-2xl font-bold text-center">Welcome</h2>
    }
    
    function PageNotFound(){ 
        return <h2 className="text-2xl text-center">not found</h2>
    }
    
    
    export {routerConfig} ;
  