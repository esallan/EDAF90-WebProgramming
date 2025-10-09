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
        {path: "view-cart/:saladId" , Component: ViewCart},
        {path: "view-cart", Component: ViewCart},
        {path: "*", Component: PageNotFound},
        
      ],
    }];

    function Home(){
        return <h2 className="text-2xl font-bold text-center">Välkommen!</h2>
    }
    
    function PageNotFound(){ 
        return <h2 className="text-2xl text-center">Page not found!</h2>
    }
    
    
    export {routerConfig} ;
  