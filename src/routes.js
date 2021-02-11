import ViewMajelProducts from './views/MajelViews/Products/ViewMajelProducts'

import CreateProduct from './views/MajelViews/Products/CreateProduct';



import Dashboard from "@material-ui/icons/Dashboard";

import MajelDashboard from "views/MajelViews/MajelDashboard";


const majelRoute = [
  {
    path: "/dashboard",
    name: "الطلبات",
    rtlName: "",
    icon: Dashboard,
    component: MajelDashboard,
    layout: "/majel"
  },
 
  {
    path: "/products/:id",
 
    sub:true,
    component: CreateProduct,
    layout: "/majel"
  },
  {
    path: "/products",
    name: "المنتجات",
    rtlName: " ",
    icon: Dashboard,
    component: ViewMajelProducts,
    layout: "/majel"
  },

 
];


export default {majelRoute };
