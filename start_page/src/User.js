import React, { useEffect,useState } from 'react'
import { IoSettingsOutline } from "react-icons/io5"
import { BsBagCheck } from "react-icons/bs"
import { AiOutlineHeart } from "react-icons/ai"
import { GrHelp } from "react-icons/gr"
import { Link } from "react-router-dom"
import useAuth from './hooks/useAuth'
import axios from './api/axios'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const BUDGET_URL = 'api/records/setBudget'

export const User = () => {
  const user = true
  const [profileOpen, setProfileOpen] = useState(false)

  const {auth} =useAuth();
  var userName=auth.user;

  const GET_BUDGET_URL=`api/records/budget/${userName}`;
  const [budget, setBudget]=useState('');
  const [budgetShow, setBudgetShow] = useState(false);

  const close = () => {
    setProfileOpen(null)
  }

      //useEffect to get newest records when first rendering
      useEffect(()=>{

        const fetchBudget=async()=>{
          try{
            const response=await axios.get(GET_BUDGET_URL,{headers:{
              'Content-Type' : 'application/json',
              'Accept' : 'application/json',
              'Authorization' : JSON.parse(localStorage.getItem('accessToken'))}
              }
            )
            console.log(JSON.stringify(response));
            console.log(response.data.budget);
            setBudget(response.data.budget);
            
          }catch(err){
              console.error(err);
          }
        }
    
        fetchBudget();
    
        
      },[])
  
    const checkDisabled=(budget)=>{
      if (!budget ){
        return false;
      }
      return true;
    }
  
    const handleSubmit = async(e)=>{
      e.preventDefault();
      
      try{
  
        const response = await axios.post(BUDGET_URL, JSON.stringify({userName,budget}),
          {
            headers:{'Content-Type':'application/json', 'Authorization':auth?.accessToken},
            withCredentials: true
          }
        );
        console.log(response.data);
        console.log(response.accessToken);
        console.log(JSON.stringify(response));
        alert("profile update successfully");
        
      }
      catch(error) {
          console.log(error);
          alert("profile update failed");
        }
    }

  return (
    <>
      <div className='profile'>
        {user ? (
          <>
            <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
              <img src='https://cdn-icons-png.flaticon.com/512/2202/2202112.png' alt='' />
            </button>

            {profileOpen && (
              <div className='openProfile boxItems' onClick={close}>
 
                
                  <button className='box' onClick={()=>setBudgetShow(true)}>
                    <IoSettingsOutline className='icon' />
                    <h4>My Account</h4>
                  </button>
                
                <button className='box'>
                  <BsBagCheck className='icon' />
                  <h4>My Order</h4>
                </button>
                <button className='box'>
                  <AiOutlineHeart className='icon' />
                  <h4>Wishlist</h4>
                </button>
                <button className='box'>
                  <GrHelp className='icon' />
                  <h4>Help</h4>
                </button>
              </div>

              
            )}

<Modal show={budgetShow} onHide={()=>setBudgetShow(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Personal Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Group >
                        <form onSubmit={handleSubmit}>
                          <p>Your email address is</p >
                            <input
                            type="string"
                            
                            value={budget}
                            placeholder="enter your email!"
                            onChange={(e)=>setBudget(e.target.value)}
                          />
                          <><br></br></>
                          <p>Your preferred payment:</p>
                          <button>Credit card</button>
                          <button>Wechat</button>
                          <br></br>
                          {checkDisabled(budget)?
                            <button type="submit"  onClick={()=>setBudgetShow(false)}>Update your profile</button>
                          :
                          <button type="submit" disabled onClick={()=>setBudgetShow(false)}>Update your profile</button>}

                        </form> 
                        </Form.Group>
                      </Modal.Body>
                    </Modal>
          </>
        ) : (
          <button>My Account</button>
        )}
      </div>
    </>
  )
}
