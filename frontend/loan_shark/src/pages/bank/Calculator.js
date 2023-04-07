import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { StatementService } from '../../services/StatementService';

function Calculator() {
    const [balance, setBalance] = useState(0);
    const [monthlySavings, setMonthlySavings] = useState(0);

	const [loanAmount, setLoanAmount] = useState("");
	const [months, setMonths] = useState("");
	const [interest, setInterest] = useState("");

    const [calculated, setCalculated] = useState(false);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    // TODO
	// const monthlyGoal = localStorage.getItem("monthlyGoal");
	// const monthlyBalance = localStorage.getItem("monthlyBalance");

    const monthlyGoal = 500;

    useEffect(() => {
        StatementService.getAllStatement()
            .then((res) => {
                let balance = 0;
                let startingBalance = 0;
        
                for (const statement of res) {
                    balance += statement.amount;
                    
                    const parts = statement.date.split("-");
                    const date = new Date(
                        parseInt(parts[0]), 
                        parseInt(parts[1]) - 1,
                        parseInt(parts[2])
                    );

                    if (date < new Date().setDate(1))
                        startingBalance += statement.amount;
                }
        
                setBalance(balance);
                setMonthlySavings(balance - startingBalance);
            });
    }, [])

    const calculate = (e) => {
        e.preventDefault();

        const p = parseFloat(loanAmount);
        const n = parseFloat(months);
        const r = parseFloat(interest) / 1200;
        const monthly = p * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));

        setMonthlyPayment(monthly);
        setTotalPayment(monthly * n);
        setCalculated(true);
    }

    const balanceAfterPayment = balance - monthlyPayment;
    const monthlySavingsAfterPayment = monthlySavings - monthlyPayment;

    const getAfterPaymentSavingsMessage = () => {
        if (monthlySavingsAfterPayment < 0)
            return {color: "#f00", text: "Monthly Savings Are Negative"}
        else if (monthlyGoal > monthlySavingsAfterPayment)
            return {color: "#f70", text: "Monthly Savings Drops Below Goal"}
        else
            return {color: "#0b0", text: "Monthly Savings Goal Is Still Met"}
    }

    const message = getAfterPaymentSavingsMessage();

	return (
		<div className="p-4"> 
			<h1 className='col-12 p-0 mb-5 text-center'>Calculate Your Loan Estimate</h1>
			<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
				<Form onSubmit={calculate} style={{marginRight: 32, width: 375}}>
					<Form.Group className="mb-3 col-12 p-0" controlId="formBasicEmail">
						<Form.Label>Loan Amount</Form.Label>
						<div className="d-flex align-items-center rounded bs-shadow" style={{padding: "8px 12px", border: "1px solid #ced4da"}}>
                            <span className="text-muted">$</span>
                            <Form.Control
                                onChange={e => setLoanAmount(e.target.value)}
                                placeholder="Enter Amount"
                                required
                                style={{ border: "none", padding: 0, marginLeft: 8, boxShadow: "none" }}
                                value={loanAmount}
                            />
                        </div>
					</Form.Group>
					<Form.Group className="mb-3 col-12 p-0" controlId="formBasicPassword">
						<Form.Label>Loan term (months)</Form.Label>
						<Form.Control
                            placeholder="Enter month term"
                            onChange={(e) => setMonths(e.target.value)}
                            required
                            type="number"
                            value={months}
                        />
					</Form.Group>
					<Form.Group className="mb-5 col-12 p-0" controlId="formBasicPassword">
						<Form.Label>Interest Rate</Form.Label>
						<div className="d-flex align-items-center rounded bs-shadow" style={{padding: "8px 12px", border: "1px solid #ced4da"}}>
                            <Form.Control
                                onChange={e => setInterest(e.target.value)}
                                placeholder="Enter interest rate"
                                style={{ border: "none", padding: 0, marginLeft: 8, boxShadow: "none" }}
                                required
                                value={interest}
                            />
                            <span className="text-muted">%</span>
                        </div>
					</Form.Group>
					<div style={{textAlign: "center"}}>
						<Button variant="primary" type="submit" style={{width: "100%"}}>
							Calculate
						</Button>
					</div>
				</Form>
                <div style={{width: 1, height: 475, backgroundColor: "#0002", marginRight: 32}}></div>
				<div style={{width: 400}}>
					<div style={{marginBottom: 16}}>
						<p class="text-muted" style={{fontSize: 18}}>Estimated payment</p>
						<div style={{display: "flex"}}>
							<div style={{flex: 1, textAlign: "left", flexShrink: 0}}>
								<h3 style={{fontWeight: "bold", margin: 0}}>
                                    ${monthlyPayment.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </h3>
								<p>Monthly</p>
							</div>
							<div style={{flex: 1, textAlign: "right", flexShrink: 0}}>
								<h3 style={{fontWeight: "bold", margin: 0}}>
                                    ${totalPayment.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </h3>
								<p>Total</p>
							</div>
						</div>
					</div>
                    <div style={{marginBottom: 32}}>
                        <p style={{marginBottom: 8, display: "flex", justifyContent: "space-between", fontSize: 17}}>
                            <span style={{marginLeft: 27}}>Current balance :</span>
                            <span style={{fontWeight: "bold"}}>{balance.toFixed(2)} <span className='text-muted'>$</span></span>
                        </p>
                        <p style={{marginBottom: 8, paddingBottom: 8, display: "flex", justifyContent: "space-between", fontSize: 17, borderBottom: "1px solid #000"}}>
                            <span style={{margin: 0}}>
                                <span style={{fontSize: 14, marginRight: 8, verticalAlign: "top"}}>—</span> Monthly payment:
                            </span>
                            <span style={{fontWeight: "bold"}}>{monthlyPayment.toFixed(2)} <span className='text-muted'>$</span></span>
                        </p>
                        <p style={{marginBottom: 8, display: "flex", justifyContent: "space-between", fontSize: 17}}>
                            <span>Balance after payment:</span>
                            <span style={{fontWeight: "bold"}}>{(balanceAfterPayment).toFixed(2)} <span className='text-muted'>$</span></span>
                        </p>
                    </div>
                    <div>
                        <p style={{marginBottom: 8, display: "flex", justifyContent: "space-between", fontSize: 17}}>
                            <span style={{marginLeft: 27}}>Monthly savings:</span>
                            <span style={{fontWeight: "bold"}}>{monthlySavings.toFixed(2)} <span className='text-muted'>$</span></span>
                        </p>
                        <p style={{marginBottom: 8, paddingBottom: 8, display: "flex", justifyContent: "space-between", fontSize: 17, borderBottom: "1px solid #000"}}>
                            <span style={{margin: 0}}>
                                <span style={{fontSize: 14, marginRight: 8, verticalAlign: "top"}}>—</span> Monthly payment:
                            </span>
                            <span style={{fontWeight: "bold"}}>{monthlyPayment.toFixed(2)} <span className='text-muted'>$</span></span>
                        </p>
                        <p style={{marginBottom: 8, display: "flex", justifyContent: "space-between", fontSize: 17}}>
                            <span style={{marginLeft: calculated ? 27 : 0}}>Monthly savings after payment:</span>
                            <span style={{fontWeight: "bold"}}>{(monthlySavingsAfterPayment).toFixed(2)} <span className='text-muted'>$</span></span>
                        </p>
                        <div style={{visibility: calculated ? "visible" : "collapse"}}>
                            <p style={{marginBottom: 8, paddingBottom: 8, display: "flex", justifyContent: "space-between", fontSize: 17, borderBottom: "1px solid #000"}}>
                                <span style={{margin: 0}}>
                                    <span style={{fontSize: 14, marginRight: 8, verticalAlign: "top"}}>—</span> Monthly savings goal:
                                </span>
                                <span style={{fontWeight: "bold"}}>{monthlyGoal.toFixed(2)} <span className='text-muted'>$</span></span>
                            </p>
                            <p style={{marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 17, color: message.color}}>
                                <span style={{fontSize: 15, fontWeight: "bold", textTransform: "uppercase", maxWidth: 150}}>
                                    {message.text}
                                </span>
                                <span style={{fontWeight: "bold"}}>
                                    {(monthlySavingsAfterPayment - monthlyGoal).toFixed(2)}
                                    <span> $</span>
                                </span>
                            </p>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	);
}

export default Calculator;