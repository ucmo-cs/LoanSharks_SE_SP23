import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom"

const style = {
	body: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "100%"
	},
	form: {
		width: 450,
		border: "1px solid #ddd",
		padding: 16,
		borderRadius: 5
	},
	formLabel: {
		marginBottom: 4
	},
	formGroup: {
		marginBottom: 16
	},
	heading: {
		marginBottom: 32
	},
	signUp: {
		marginTop: 16,
		textAlign: "center",
		link: {
			textDecoration: "none",
			fontWeight: "bold"
		}
	}
}

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
	}

	return (
		<div style={style.body}>
			<div style={style.form}>
				<h3 style={style.heading}>Log into your account</h3>
				<Form onSubmit={handleSubmit}>
					<Form.Group style={style.formGroup}>
						<Form.Label style={style.formLabel}>Username or email</Form.Label>
						<Form.Control
							onChange={e => setUsername(e.target.value)}
							placeholder="Enter username or email"
							value={username}
						/>
					</Form.Group>
					<Form.Group style={style.formGroup}>
						<Form.Label style={style.formLabel}>Password</Form.Label>
						<Form.Control 
							onChange={e => setPassword(e.target.value)}
							type="password" 
							placeholder="8+ characters"
							value={password}
						/>
					</Form.Group>
					<Button type="submit" style={{width: "100%"}}>Log In</Button>
				</Form>
				<div style={style.signUp}>
					<NavLink to="/signup" style={style.signUp.link}>Create An Account</NavLink>
				</div>
			</div>
		</div>
	)
}

export default LoginPage;