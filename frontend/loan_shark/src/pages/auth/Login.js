import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import ApiCallerService from '../../services/ApiCallerService';
import { AuthService } from '../../services/AuthService';
 
function Login() {

    const[user, setLogin] = useState({
        username:'',
        password:'',
      });
    
    
      const changeValue=(e)=>{
        console.log(e);
        setLogin({
         ...user, [e.target.name]:e.target.value  
        });
        console.log(e.target.name + " name "  );
        console.log(e.target.value + " value " );
      }
    
       const submitUser = (e)=>{
            e.preventDefault();
            AuthService.login(user);
       };
    
      return (
        <div>
            <Form onSubmit = {submitUser}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" onChange = {changeValue} name="username" />
            </Form.Group>
            
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="***********" onChange = {changeValue} name="password"/>
            </Form.Group>
            
            <Button variant="primary" type="submit">
                log in  
            </Button>
            </Form>
        </div>
    );
}

export default Login;