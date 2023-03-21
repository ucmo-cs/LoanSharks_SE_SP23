import React /*, { useEffect, useState}*/ from 'react';
import { Form, Button } from 'react-bootstrap';
import { AuthService } from '../../services/AuthService';

function Debug() {
       const submitUser = (e)=>{
            e.preventDefault();
            AuthService.testCanAccess();
       };
    
      return (
        <div>
            <Form onSubmit = {submitUser}>
            <Button variant="primary" type="submit">
                PULL THE LEVER, CRONK! 
            </Button>
            </Form>
        </div>
    );
}

export default Debug;