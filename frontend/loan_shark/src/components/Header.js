import react from 'react';
import {Button, Container, Nav, Navbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import { AuthService } from '../services/AuthService';

function Options() {
  if(AuthService.isLoggedIn()) {
    return <>
      <Link to ="/" onClick={() => window.location.href = "/"} className = "navbar-brand">Home</Link>
      <Link to ="/Calendar" onClick={() => window.location.href = "/Calendar"} className = "navbar-brand">Calendar</Link>
      <Link to ="/statements" onClick={() => window.location.href = "/statements"} className = "navbar-brand">Statements</Link>
      <Link to ="/calculator" onClick={() => window.location.href = "/calculator"} className = "navbar-brand">Calculator</Link>
  
      <Nav className="me-auto">
        <Link to ="#" onClick={() => AuthService.logout()} className = "nav-link">Logout</Link>
      </Nav>
   </>
  }
  else {
    return <>
      <Nav className="me-auto">
        <Link to ="/join" onClick={() => window.location.href = "/join"} className = "nav-link">Sign-up</Link>
        <Link to ="/login" onClick={() => window.location.href = "/login"} className = "nav-link">Login</Link>
      </Nav>
    </>
  }
}
function App() {
     //*!-- FIXME -- to attribute not working, using onclick, please change back to the attribute of to only with proper refresh, #ASK TEACHER!!
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Options />
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default App;