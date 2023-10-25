import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { decrypt, encrypt } from 'n-krypta';
const Activation = () => {
	//form date setting 
	const secret = 'my-secret';
	const navigate = useNavigate();
	//read activate key 
	const key = decrypt(window.location.hash, secret);
	//preload setting
	useEffect(() => {
		fetch(`http://localhost:3000/customer/${key}`, { mode: 'cors' })
			.then((response) => response.json())
			.then((data) => {
				updateUser(data.data.id, data.data)
			})
			.catch((err) => {
				console.log(err.message);
			});
	});

	//activate user and laogin into the suystem
	const updateUser = async (id, user) => {
		await fetch(`http://localhost:3000/customer/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				email: user.email,
				password: user.password,
				createdAt: user.createdAt,
				updatedAt: new Date(),
				isactivate: 'Y',
				role: user.role,
				id: user.id,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}).then((response) => {
			if (response.status === 200) {
				localStorage.setItem("loginkey", encrypt(user.email + '' + user.role, secret))
				navigate("/List");
			}
		});
	}

	//email activation welcome page 

	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-12">
					Welcome to my project
				</div>
			</div>
		</div>

	)
}
export default Activation