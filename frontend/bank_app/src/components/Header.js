import react from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';

 
function App() {
  return (
<>
  <Navbar bg="dark" variant="dark">
    <Container>
    <Link to ="/" className = "navbar-brand">Home</Link>

    <Nav className="me-auto">
      <Link to ="/join" className = "nav-link">Sign-up</Link>
      <Link to ="/login" className = "nav-link">Login</Link>
      <Link to ="/save" className = "nav-link">Write</Link>
 
    </Nav>
    </Container>
  </Navbar>
  <br />
 
 
</>
  );
}

export default App;