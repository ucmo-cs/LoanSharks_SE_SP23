import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, Popover, OverlayTrigger } from 'react-bootstrap';
import { Event } from "@mui/icons-material";
import { StatementService } from '../../services/StatementService';
import InputWithAdornment from '../../components/InputWithAdornment';
import { dateStringToDate, toCurrency, toYYYYMMDD } from '../../services/utils';

const style = {
    amount: {
        margin: 0,
        fontSize: 24,
        textAlign: "right",
        fontWeight: "600",
        lineHeight: 1
    },
    balance: { fontWeight: "bold", fontSize: 32, lineHeight: 1, margin: 0 },
    balanceAfterStatement: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#000a"
    },
    buttonsWrapper: {
        textAlign: "center"
    },
    date: {
        flex: 1, 
        fontSize: 15
    },
    delete: {
        position: "absolute", 
        top: 4,
        right: 8,
        lineHeight: 1,
        padding: 0,
        fontWeight: "bold",
        border: "none", 
        backgroundColor: "#0000",
        color: "#000a",
        textDecoration: "underline"
    },
    error: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        color: "#dc3545",
        margin: 0
    },
    inlineButton: {
        margin: "0 2px 0 2px",
        padding: "0 5px 0 5px",
    },
    planned: {
        display: "flex",
        alignItems: "center",
        margin: "0 8px",
        paddingTop: 4,
        icon: {
            fontSize: 16,
            marginRight: 4
        },
        frequency: {
            margin: 0,
            fontSize: 14,
            fontWeight: "500",
            lineHeight: 1,
            marginTop: -1,
            textTransform: "capitalize"
        }
    },
    statementList: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: 628, 
        margin: "0 auto 48px",
        listStyleType: "none"
    },
    statementHeader: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: 628, 
        margin: "24px auto 0",
        listStyleType: "none",
        padding: "1px",
        border: "1px solid #0003"
    },
    statement: {
        container: {
            width: 310,
            marginBottom: 8,
            border: "1px solid #0003"
        },
        header: {
            width: "100%",
            height: 24,
            borderBottom: "1px solid #0003",
            position: "relative"
        },
        content: {
            display: "flex", 
            alignItems: "center",
            padding: "6px 8px 2px",
            left: {
                flex: 7
            },
            right: {
                flex: 3,
                textAlign: "right"
            }
        }
    },
}

const StatementDelete = ({onClick, onDelete}) => {
    return (
        <OverlayTrigger
            overlay={
                <Popover>
                    <Popover.Header className="p-1 px-3 text-center" style={{fontSize: 15}}>
                        Confirm?
                    </Popover.Header>
                    <Popover.Body className="p-1 text-center">
                        <Button
                            className="col-12"
                            onClick={onDelete}
                            size="sm"
                            variant="outline-primary" 
                        >
                            Yes
                        </Button>
                    </Popover.Body>
                </Popover>
            }
            placement="right" 
            rootClose
            trigger="click" 
        >
            <Button onClick={onClick} size="sm" style={style.delete}>Delete</Button>
        </OverlayTrigger>
    )
}

