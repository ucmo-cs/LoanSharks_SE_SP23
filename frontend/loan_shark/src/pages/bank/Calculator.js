import React /*, { useEffect, useState}*/ from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";


 
function Calculator() {

  //const[data, setData] = useState([]);
/*
  fetch example
  useEffect(()=>{
      fetch("http://localhost:8080/book", {method:"GET"})
      .then(res => res.json())
      .then(res=> {setData(res);})
  },[])*/



  const[loanAmount, setLoanAmount] = useState(0)
  const[monthAmount, setMonthAmount] = useState(0)
  const[interestAmount, setInterestAmount] = useState(0)
  const[loanans,setLoanans]=useState(0);
  const[loanTotal, setLoanTotal] = useState(0);
  const[loanMonth, setLoanMonth] = useState(0);
  const [newBalance, setNewBalance] = useState(0);
  const monthlyGoal = localStorage.getItem("monthlyGoal");
  const monthlyBalance = localStorage.getItem("monthlyBalance");

  const changeValue=(e)=>{
    console.log(e);
    setLoanAmount({
        ...loanAmount, [e.target.name]:e.target.value
    });
    console.log(e.target.name + " amount")
    console.log(e.target.name + " terms")
  }

  const updateLoan = (e) =>{
    e.preventDefault();
    const r = interestAmount/1200;
    const n = monthAmount; // # of payments
    const loanans = (loanAmount*r*Math.pow(1+r,n))/ (Math.pow(1+r,n)-1);
    const Q = loanans * n;
    const calculatedBalance = monthlyBalance - loanans;
    setLoanans((e) => [loanans.toFixed(2)]);
    setLoanTotal((e) => [Q.toFixed(2)]);
    setLoanMonth((e) => [calculatedBalance.toFixed(2)]);
    setNewBalance(() => [calculatedBalance]);
  }

  const loanAdvice = () =>{
    if(monthlyBalance === null){
      return
    }
    if(newBalance < 0){
      return (<><h1 className='loanEstimateDisplay'>We strongly advise against this loan as it will put your monthly balance below 0.</h1>
      <h1 className='loanEstimateDisplay'>It is recommended to either decrease the loan amount or pay over more months.</h1></>)
    }
    if(newBalance < monthlyGoal){
      return (<><h1 className='loanEstimateDisplay'>We advise against this loan as it will take you below your monthly savings goal.</h1>
      <h1 className='loanEstimateDisplay'>It is recommended to either decrease the loan amount or pay over more months.</h1></>)
    }
    return (<h1 className='loanEstimateDisplay'>This is an acceptable loan amount as you will remain above your monthly savings goal.</h1>)
  }

  return (
    <> 
    <h1 className='calcHeader'>Take Control of Your Finances: Calculate Your Loan Estimate</h1>

<Form>
<Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Loan Amount</Form.Label>
        <Form.Control type="text" placeholder="Enter loan amount" onChange={(e)=>setLoanAmount(e.target.value)} name = "loanAmount"/>
        <Form.Text className="text-muted">
          We'll never share your loan details with anyone else
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Loan Terms (months)</Form.Label>
        <Form.Control type="text" placeholder="Enter month term" onChange={(e)=>setMonthAmount(e.target.value)} name = "monthAmount"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Interest Rate</Form.Label>
        <Form.Control type="text" placeholder="Enter interest rate" onChange={(e)=>setInterestAmount(e.target.value)} name = "interestAmount"/>
      </Form.Group>
      <div className="submitBut1">
      <Button  variant="primary" type="submit" onClick={updateLoan}>
        Calculate
      </Button>
<h1 className='loanEstimateDisplay'>Estimated payment per month: ${parseFloat(loanans)}</h1>
<h1 className='loanEstimateDisplay'>Estimated total payment:  ${parseFloat(loanTotal)}</h1>
<h1 className='loanEstimateDisplay'>Monthly savings goal: ${monthlyGoal}</h1>
<h1 className='loanEstimateDisplay'>Monthly balance: ${monthlyBalance}</h1>
<h1 className='loanEstimateDisplay'>New balance if loan taken: ${parseFloat(loanMonth)}</h1>
{loanAmount===0?null: loanAdvice()}
      </div>


</Form>



    </>

  );
}

export default Calculator;