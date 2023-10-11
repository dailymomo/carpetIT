import React, { useState } from 'react';
import { product } from "../assets/data/data"
import "./product.css"
import { ProductCart } from "./ProductCart"

export const Product = () => {
  const [openPopupId, setOpenPopupId] = useState(null);

  const togglePopup = (id) => {
    if (openPopupId === id) {
      setOpenPopupId(null); 
    } else {
      setOpenPopupId(id);
    }
  };

  return (
    <>
      <section className='product'>
        <div className='container grid3' >
        {product.map((item) => (
          <div key={item.id}>
            <ProductCart key={item.id} id={item.id} cover={item.cover} name={item.name}desc={item.desc} price={item.price} cat={item.category} isOpen={openPopupId === item.id}
                onTogglePopup={togglePopup}>
      
              </ProductCart>
          </div>
          ))}
        </div>
        
      </section>
    </>
  )
}

