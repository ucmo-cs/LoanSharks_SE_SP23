import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import ApiCallerService from '../../services/ApiCallerService';
import { AuthService } from '../../services/AuthService';

function Login() {
    const ErrorForm = props => {
        let { error } = props;
    
        if (error) {
            return (<div class="row pl-2 text-danger text-bold"><p>{error}</p></div>);
        }
    };
    const[user, setLogin] = useState({
        username:'',
        password:'',
        error:'',
      });
    
      const changeValue=(e)=>{
        setLogin({
         ...user, [e.target.name]:e.target.value  
        });
      }
    
       const submitUser = (e)=>{
            e.preventDefault();
            AuthService.login(user.username, user.password)
            .catch(() => {
                setLogin({'error': "Username and Password do not match"});
            });
       };
    
      return (
        <div class="row justify-content-lg-center">
            <div class="col-lg-3">
                <div class="border-dark border-bottom lg-3">
                    <h2>Login</h2>
                </div>
                <Form onSubmit = {submitUser}>
                <Form.Group controlId="formBasicEmailLogin">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" onChange = {changeValue} name="username" />
                </Form.Group>
                <div class="p-2"></div>
                <Form.Group controlId="formBasicPasswordLogin">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="***********" onChange = {changeValue} name="password"/>
                </Form.Group>
                
                <div class="mt-1">
                    <Button variant="primary" type="submit">
                        Login 
                    </Button>
                </div>
                </Form>
                <ErrorForm error={user.error} />
            </div>
        </div>
    );
}

export default Login;