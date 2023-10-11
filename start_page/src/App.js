import Header from "./Header";
import StartPage from "./start_page/StartPage";
import LogIn from "./logIn/LogIn";
import Register from "./register/Register";
import Missing from "./Missing";
import Authentication from "./authentication/Authentication";
import ResetPassword from "./resetPassword/ResetPassword";
import {Route, Routes } from 'react-router-dom'; 
import Dashboard from "./dashBoard/Dashboard";


import About from "./About";
import RequireAuth from "./RequireAuth";
import PersistentLogIn from "./PersistentLogIn";





function App() {

  

  return (
    <div className="App">
      <Header></Header>

      <Routes>

        {/*public routes*/}
        <Route exact path='/' element={<StartPage/>}></Route>
        <Route exact path='/LogIn' element={<LogIn/>}></Route>
        <Route exact path='/Register' element={<Register/>}></Route>
        <Route exact path='/ResetPassword' element={<ResetPassword/>}></Route>
        <Route exact path='/Authentication' element={<Authentication/>}></Route>
        <Route exact path='/About' element={<About/>}></Route>

        

        <Route path='*' element={<Missing />}></Route>

        {/*needs to be protected*/}
        <Route element={<PersistentLogIn/>}>
          <Route element={<RequireAuth/>}>
            <Route exact path='/dashboard/:username' element={<Dashboard/>}></Route>
          </Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;


