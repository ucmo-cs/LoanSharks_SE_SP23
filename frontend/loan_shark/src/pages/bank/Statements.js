import React from 'react';
import { Event } from "@mui/icons-material";

const style = {
    amount: {
        margin: 0,
        fontSize: 28,
        textAlign: "right"
    },
    balance: {
        fontSize: 15, 
        fontWeight: "500"
    },
    date: {
        flex: 1, 
        fontSize: 15
    },
    list: {
        width: 600, 
        margin: "24px auto 48px",
        listStyleType: "none"
    },
    listItemContainer: {
        width: "100%",
        marginBottom: 8,
        border: "1px solid #0003"
    },
    listItemContent: {
        display: "flex", 
        alignItems: "center",
        padding: "2px 8px",
        left: {
            flex: 7
        },
        right: {
            flex: 3
        }
    },
    listItemHeader: {
        display: "flex", 
        padding: "2px 8px",
        borderBottom : "1px solid #0003"
    },
    planned: {
        display: "flex",
        alignItems: "center",
        icon: {
            fontSize: 16,
            marginRight: 4
        },
        frequency: {
            margin: 0,
            fontSize: 14,
            fontWeight: "bold"
        }
    }
}

function Statements() {
    const formatCurrency = (amt) => {
       return `${amt < 0 ? "-" : ""}$${Math.abs(amt).toFixed(2)}`;
    }
    
    const getData = () => {
        const statements = [
            { name: "Income", amount: 300, date: new Date(2023, 2, 3), planned: true, frequency: "weekly" },
            { name: "Expense", amount: -15, date: new Date(2023, 2, 6), planned: false },
            { name: "Expense", amount: -63, date: new Date(2023, 2, 7), planned: false },
            { name: "Income", amount: 300, date: new Date(2023, 2, 10), planned: true, frequency: "weekly" },
            { name: "Bill", amount: -700, date: new Date(2023, 2, 14), planned: true, frequency: "monthly" },
            { name: "Income", amount: 300, date: new Date(2023, 2, 17), planned: true, frequency: "weekly" },
            { name: "Deposit", amount: 20, date: new Date(2023, 2, 18), planned: false },
            { name: "Deposit", amount: 7, date: new Date(2023, 2, 20), planned: false },
            { name: "Withdrawal", amount: -100, date: new Date(2023, 2, 22), planned: false },
            { name: "Income", amount: 300, date: new Date(2023, 2, 24), planned: true, frequency: "weekly" },
        ];

        const data = [];
        let balance = 500; // Placeholder starting balance

        for (let i = 0; i < statements.length; i++) {
            balance += statements[i].amount;
            data.push({...statements[i], balance});
        }

        data.sort((a, b) => a.date < b.date);

        return data;
    }

    const data = getData();

    return (
        <div>
            <ul style={style.list}>
                {data.map((statement, idx) => (
                    <li key={idx} style={style.listItemContainer}>
                        <div style={style.listItemHeader}>
                            <span style={style.date}>
                                {statement.date.toLocaleDateString("en-US")}
                            </span>
                            <span style={style.balance}>
                                Balance: {formatCurrency(statement.balance)}
                            </span>
                        </div>
                        <div style={style.listItemContent}>
                            <div style={style.listItemContent.left}>
                                <p style={{margin: 0}}>{statement.name}</p>
                                {statement.planned ? (
                                    <div style={style.planned}>
                                        <Event style={style.planned.icon} />
                                        <p style={style.planned.frequency}>
                                            Planned: {statement.frequency}
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                            <div style={style.listItemContent.right}>
                                <p style={{...style.amount, color: statement.amount < 0 ? "#f00" : "#0b0"}}>
                                    {formatCurrency(statement.amount)}
                                </p>
                            </div>
                        </div>
                    </li>     
                ))}
            </ul>
        </div>
    );
}

export default Statements;