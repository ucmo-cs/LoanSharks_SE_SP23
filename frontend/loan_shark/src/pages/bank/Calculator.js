import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import InputWithAdornment from '../../components/InputWithAdornment';
import { StatementService } from '../../services/StatementService';
import { dateStringToDate, toCurrency } from '../../services/utils';

const style = {
    payment: {
        container: { marginBottom: 16 },
        heading: { fontSize: 18 },
        content: {
            flexShrink: 0,
            text: { fontWeight: "bold", fontSize: 26, margin: 0 }
        }
    },
    separator: { width: 1, height: 475, backgroundColor: "#0002", marginRight: 32 },
    total: {
        minus: { fontSize: 14, marginRight: 8, verticalAlign: "top" },
        row: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
            fontSize: 16,
            lineHeight: 1.25
        },
        rowIndented: { paddingLeft: 25 },
        rowBottom: { paddingBottom: 8, borderBottom: "1px solid #000" },
        rowValue: { fontWeight: "bold", fontFamily: "monospace" },
        savingsResultMsg: { textTransform: "uppercase", fontWeight: "bold", fontSize: 14 }
    }
}

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
        
                res.forEach(statement => {
                    balance += statement.amount;
    
                    if (dateStringToDate(statement.date) < new Date().setDate(1))
                        startingBalance += statement.amount;
                })
        
                setBalance(balance);
                setMonthlySavings(balance - startingBalance);
            });
    }, [])

    const calculate = (e) => {
        e.preventDefault();

        const p = parseFloat(loanAmount.replace(/,/g, ""));
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
            return { color: "#f00", text: "Savings Are Negative" }
        else if (monthlyGoal > monthlySavingsAfterPayment)
            return { color: "#f70", text: "Savings Drop Below Goal" }
        else
            return { color: "#0b0", text: "Monthly Goal Is Still Met" }
    }

    const message = getAfterPaymentSavingsMessage();

	return (
		<div className="p-4"> 
			<h1 className='col-12 p-0 mb-5 text-center'>Calculate Your Loan Estimate</h1>
			<div className="d-flex justify-content-center align-items-center">
				<Form onSubmit={calculate} style={{marginRight: 32, width: 375}}>
					<Form.Group className="mb-3 col-12 p-0" controlId="amount">
						<Form.Label>Loan Amount</Form.Label>
                        <InputWithAdornment
                            adornment="$"
                            onChange={e => setLoanAmount(e.target.value)}
                            placeholder="Enter Amount"
                            required
                            value={loanAmount}
                        />
					</Form.Group>
					<Form.Group className="mb-3 col-12 p-0" controlId="term">
						<Form.Label>Loan term (months)</Form.Label>
						<Form.Control
                            placeholder="Enter month term"
                            onChange={(e) => setMonths(e.target.value)}
                            required
                            type="number"
                            value={months}
                        />
					</Form.Group>
					<Form.Group className="mb-5 col-12 p-0" controlId="interest">
						<Form.Label>Interest Rate</Form.Label>
                        <InputWithAdornment
                            adornment="%"
                            adornmentPlacement="right"
                            onChange={e => setInterest(e.target.value)}
                            placeholder="Enter interest rate"
                            required
                            value={interest}
                        />
					</Form.Group>
					<div className="d-grid gap-2">
						<Button variant="primary" type="submit">
							Calculate
						</Button>
					</div>
				</Form>
                <div style={style.separator} />
				<div style={{width: 400}}>
					<div style={style.payment.container}>
						<p className="text-muted" style={style.payment.heading}>
                            Estimated payment
                        </p>
						<div className="d-flex justify-content-between">
							<div style={style.payment.content}>
								<p style={style.payment.content.text}>{toCurrency(monthlyPayment)}</p>
								<p>Monthly</p>
							</div>
							<div style={{ ...style.payment.content, textAlign: "right" }}>
								<p style={style.payment.content.text}>{toCurrency(totalPayment)}</p>
								<p>Total</p>
							</div>
						</div>
					</div>
                    <div className="mb-4">
                        <p style={{ ...style.total.row, ...style.total.rowIndented }}>
                            <span>Current balance:</span>
                            <span style={style.total.rowValue}>
                                {balance.toFixed(2)} <span className='text-muted'>$</span>
                            </span>
                        </p>
                        <p style={{ ...style.total.row, ...style.total.rowBottom }}>
                            <span>
                                <span style={style.total.minus}>—</span> Monthly payment:
                            </span>
                            <span style={style.total.rowValue}>
                                {monthlyPayment.toFixed(2)} <span className='text-muted'>$</span>
                            </span>
                        </p>
                        <p style={style.total.row}>
                            <span>Balance after payment:</span>
                            <span style={style.total.rowValue}>
                                {(balanceAfterPayment).toFixed(2)} <span className='text-muted'>$</span>
                            </span>
                        </p>
                    </div>
                    <div>
                        <p style={{ ...style.total.row, ...style.total.rowIndented }}>
                            <span>Monthly savings:</span>
                            <span style={style.total.rowValue}>
                                {monthlySavings.toFixed(2)} <span className='text-muted'>$</span>
                            </span>
                        </p>
                        <p style={{ ...style.total.row, ...style.total.rowBottom }}>
                            <span>
                                <span style={style.total.minus}>—</span> Monthly payment:
                            </span>
                            <span style={style.total.rowValue}>
                                {monthlyPayment.toFixed(2)} <span className='text-muted'>$</span>
                            </span>
                        </p>
                        <p style={{ ...style.total.row, ...style.total.rowIndented }}>
                            <span>Monthly savings after payment:</span>
                            <span style={style.total.rowValue}>
                                {(monthlySavingsAfterPayment).toFixed(2)}
                                <span className='text-muted'> $</span>
                            </span>
                        </p>
                        <div style={{visibility: calculated ? "visible" : "hidden"}}>
                            <p style={{ ...style.total.row, ...style.total.rowBottom }}>
                                <span>
                                    <span style={style.total.minus}>—</span> Monthly savings goal:
                                </span>
                                <span style={style.total.rowValue}>
                                    {monthlyGoal.toFixed(2)} <span className='text-muted'>$</span>
                                </span>
                            </p>
                            <p style={{ ...style.total.row, color: message.color }}>
                                <span style={style.total.savingsResultMsg}>{message.text}</span>
                                <span style={style.total.rowValue}>
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