import { BrowserRouter, Route,Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import SellerRegister from './components/Login/SellerRegister';
import Dasboard from './components/Dasboard/Dasboard';
import Profile from './components/Dasboard/Profile';
import AddProduct from './components/Dasboard/AddProduct';
import ProductList from './components/Dasboard/ProductList';
import Private from './components/Dasboard/Private';
import Logout from './components/Dasboard/Logout';
import Home from './components/Home/Home';
import Mycart from './components/Mycart/Mycart';
import Description from './components/Description/Description';
import reducer from './components/Reducer';
import { createContext, useEffect, useReducer, useState } from 'react';
import UpdateProduct from './components/Dasboard/UpdateProduct';
import Success from './components/Dasboard/Success';
import COD from './components/Dasboard/COD';
import MyOrder from './components/Mycart/MyOrder';
import axios from 'axios';
import baseUrl from './Urls';

export const UserContext = createContext(null)

function App() {
  console.log('app component')
  const [customer,setcustomer] = useState({customer_user:{},jwttoken:''})
  const [seller,setseller] = useState({user:{},jwttoken:''})
  const [order_id,setorder_id] = useState(undefined)
  const [AllItem,setAllItem] = useState([])

  useEffect(()=>{
    if(localStorage.getItem('user')){
      const user = localStorage.getItem('user')
      const auth = localStorage.getItem('jwttoken')
      setseller({user:JSON.parse(user)[0],jwttoken:JSON.parse(auth)[0]})
  }
  },[])

  useEffect(()=>{
    if(localStorage.getItem('customer_user')){
      const user = localStorage.getItem('customer_user')
      const auth = localStorage.getItem('jwttoken')
      setcustomer({customer_user: JSON.parse(user)[0] ,jwttoken: JSON.parse(auth)[0]})
  }
  },[])

  useEffect(()=>{
    axios.get(`${baseUrl}/all-products`)
    .then((response)=>{
      setAllItem(response.data)
      // console.log('all-products ------->',response.data)
      if(localStorage.getItem('All-item')===null){
            localStorage.setItem('All-item',JSON.stringify(response.data))
      }
    }).catch((error)=>{
    })
  },[])
  console.log('All-item from app',AllItem)

  const initialState =[]
       const [state, dispatch] = useReducer(reducer, initialState);  
       const Increase =(product)=>{
        return dispatch({type:'increase',product:product})
      }
      const Decrease =(product)=>{
        return dispatch({type:'decrease',product:product})
      }

      function QuantityCounter(current_state){
        const quantity = {}
        for(let item of current_state){
          if(item._id in quantity){
            quantity[item._id] = quantity[item._id] + 1
          }else{
            quantity[item._id] = 1
          }
        }
        return quantity
      }

  return (
   <>
   <UserContext.Provider value={{state,Increase,Decrease,QuantityCounter,customer,setcustomer,seller,setseller,order_id,setorder_id,AllItem}}>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route element={<Private/>}>
            <Route path='/seller-profile' element={<Profile/>}/>
            <Route path='/seller-addproduct' element={<AddProduct/>}/>
            <Route path='/seller-products' element={<ProductList/>}/>
            <Route path='/seller-product-update/:id' element={<UpdateProduct/>}/>
            <Route path='/seller-logout' element={<Logout/>}/>
          </Route>

          <Route path='/seller-login' element={<SellerRegister/>}/>
          <Route path='/seller' element={<Dasboard/>}/>
            <Route path='' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/mycart' element={<Mycart/>}/>
            <Route path='/description/:id' element={<Description/>}/>
            <Route path='/success' element={<Success/>}/>
            <Route path='/cod' element={<COD/>}/>
            <Route path='/myorder' element={<MyOrder/>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
   </>
  );
}

export default App;
