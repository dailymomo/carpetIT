import React from 'react'
import{Link,useNavigate,useLocation} from 'react-router-dom'; 
import useLogOut from './hooks/useLogOut';
import Button from 'react-bootstrap/Button';
import { User } from "./User"




const Header = () => {
    //get current location
    const location=useLocation();
    console.log("current is "+location.pathname);

    const navigate=useNavigate();
    const logOut=useLogOut();


    //function to help user log out
    const signOut=async()=>{
      await logOut();
      navigate('/')
    }


    //if in home,signUop,Register page, header link stays the same, if in other such as dashboard, change to other link
  return (
    <header className='Header'>
        <h1 classname='RecordIt'><Link to='/' style={{color:'black'}}>CarpetIT</Link></h1>
        {location.pathname.includes('/dashboard')? (<>
            <User/>
            <Button variant="warning" type = "button" className='LogOut' onClick={signOut}>LogOut</Button>
            <Link to ='/About'> <Button variant="warning" type = "button" className='About'>About</Button></Link>
            
          



        </>):(<>
            <Link to = '/LogIn'> <Button variant="warning" type = "button" className='LogIn'>LogIn</Button></Link>
            <Link to = '/Register'> <Button variant="warning" type = "button" className='SignUp'>SignUp</Button></Link>
        </>)}
       <Link to ='/About'> <Button variant="warning" type = "button" className='About'>About</Button></Link>
       

    </header>
  )
}

export default Header