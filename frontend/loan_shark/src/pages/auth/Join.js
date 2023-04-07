import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { StatementService } from '../../services/StatementService';
import { AuthService } from '../../services/AuthService';
  
const ErrorForm = props => {
    let { error } = props;

    if (error) {
        return (<div class="row text-bold pl-2 text-danger text-bold"><p>{error}</p></div>);
    }
};

function Join() {
    const [accountCreated, setAccountCreated] = useState(false);
    const [initialBalance, setInitialBalance] = useState("");
    const [user, setJoin] = useState({
        username: '',
        password: '',
        error: '',
    });
    
    const changeValue = (e) => {
        setJoin({ ...user, [e.target.name]: e.target.value });
    }

    const saveInitialBalance = e => {
        e.preventDefault();

        const statement = {
            name: "Initial",
            amount: parseInt(initialBalance),
            date: toYYYYMMDD(new Date()),
            planned: false,
            frequency: null
        }

        StatementService.createStatement(statement)
            .then(function(res) {
                window.location.href = "/";
            })
            .catch(function() {
                
            });
    }

    const submitUser = (e) => {
        e.preventDefault();
        
        AuthService.createUser(user.username, user.password)
            .then(() => {
                setAccountCreated(true);
            })
            .catch(() => {
                setJoin({'error': "Error creating user, try a different username"});
            });
    };

    const toYYYYMMDD = (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${date.getFullYear()}-${month}-${day}`;
    }
    
    return (
        <div class="row justify-content-lg-center h-100 p-5">
            <div class="col-lg-5 h-100 d-flex" style={{flexDirection: "column"}}>
                <div class="text-center lg-3 mb-4">
                    <h2>Sign up</h2>
                </div>
                <div style={{flex: 0.8, display: "flex", justifyContent: "stretch", alignItems: "center", width: "100%"}}>
                    {accountCreated ? (
                        <div>
                            <p style={{textAlign: "center", fontWeight: "bold", marginBottom: 32, fontSize: 18}}>
                                Account creation successful. To get started, enter an initial balance.
                            </p>
                            <Form onSubmit={saveInitialBalance}>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <div className="d-flex align-items-center rounded bs-shadow" style={{padding: "8px 12px", flex: 1, border: "1px solid #ced4da"}}>
                                        <span className="text-muted">$</span>
                                        <Form.Control
                                            onChange={e => setInitialBalance(e.target.value)}
                                            placeholder="Enter starting balance"
                                            required
                                            style={{ border: "none", padding: 0, marginLeft: 8, boxShadow: "none" }}
                                            type="number"
                                            value={initialBalance}
                                        />
                                    </div>
                                    <div class="text-center" style={{marginLeft: 16}}>
                                        <Button variant="primary" style={{height: 42}} type="submit">
                                            Save 
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                            <ErrorForm error={user.error} />
                        </div>
                    ) : (
                        <>
                            <Form className="col-12" onSubmit={submitUser}>
                                <Form.Group controlId="formBasicEmailJoin">
                                    <Form.Label style={{marginBottom: 4}}>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Username"
                                        onChange={changeValue}
                                        name="username"
                                        required
                                    />
                                </Form.Group>
                                <div class="p-2"></div>
                                <Form.Group controlId="formBasicPasswordJoin">
                                    <Form.Label style={{marginBottom: 4}}>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="***********"
                                        onChange={changeValue}
                                        name="password"
                                        required
                                    />
                                </Form.Group>
                                <div class="mt-4 text-center">
                                    <Button variant="primary" style={{width: 100}} type="submit">
                                        Join 
                                    </Button>
                                </div>
                            </Form>
                            <ErrorForm error={user.error} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Join;