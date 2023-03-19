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
	logIn: {
		marginTop: 16,
		textAlign: "center",
		link: {
			textDecoration: "none",
			fontWeight: "bold"
		}
	},
	nameFormGroupsContainer: {
		display: "flex",
		marginBottom: 16
	}
}

const SignUpPage = () => {
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, firstName + " " + lastName, email, password);
	}

	return (
		<div style={style.body}>
			<div style={style.form}>
				<h3 style={style.heading}>Sign up</h3>
				<Form onSubmit={handleSubmit}>
					<Form.Group style={style.formGroup}>
						<Form.Label style={style.formLabel}>Username</Form.Label>
						<Form.Control
							onChange={e => setUsername(e.target.value)} 
							placeholder="Enter username" 
							value={username} 
						/>
					</Form.Group>
					<div style={style.nameFormGroupsContainer}>
						<Form.Group style={{marginRight: 16}}>
							<Form.Label style={style.formLabel}>First name</Form.Label>
							<Form.Control
								onChange={e => setFirstName(e.target.value)} 
								placeholder="John"
								value={firstName} 
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label style={style.formLabel}>Last name</Form.Label>
							<Form.Control
								onChange={e => setLastName(e.target.value)} 
								placeholder="Doe"
								value={lastName} 
							/>
						</Form.Group>
					</div>
					<Form.Group style={style.formGroup}>
						<Form.Label style={style.formLabel}>Email</Form.Label>
						<Form.Control
							onChange={e => setEmail(e.target.value)} 
							placeholder="email@example.com"
							type="email"
							value={email} 
						/>
					</Form.Group>
					<Form.Group style={style.formGroup}>
						<Form.Label style={style.formLabel}>Password</Form.Label>
						<Form.Control 
							onChange={e => setPassword(e.target.value)} 
							placeholder="8+ characters"
							type="password"
							value={password} 
						/>
					</Form.Group>
					<Button type="submit" style={{width: "100%"}}>Create Account</Button>
				</Form>
				<div style={style.logIn}>
					<NavLink to="/login" style={style.logIn.link}>Log in</NavLink>
				</div>
			</div>
		</div>
	)
}

export default SignUpPage;