import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom"

const style = {
	accountButton: {
		margin: "0 8px"
	},
	accountButtonsContainer: {
		display: "flex",
		justifyContent: "center",
		marginTop: 32
	},
	body: {
		display: "flex", 
		justifyContent: "center", 
		alignItems: "center",
		height: "100%", 
		padding: 32
	},
	heading: {
		fontSize: 72, 
		textAlign: "center"
	}
}

const LandingPage = () => {
	return (
		<div style={style.body}>
			<div>
				<h1 style={style.heading}>Bank App</h1>
				<div style={style.accountButtonsContainer}>
					<NavLink to="/signup" style={style.accountButton}>
						<Button variant="outline-primary">
							Sign Up
						</Button>
					</NavLink>
					<NavLink to="/login" style={style.accountButton}>
						<Button variant="outline-primary">
							Log In
						</Button>
					</NavLink>
				</div>
			</div>
		</div>
	)
}

export default LandingPage;