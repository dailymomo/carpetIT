import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';
import BottomSection from '../start_page/BottomSection';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



// function to check the input of username, password
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;

const REGISTER_URL='/api/users/register'

const Register = () => {

  //function to test if str contains only letters
  function onlyLetters(str) {
    return /^[A-Za-z\s]*$/.test(str);
  }

  const userRef=useRef();
  const errRef=useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);




  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [questionAnswer, setQuestionAnswer] = useState('');
  const [validQA, setValidQA] = useState(false);
  const [questionFocus, setQuestionFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{userRef.current.focus();},[])

  //useEffect on username 
  useEffect(()=>{
    const result = USER_REGEX.test(user);
    setValidName(result);
  },[user])



  //useEffect on password
  useEffect(()=>{
    const result= PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  },[pwd,matchPwd]);

  //useEffect on error message
  useEffect(()=>{setErrMsg('')},[user,pwd,matchPwd])

  useEffect(()=>{
    const result = onlyLetters(questionAnswer) && questionAnswer;
    setValidQA(result);
  },[questionAnswer])


  //function to clean the useState.
  const cleanUp=()=>{
    setPwd('');
    setUser('');
    setQuestionAnswer('');
    setMatchPwd('');
  }

  //function to handle the submit. When event happens, connect to the server and post username and password.
  const handleSubmit = async(e)=>{
    e.preventDefault();
    
    try{

      const response = await axios.post(REGISTER_URL, JSON.stringify({user,pwd,questionAnswer}),
        {
          headers:{'Content-Type':'application/json'},
          withCredentials: true
        }
      );

      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      
      cleanUp();
      setSuccess(true);
      setShow(true);
      
    }
    catch(err){
      console.log(err.response.status)
      if (!err?.response){
        setErrMsg('No Server Response');

      }else if(err.response?.status===409){
        setErrMsg('Username Taken');
      }
      else{
        setErrMsg('Registration Failed');
      }

      errRef.current.focus();
    }

  }

  const checkDisabled=(validName,validMatch,validPwd,validQA)=>{

    if (!validName || !validPwd || !validMatch ||!validQA){
      return false;
    }
    return true;

  }

  return (
    <>
      
      <section>
       
        <p ref={errRef} className={errMsg? "errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>
            Username:
            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
          </label>
          <input 
            type='text' 
            id='username' 
            ref={userRef} 
            autoComplete='off' 
            onChange={(e)=>setUser(e.target.value)}
            required
            aria-invalid={validName? "false":"true"}
            aria-describedby="uidnote"
            onFocus={()=>setUserFocus(true)}
            onBlur={()=>setUserFocus(false)}
          ></input>
          <p id='uidnote' className={userFocus && user && !validName? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle}/>
            4 to 24 characters.<br/>
            Must begin with a letter. <br/>
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="password">
            Password:
            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.<br />
            Must include uppercase and lowercase letters, a number and a special character.<br />
            Allowed special characters: ! @ # % .
          </p>

          <label htmlFor="confirm_pwd">
            Confirm Password:
            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
          </label>
          <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>

          
          <label htmlFor='question'>
            Security Question: <br/>
            What is the name of your primary school?
            <FontAwesomeIcon icon={faCheck} className={validQA? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validQA || !questionAnswer? "hide" : "invalid"} />
          </label>
          <input 
            type='text' 
            id='question' 
            ref={userRef} 
            autoComplete='off' 
            onChange={(e)=>setQuestionAnswer(e.target.value)}
            required
            aria-invalid={validQA? "false":"true"}
            aria-describedby="uidnote"
            onFocus={()=>setQuestionFocus(true)}
            onBlur={()=>setQuestionFocus(false)}
          ></input>
          <p id='uidnote' className={questionFocus && questionAnswer && !validQA? "instructions" : "offscreen"}>
            
            <FontAwesomeIcon icon={faInfoCircle}/>
            Can only contain letters and space<br/>
          </p>

          {checkDisabled(validName,validMatch,validPwd,validQA)?
             <Button id='regSignIn' type='submit' >Sign Up</Button>
          :
            <Button id='regSignIn' type='submit' disabled>Sign Up</Button>
          }
         
        </form>

        <p>
          Already registered?&nbsp;&nbsp;&nbsp;
          <span className="line">
            <a href="/LogIn">Sign In</a>
          </span>
        </p>
      </section>

      <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registerion Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Start enjoying RecordIt Now!</Modal.Body>
        <Modal.Footer>
          <Link to='/LogIn'>
            <Button variant="primary" onClick={()=>setShow(false)}>
              LogIn
            </Button>
          </Link>
          <Link to='/'>
            <Button variant="secondary" onClick={()=>setShow(false)}>
              Back to home
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>

      <BottomSection>
      </BottomSection>
    </>
  
      
    
  )
}

export default Register