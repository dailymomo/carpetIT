import { useRef, useState, useEffect } from 'react';
import{useNavigate} from 'react-router-dom'; 
import axios from '../api/axios';
import BottomSection from '../start_page/BottomSection';
import Button from 'react-bootstrap/Button';

const AUTH_URL='/api/users/authorizeUser'

const Authentication = () => {

  const userRef=useRef();
  const errRef=useRef();
  const navigate=useNavigate();

  const [user, setUser] = useState('');
  const [questionAnswer, setQuestionAnswer] = useState('');
  const [errMsg, setErrMsg] = useState('');


  useEffect(()=>{userRef.current.focus();},[])

  //useEffect on username 
  useEffect(()=>{
    console.log(user);
  },[user])





  useEffect(()=>{
    console.log(questionAnswer);
  },[questionAnswer])

  useEffect(()=>{setErrMsg('')},[user,questionAnswer])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post(AUTH_URL,JSON.stringify({user,questionAnswer}),
      {headers:{'Content-Type': 'application/json'}, withCredentials: true});

      console.log(JSON.stringify(response.status));
      console.log(JSON.stringify(response?.data))
      
      console.log("here");
      setUser('');
      setQuestionAnswer('');
      navigate(`/ResetPassword/`,{replace:true});
      

    }
    
    catch(err){
      if (!err?.response){
        setErrMsg('No Server Response');
      }
      else if (err.response?.status===400){
        setErrMsg('User not exist!')
      }
      else if (err.response?.status===404){
        setErrMsg('Answer is wrong')
      }
      else{
        setErrMsg('Authentication Failed');
      }

      errRef.current.focus();

    }

  }
  return (
    <>

      <section>
        <p ref={errRef} className={errMsg? "errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Authentication</h1>
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


          <label htmlFor='question'>
            Security Question: Whats the name of your primary school?
          </label>
          <input 
            type='text' 
            id='secret_one' 
            onChange={(e)=>setQuestionAnswer(e.target.value)}
            value={questionAnswer}
            required
            aria-describedby="questionAnswernote"

          />

          

            <Button disabled={!user || !questionAnswer ? true : false} type='submit' style={{margin:"2px"}}>ResetPassword</Button>


        </form>


      </section>
    <BottomSection></BottomSection>      
    </>
  )
}

export default Authentication