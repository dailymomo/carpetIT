import React, { useState } from 'react';
import "./productCart.css"




export const ProductCart = ({ key, id, cover, name, price, cat,desc, isOpen, onTogglePopup}) => {
//   const [cartItems, setCartItems] = useState([]);

//   const handleButtonAddCart = e => {
//     e.preventDefault()
//     addToCart(name, price)
// }
  

 
  

  return (
    <>
      <div className='box boxItems' id='product'>
        <div className='img'>
            <img src={cover} alt='cover' />
        </div>
        <div className='details'>
          <h3>${price}</h3>
          <p>{name}</p>
        
          <button onClick={() => onTogglePopup(id)} className="popup_open">
            <img src="/detail_icon.png" alt="" className='detail_icon'/>
          </button>
          {isOpen &&(
            <div className='popup'>
              <div className='popup-content'>
                <h2>Details</h2>
                <div className='detail_pop'>
                <p>Category: {cat} </p>
                <p>{desc}</p>
                </div>
                <button onClick={() => onTogglePopup(id)} className="popup_close">Close</button>
              </div>
            </div>
          )}
          {/* <button onClick={() => addToCart({ name: {name}, price: {price} })}>Add to Cart</button> */}
        </div>
      </div>
    </>
  )
}
