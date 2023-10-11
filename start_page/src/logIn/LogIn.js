import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom' 
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import BottomSection from '../start_page/BottomSection';
import Button from 'react-bootstrap/Button';




const LOGIN_URL='/api/users/login'
const LogIn = () => {
 
  //global componenet Auth
  const {setAuth}=useAuth();
  const userRef=useRef();
  const errRef=useRef();

  const navigate=useNavigate();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(()=>{userRef.current.focus();},[]);

  //useEffect on error message clean out error message when user or pwd changes 
  useEffect(()=>{setErrMsg('')},[user,pwd])

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
      const response = await axios.post(LOGIN_URL,JSON.stringify({user,pwd}),
      {headers:{'Content-Type': 'application/json'},withCredentials: true});
 
       const accessToken = response?.data?.token;

      localStorage.setItem('user',JSON.stringify(user));
      localStorage.setItem('pwd',JSON.stringify(pwd));
      localStorage.setItem('accessToken',JSON.stringify(accessToken));
      
      setAuth({user,pwd,accessToken});
      setUser('');
      setPwd('');
      navigate(`/dashboard/${user}`,{replace:true});
    }

    catch(err){
      if (!err?.response){
        setErrMsg('No Serve Response');
      }
      else if (err.response?.status===400){
        setErrMsg('Password is wrong')
      }
      else if (err.response?.status===401){
        setErrMsg('Unauthorized');
      }
      else if (err.response?.status===404){
        setErrMsg('Username Not Found')
      }
      else if (err.response?.status===220){
        setErrMsg('Server is not responding')
      }
      else{
        setErrMsg('LogIn Failed');
      }

      errRef.current.focus();
    }
    
  }


  const checkDisabled=(user,pwd)=>{
    if (!user||!pwd ){
      return false;
      
    }

    return true;
  }
  return (
   
    <>
    
    <section>
      <p ref={errRef} className={errMsg? "errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
      <h1 >LogIn</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>
            Username:
          
        </label>
        <input 
          type='text' 
          id='username' 
          ref={userRef} 
          autoComplete='off' 
          onChange={(e)=>setUser(e.target.value)}
          required
          aria-describedby="uidnote"
        
          value={user}
        ></input>
        
        <label htmlFor='password'>
            Password  
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-describedby="pwdnote"
        
        />

        {checkDisabled(user,pwd)?
          <Button id='LogsignIn' type='submit' style={{top:'2vh'}} >Sign In</Button>
        :
          <Button id='LogsignIn' type='submit' disabled style={{top:'2vh'}}>Sign In</Button>}
        


      </form>
      <p>
        Hasn't register yet?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="line">
          <a href="/Register">Register Now</a>
        </span>
      </p>
      <p>
        Forgot your password?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="line">
          <a href="/Authentication">Password Reset</a>
        </span>
      </p>
    </section>
    <BottomSection></BottomSection>
    </>      
  )
}

export default LogIn