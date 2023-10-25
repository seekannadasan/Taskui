import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Header = () => {

	// setting form data
	const navigate = useNavigate();
	const [loggedIn, setloggedIn] = useState('');

	// logout user from screen and redirect to login 
	const logOut = () => {
		localStorage.removeItem("loginkey");
		setloggedIn('')
		navigate("/");
	}

	//loggied user key 
	const getLoggedUser = localStorage.getItem("loginkey");

	//preload seeting 
	useEffect(() => {
		if (getLoggedUser == null) {
			setloggedIn('')
		} else {
			setloggedIn(getLoggedUser);
		}
	}, [])

	//header form design 
	
	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-6">
					<div class="page-header">
						<h1>BeerApp</h1>
					</div>
				</div>
				<div className="col-sm-6 text-end">
					{(loggedIn) ? (<a href='#' onClick={logOut}>Logout</a>) : ""}
				</div>
			</div>
		</div>
	)
}
export default Header