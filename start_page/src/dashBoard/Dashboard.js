import React, { useEffect,useState } from 'react'
import { Order } from "../dashBoard/Order"
import { Category } from "../dashBoard/Category"
import { Product } from "../dashBoard/Product"
import Cart from './Cart';


import "./order.css"



const Dashboard = () => {


  const [isCartVisible, setCartVisible] = useState(false);



  const toggleCart = () => {
    setCartVisible(!isCartVisible);
  };






  return (
    
    <>

    
      <div className='cart-container'>
          <img src='/cart.png' alt='Shopping Cart' className='cart-icon' onClick={toggleCart}/>
      </div>

      <Category/>
      <Product/>




    </>
  )
}

export default Dashboard