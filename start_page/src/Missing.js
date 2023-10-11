import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';



const Missing = () => {
  return (
    <main id='Missing'>
       <h1> Ooops... This page is Missing</h1>
       <h2>
        <Link to={'/'}><Button variant="warning">Back To Home</Button></Link>
       </h2>
       
    </main>
  )
}

export default Missing