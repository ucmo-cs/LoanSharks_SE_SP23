import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import ApiCallerService from '../../services/ApiCallerService';
import { AuthService } from '../../services/AuthService';
 
function Join() {

    const[user, setJoin] = useState({
        username:'',
        password:'',
      });
    
    
      const changeValue=(e)=>{
        setJoin({
         ...user, [e.target.name]:e.target.value  
        });
      }
    
       const submitUser = (e)=>{
            e.preventDefault();
            AuthService.createUser(user.username, user.password);
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
                Join 
            </Button>
            </Form>
        </div>
    );
}

export default Join;