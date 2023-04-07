import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, Popover, OverlayTrigger } from 'react-bootstrap';
import { Check, Event } from "@mui/icons-material";
import { StatementService } from '../../services/StatementService';

const style = {
    amount: {
        margin: 0,
        fontSize: 24,
        textAlign: "right",
        fontWeight: "600"
    },
    buttonsWrapper: {
        textAlign: "center"
    },
    balance: {
        fontSize: 15, 
        fontWeight: "500"
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
        margin: "24px auto 48px",
        listStyleType: "none"
    },
    statementContainer: {
        width: 310,
        marginBottom: 8,
        border: "1px solid #0003"
    },
    statementContent: {
        display: "flex", 
        alignItems: "center",
        padding: "2px 8px",
        left: {
            flex: 7
        },
        right: {
            flex: 3,
            textAlign: "right"
        }
    },
    statementHeader: {
        display: "flex", 
        padding: "2px 8px",
        borderBottom : "1px solid #0003"
    }
}

const toYYYYMMDD = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
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
            <Button
                onClick={onClick}
                size="sm"
                style={style.delete}
            >
                Delete
            </Button>
        </OverlayTrigger>
    )
}

function Statements() {
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

    useEffect(() => {
        StatementService.getAllStatement().then(result => setStatements(result));
    }, []);
    
    const addStatement = (e) => {
        e.preventDefault();

        const statement = {
            ...newStatement,
            planned: newStatement.frequency !== "none",
            frequency: newStatement.frequency
        };

        StatementService.createStatement(statement)
            .then(function(res) {
                closeModal();
                setStatements([...statements, res]);
            })
            .catch(function() {
                //TODO, error message inside Modal.
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
        StatementService.deleteStatement(deleteOverlayId)
            .then((res) => {
                setStatements(statements.filter(statement => statement.id !== deleteOverlayId));
                setDeleteOverlayId(null);
            });
    }

    const formatCurrency = (amt) => {
       return `${amt < 0 ? "-" : ""}$${Math.abs(amt).toFixed(2)}`;
    }
       
    const openModal = () => {
        setError("");
        setShowAddStatementModal(true);
    }

    const sortedStatements = statements.slice().map(statement => {
        const parts = statement.date.split("-");
        const date = new Date(
            parseInt(parts[0]), 
            parseInt(parts[1]) - 1,
            parseInt(parts[2])
        );

        return {...statement, date}
    }).sort((a, b) => b.date - a.date);

    return (
        <div className="p-5" style={{display: "flex", flexDirection: "column"}}>
            <div style={style.buttonsWrapper}>
                <Button variant="primary" type="submit" onClick={openModal}>
                    Add a statement 
                </Button>
            </div>
            <div>
                <div style={style.statementList}>
                    {sortedStatements.map((statement, idx) => (
                        <div key={statement.id} style={style.statementContainer}>
                            <div style={{width: "100%", height: 24, borderBottom: "1px solid #0003", position: "relative"}}>
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
                                onDelete={deleteStatement}
                            />
                            </div>
                            <div style={style.statementContent}>
                                <div style={style.statementContent.left}>
                                    <p className="text-muted" style={{fontSize: 15, margin: 0}}>
                                        {statement.date.toLocaleDateString("en-US")}
                                    </p>
                                    <p style={{margin: 0}}>{statement.name}</p>
                                </div>
                                <div style={style.statementContent.right}>
                                    <p style={{...style.amount, color: statement.amount < 0 ? "#EA5455" : "#5D9C59"}}>
                                        {formatCurrency(statement.amount)}
                                    </p>
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
                            <Form.Group controlId="formBasicStatementName">
                                <Form.Label className="mb-1">Name</Form.Label>
                                <Form.Control
                                    name="name"
                                    onChange={changeNewStatementValue}
                                    placeholder="Enter Name"
                                    required
                                />
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-2">
                            <Form.Label className="mb-1">Amount</Form.Label>
                            <div className="border d-flex align-items-center rounded bs-shadow" style={{padding: "8px 12px"}}>
                                <span className="text-muted">$</span>
                                <Form.Control
                                    name="amount"
                                    onChange={changeNewStatementValue}
                                    placeholder="Enter Amount"
                                    style={{ border: "none", padding: 0, marginLeft: 8, boxShadow: "none" }}
                                    type="number"
                                    required
                                />
                            </div>
                        </Form.Group>
                        <div className="d-flex">
                            <Form.Group controlId="formBasicStatementDate" style={{flex: 1, marginRight: 8}}>
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
                            <Form.Group controlId="formBasicStatementFrequency" style={{flex: 1}}>
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
                        <div style={{ width: "100%", marginTop: 16, height: 23 }}>
                            {error && <p style={style.error}>{error}</p>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={closeModal} variant="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default Statements;