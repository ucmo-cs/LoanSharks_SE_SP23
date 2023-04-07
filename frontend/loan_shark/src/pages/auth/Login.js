import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
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
        <div class="row justify-content-lg-center h-100 p-5">
            <div class="col-lg-5 h-100 d-flex" style={{flexDirection: "column"}}>
                <div class="text-center lg-3 mb-4">
                    <h2>Login</h2>
                </div>
                <div style={{flex: 0.8, display: "flex", justifyContent: "stretch", alignItems: "center", width: "100%"}}>
                    <Form onSubmit={submitUser} style={{width: "100%"}}>
                        <Form.Group controlId="formBasicEmailLogin">
                            <Form.Label style={{marginBottom: 4}}>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" onChange = {changeValue} name="username" />
                        </Form.Group>
                        <div class="p-2"></div>
                        <Form.Group controlId="formBasicPasswordLogin">
                            <Form.Label style={{marginBottom: 4}}>Password</Form.Label>
                            <Form.Control type="password" placeholder="***********" onChange = {changeValue} name="password"/>
                        </Form.Group>
                        <div class="mt-4 text-center">
                            <Button variant="primary" style={{width: 100}} type="submit">
                                Log in 
                            </Button>
                        </div>
                    </Form>
                    <ErrorForm error={user.error} />
                </div>
            </div>
        </div>
    );
}

export default Login;