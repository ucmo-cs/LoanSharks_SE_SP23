import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import ApiCallerService from '../../services/ApiCallerService';
import { AuthService } from '../../services/AuthService';
  
function Join() {
    const ErrorForm = props => {
        let { error } = props;
    
        if (error) {
            return (<div class="row text-bold pl-2 text-danger text-bold"><p>{error}</p></div>);
        }
    };
    const[user, setJoin] = useState({
        username:'',
        password:'',
        error:'',
      });
    
    
      const changeValue=(e)=>{
        setJoin({
         ...user, [e.target.name]:e.target.value  
        });
      }
    
       const submitUser = (e)=>{
            e.preventDefault();
            AuthService.createUser(user.username, user.password)
            .catch(() => {
                setJoin({'error': "Error creating user, try a different username"});
            });
       };
    
      return (
        <div class="row justify-content-lg-center">
            <div class="col-lg-3">
                <div class="border-dark border-bottom lg-3">
                    <h2>Sign up</h2>
                </div>
                <Form onSubmit = {submitUser}>
                <Form.Group controlId="formBasicEmailJoin">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" onChange = {changeValue} name="username" />
                </Form.Group>
                <div class="p-2"></div>
                <Form.Group controlId="formBasicPasswordJoin">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="***********" onChange = {changeValue} name="password"/>
                </Form.Group>
                <div class="mt-1">
                    <Button variant="primary" type="submit">
                        Join 
                    </Button>
                </div>
                </Form>
                <ErrorForm error={user.error} />
            </div>
        </div>
    );
}

export default Join;