function Statements() {
    const [balance, setBalance] = useState(0);
    const [deleteOverlayId, setDeleteOverlayId] = useState(null);
    const [error, setError] = useState("");
    const [newStatement, setStatementCreate] = useState({
        name: "",
        amount: "",
        date: toYYYYMMDD(new Date()),
        frequency: "none"
    }); 
    const [showAddStatementModal, setShowAddStatementModal] = useState(false);
    const [statements, setStatements] = useState([]);
    const [statementsData, setStatementsData] = useState([]);

    useEffect(() => {
        StatementService.getAllStatement().then(result => setStatementsData(result));
    }, []);

    useEffect(() => {
        let newBalance = 0;

        const sorted = statementsData
            .map(statement => ({ ...statement, date: dateStringToDate(statement.date)}))
            .sort((a, b) => a.date - b.date)
            .map(statement => {
                newBalance += statement.amount;
                return { ...statement, balance: newBalance };
            });

        sorted.reverse();

        setBalance(newBalance);
        setStatements(sorted);
    }, [statementsData])
    
    const addStatement = (e) => {
        e.preventDefault();

        const statement = {
            ...newStatement,
            amount: parseFloat(newStatement.amount.replace(/,/g, "")),
            planned: newStatement.frequency !== "none",
            frequency: newStatement.frequency
        };

        StatementService.createStatement(statement)
            .then(function(res) {
                closeModal();
                setStatementsData([...statementsData, res]);
            })
            .catch(function() {
                setError("A backend error occurred.");
            });
    }

    const closeModal = () => {
        setStatementCreate({
            name: "",
            amount: "",
            date: toYYYYMMDD(new Date()),
            frequency: "none"
        });
        setShowAddStatementModal(false);
    }
    
    const changeNewStatementValue = (e) => {
        setStatementCreate({ ...newStatement, [e.target.name]: e.target.value });
    }

    const deleteStatement = (id) => {
        StatementService.deleteStatement(id)
            .then((res) => {
                setStatementsData(statementsData.filter(statement => statement.id !== id));
                setDeleteOverlayId(null);
            });
    }

    const openModal = () => {
        setError("");
        setShowAddStatementModal(true);
    }

    return (
        <div className="p-4 d-flex flex-column">
            <div
                className="d-flex justify-content-between align-items-center mx-auto mb-4"
                style={{ width: 628 }}
            >
                <div>
                    <p style={{ marginBottom: 0 }}>Balance</p>
                    <p style={style.balance}>
                        {toCurrency(balance)}
                    </p>
                </div>
                <Button variant="primary" type="submit" onClick={openModal}>
                    Add a statement 
                </Button>
            </div>
            <div>
                <div style={style.statementList}>
                    {statements.map(statement => (
                        <div key={statement.id} style={style.statement.container}>
                            <div style={style.statement.header}>
                                {statement.planned ? (
                                    <div style={style.planned}>
                                        <Event style={style.planned.icon} />
                                        <p style={style.planned.frequency}>
                                            {statement.frequency} transaction
                                        </p>
                                    </div>
                                ) : null}
                                <StatementDelete
                                    onClick={() => setDeleteOverlayId(statement.id)}
                                    onDelete={() => deleteStatement(deleteOverlayId)}
                                />
                            </div>
                            <div style={style.statement.content}>
                                <div style={style.statement.content.left}>
                                    <p className="text-muted" style={{fontSize: 15, margin: 0}}>
                                        {statement.date.toLocaleDateString("en-US")}
                                    </p>
                                    <p style={{margin: 0}}>{statement.name}</p>
                                </div>
                                <div style={style.statement.content.right}>
                                    <p
                                        style={{
                                            ...style.amount,
                                            color: statement.amount < 0 ? "#EA5455" : "#5D9C59"
                                        }}
                                    >
                                        {toCurrency(statement.amount)}
                                    </p>
                                    <span style={style.balanceAfterStatement}>
                                        {toCurrency(statement.balance)}
                                    </span>
                                </div>
                            </div>
                        </div>     
                    ))}
                </div>
            </div>

            <Modal show={showAddStatementModal} onHide={closeModal}>
                <Form onSubmit={addStatement}>
                    <Modal.Header closeButton style={{padding: "8px 16px"}}>
                        <Modal.Title>Add a new statement</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pt-3 pb-3">
                        <div className="mb-2">
                            <Form.Group controlId="name">
                                <Form.Label className="mb-1">Name</Form.Label>
                                <Form.Control
                                    name="name"
                                    onChange={changeNewStatementValue}
                                    placeholder="Enter Name"
                                    required
                                />
                            </Form.Group>
                        </div>
                        <Form.Group controlId="amount" className="mb-2">
                            <Form.Label className="mb-1">Amount</Form.Label>
                            <InputWithAdornment
                                adornment="$"
                                name="amount"
                                onChange={changeNewStatementValue}
                                placeholder="Enter Amount"
                                required
                            />
                        </Form.Group>
                        <div className="d-flex">
                            <Form.Group controlId="date" style={{flex: 1, marginRight: 8}}>
                                <Form.Label className="mb-1">Date</Form.Label>
                                <Form.Control
                                    name="date"
                                    onChange={changeNewStatementValue}
                                    placeholder="Enter Date"
                                    required
                                    type="date"
                                    value={newStatement.date}
                                />
                            </Form.Group>
                            <Form.Group controlId="frequency" style={{flex: 1}}>
                                <Form.Label className="mb-1">Recurrence</Form.Label>
                                <Form.Select
                                    onChange={changeNewStatementValue}
                                    name="frequency"
                                    value={newStatement.frequency}
                                >
                                    <option value="none">None</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="biweekly">Biweekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="bimonthly">Bimonthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="semi-annual">Semi-annual</option>
                                    <option value="annual">Annual</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="col-12 mt-3" style={{ height: 23 }}>
                            {error && <p style={style.error}>{error}</p>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={closeModal} variant="secondary">Cancel</Button>
                        <Button type="submit" variant="primary">Add</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default Statements;