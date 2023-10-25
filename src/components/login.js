
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { decrypt, encrypt } from 'n-krypta';
import Swal from "sweetalert2";

const Login = () => {

    // form data seeting

    const secret = 'my-secret';
    const navigate = useNavigate();
    const [isSignUp, setisSignUp] = useState(false);
    const [loggedIn, setloggedIn] = useState('');

    //preload seeting

    useEffect(() => {
        // Checking if user is not loggedIn
        if (!isSignUp) {
            navigate("/");
        } else {
            navigate("/SignUp");
        }
    }, [navigate, isSignUp]);

    const getLoggedUser = localStorage.getItem("loginkey");

    //Logged user key

    useEffect(() => {
        if (getLoggedUser == null) {
            setloggedIn('')
        } else {
            setloggedIn(getLoggedUser);
        }
    }, [])

    // form data seeting

    const [txtuser, setuser] = useState('');
    const [txtpassword, setpassword] = useState('');

    // login user and seeting cache key

    const onSubmit = (e) => {
        e.preventDefault();
        if (!txtuser && !txtpassword) {
            Swal.fire({
                icon: 'error',
                title: 'Login Form',
                text: 'Fill in your email and password or close the form!'
            })
        } else if (!txtuser && txtpassword) {
            Swal.fire({
                icon: 'error',
                title: 'Login Form',
                text: 'Fill in your email!'
            })
        } else if (txtuser && !txtpassword) {
            Swal.fire({
                icon: 'error',
                title: 'Login Form',
                text: 'Fill in your password'
            })
        } else {
            fetch(`http://localhost:3000/customer/${txtuser}`, { mode: 'cors' })
                .then((response) => response.json())
                .then((data) => {
                    if (data.data) {
                        if (decrypt(data.data.password, secret) == txtpassword && data.data.isactivate == 'Y') {
                            localStorage.setItem("loginkey", encrypt(txtuser + '-' + data.data.role, secret))
                            navigate("/List");
                        }
                        else
                            Swal.fire({
                                icon: 'error',
                                title: 'Login Form',
                                text: 'Incorrect  your email or password or Register user!'
                            })
                    }
                    else
                        Swal.fire({
                            icon: 'error',
                            title: 'Login Form',
                            text: 'Incorrect  your email or password or Register user!'
                        })

                    setuser('');
                    setpassword('');

                })
                .catch((err) => {
                    console.log(err.message);
                });
        }

    }

    //login form desigm

    return (
        <>
            {

                (!loggedIn) ? (
                    <form className="add-form" onSubmit={onSubmit}>
                        <div className="container">
                            <div className="row form-control">
                                <div className="col-sm-6"> </div>
                                <div className="col-sm-6">
                                    <div className="container">
                                        <div className="row  form-control">
                                            <div className="col-sm-6 ">Email
                                            </div>
                                            <div className="col-sm-6 ">
                                                <input name="txtemail" id="txtemail" type="email" value={txtuser} onChange={(e) => setuser(e.target.value)}></input>
                                            </div>
                                        </div>
                                        <div className="row form-control">
                                            <div className="col-sm-6 ">Password
                                            </div>
                                            <div className="col-sm-6 ">
                                                <input name="txtpassword" minLength="8" maxLength="12" id="txtpassword" type="password" value={txtpassword} onChange={(e) => setpassword(e.target.value)}></input>
                                            </div>
                                        </div>
                                        <button className="btn">Login</button>
                                        {isSignUp || (
                                            <button className="btn" onClick={() => setisSignUp(true)}>Singup</button>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                ) :
                    (
                        <button className="btn">Already user Logged in</button>
                    )

            }
        </>
    )
}
export default Login