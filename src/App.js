import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./Component/Register/Register";
import AuthLayout from "./Component/Layout/AuthLayout";
import MainLayout from "./Component/Layout/MainLayout";
import Home from "./Component/Home/Home";
import Cart from "./Component/Cart/Cart";
import WishList from "./Component/WishList/WishList";
import Products from "./Component/Products/Products";
import Categories from "./Component/Categories/Categories";
import Brands from "./Component/Brands/Brands";
import NotFound from "./Component/NotFound/NotFound";
import Login from "./Component/Login/Login";
import ForgetPassword from "./Component/ForgetPassword/ForgetPassword";
import Reset from "./Component/Reset/Reset";
import Verify from "./Component/Verify/Verify";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthContextProvider from "./Component/Context/AuthContext";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import SubCat from "./Component/SubCat/SubCat";
import CartContextProvider from "./Component/Context/CartContext";
import { Toaster } from 'react-hot-toast';
import CashOrder from "./Component/CashOrder/CashOrder";
import WishContextProvider from "./Component/Context/WishContext";
import Profile from "./Component/Profile/Profile";

function App() {

  const queryClient = new QueryClient()

const Routes=  createBrowserRouter([
    {path:'/' , element:<AuthLayout/> ,children:[
      {path:'Register' , element: <Register/>},
      {path:'Login' , element: <Login/>},
      {path:'ForgetPassword' , element: <ForgetPassword/> },
      {path:'Reset' , element: <Reset/> },
      {path:'verify' , element: <Verify/> },
      {path:'*' , element: <NotFound/>},
    ]},
    {path:'/' , element:<MainLayout/> ,children:[
      {index:true , element:<ProtectedRoute><Home/></ProtectedRoute> },
      {path:'Home' , element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'profile' , element:<ProtectedRoute><Profile/></ProtectedRoute>},
      {path:'cart' , element: <ProtectedRoute><Cart/> </ProtectedRoute>},
      {path:'wishList' , element: <ProtectedRoute><WishList/></ProtectedRoute>},
      {path:'Products' , element:<ProtectedRoute> <Products/></ProtectedRoute>},
      {path:'ProductDetails/:id' , element:<ProtectedRoute> <ProductDetails/></ProtectedRoute>},
      {path:'Categories' , element:<ProtectedRoute><Categories/></ProtectedRoute> },
      {path:'subcat' , element:<ProtectedRoute><SubCat/></ProtectedRoute> },
      {path:'CashOrder' , element:<ProtectedRoute><CashOrder/></ProtectedRoute> },
      {path:'Brands' , element:<ProtectedRoute> <Brands/></ProtectedRoute>},
      {path:'*' , element: <NotFound/>},
    ]},
  ])
  return (
   <>
   <QueryClientProvider client={queryClient}>
    <WishContextProvider>
   <AuthContextProvider>
    <CartContextProvider>
   <RouterProvider router={Routes}/>
   </CartContextProvider>
   </AuthContextProvider>
   </WishContextProvider>
   </QueryClientProvider>
    <Toaster/>
   </>
  );
}

export default App;
