import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';
import BottomSection from '../start_page/BottomSection';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const RESET_URL='/api/users/resetpwd';

const ResetPassword = () => {
  function onlyLettersAndSpaces(str) {
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


  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const [show, setShow] = useState(false);

  useEffect(()=>{userRef.current.focus();},[])

  //useEffect on username 
  useEffect(()=>{
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  },[user])

  //useEffect on password
  useEffect(()=>{
    const result= PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  },[pwd,matchPwd]);

  //useEffect on error message
  useEffect(()=>{setErrMsg('')},[user,pwd,matchPwd])



  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.patch(RESET_URL,JSON.stringify({user,pwd}),
      {headers:{'Content-Type': 'application/json'},withCredentials: true});

      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setShow(true);
    }

    catch(err){
      if (!err?.response){
        setErrMsg('No Server Response');
      }
      else{
        setErrMsg('Reset Password Failed');
      }
      errRef.current.focus();
    }

  }

  return (
    <>

      <section>
        <p ref={errRef} className={errMsg? "errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Reset Your Password</h1>
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
            Allowed special characters: ! @ # %
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






          <br />
          <Button disabled={!validName || !validPwd || !validMatch ? true : false} type='submit' id='ResetButton' >Reset</Button>


        </form>

        <p>
          <span className="line">
            <a href="/LogIn">Return to LogIn</a>
          </span>
        </p>
      </section>
      
      <Modal show={show} onHide={()=>setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Password Reset Successful</Modal.Title>
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
      </BottomSection></>
  
      
    
  )
}

export default ResetPassword