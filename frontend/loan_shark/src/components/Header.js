import { Container, Nav, Navbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import { AuthService } from '../services/AuthService';

function Options() {
  if(AuthService.isLoggedIn()) {
    return <>
      <Nav className="flex col-12">
        <Link 
          to ="/Calendar" onClick={() => window.location.href = "/Calendar"}
          className="navbar-brand"
        >
          Calendar
        </Link>
        <Link 
          to ="/statements" onClick={() => window.location.href = "/statements"}
          className="navbar-brand mx-2"
        >
          Statements
        </Link>
        <Link 
          to ="/calculator" onClick={() => window.location.href = "/calculator"}
          className="navbar-brand mx-3"
        >
          Calculator
        </Link>
        <Link 
          to="#" 
          onClick={() => AuthService.logout()} 
          className="nav-link" 
          style={{ marginLeft: "auto" }}
        >
          Logout
        </Link>
      </Nav>
   </>
  }
  else {
    return <>
      <Nav className="me-auto">
        <Link to ="/join" onClick={() => window.location.href = "/join"} className = "navbar-brand">Sign-up</Link>
        <Link to ="/login" onClick={() => window.location.href = "/login"} className = "navbar-brand">Login</Link>
      </Nav>
    </>
  }
}
function App() {
     //*!-- FIXME -- to attribute not working, using onclick, please change back to the attribute of to only with proper refresh, #ASK TEACHER!!
  return (
    <>
      <Navbar bg="success" variant="dark" id="main-navbar">
        <Container>
          <Options />
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default App;