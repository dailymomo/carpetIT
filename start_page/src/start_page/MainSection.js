import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';



const MainSection = () => {
  return (
    <>
      <main className='MainSection'>
      
        <h1>Welcome To CarpetIt</h1>
        <p>Shop what you desire </p>
        
        
        <Link to='/Register'  className='RegisterNow'>
          <Button variant="warning">Register Now</Button>
        </Link>
      
        <img src='start_page_4.webp' alt=''/>
        
      </main>
      
    </>
    
  )
}

export default MainSection