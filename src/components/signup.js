import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { encrypt } from 'n-krypta';
import emailjs, { init } from "@emailjs/browser";
import Swal from "sweetalert2";
const SignUp = () => {

   // All States
    init("xxx");
    const secret = 'my-secret';
    const form = useRef();
    const [txtuser, setUser] = useState('');
    const [txtpassword, setPassword] = useState('');
    const [txtConfrimPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [isLoggedIn, setisLoggedIn] = useState(false);
    
    // preload
    useEffect(() => {
        // Checking if user is not loggedIn
        if (!isLoggedIn) {
            navigate("/SignUp");
        } else {
            navigate("/");
        }
    }, [navigate, isLoggedIn]);

    // Add user
    const addUser = async (email, password) => {
        await fetch('http://localhost:3000/customer', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: encrypt(password, secret),
                createdAt: new Date(),
                updatedAt: new Date(),
                isactivate: 'N',
                role: 'U',
                id: Math.random().toString(36).slice(2),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((response) => {
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Signup Form',
                    text: 'You have successfully registered!'
                });

            } else {
                return;
            }
        });;
        setUser('');
        setPassword('');
        setConfirmPassword('');
    };
    // register user
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!txtuser && !txtpassword) {
            Swal.fire({
                icon: 'error',
                title: 'Signup Form',
                text: 'Fill in your email and password!'
            })
        } else if (!txtuser && txtpassword) {
            Swal.fire({
                icon: 'error',
                title: 'Signup Form',
                text: 'Fill in your email!'
            })
        } else if (txtuser && !txtpassword) {
            Swal.fire({
                icon: 'error',
                title: 'Signup Form',
                text: 'Fill in your password'
            })
        } else if (txtpassword != txtConfrimPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Signup Form',
                text: 'Fill in your password and confirm password should be same'
            })
        }
        else {
            addUser(txtuser, txtpassword);
            emailjs.sendForm("xx", "xx", form.current, "xx").then(
                (result) => {
                    console.log(result.text);
                    Swal.fire({
                        icon: 'success',
                        title: 'Eamil Activation',
                        text: 'Activation message has sent successfully'
                    });
                },
                (error) => {
                    Swal.fire({
                        icon: 'worng',
                        title: 'Eamil Activation',
                        text: 'Something went worng!!'
                    });

                }
            );
        }
        setUser('');
        setPassword('');
        setConfirmPassword('');
    };

    //register form design

    return (
        <form className="add-form" onSubmit={handleSubmit} ref={form}>
            <div className="container">
                <div className="row form-control">
                    <div className="col-sm-6"> </div>
                    <div className="col-sm-6">
                        <div className="container">
                            <div className="row form-control">
                                <div className="col-sm-6">Email
                                </div>
                                <div className="col-sm-6">
                                    <input name="email" id="email" type="email" value={txtuser} onChange={(e) => setUser(e.target.value)}></input>
                                    <input name="activatekey" id="activatekey" type="hidden" value={encrypt(txtuser, secret)}></input>
                                    <input name="url" id="url" type="hidden" value={window.location.origin + '/Activation?key=' + encrypt(txtuser, secret)}></input>

                                </div>
                            </div>
                            <div className="row form-control">
                                <div className="col-sm-6">Password
                                </div>
                                <div className="col-sm-6">
                                    <input name="password" minLength="8" maxLength="12" id="password" type="password" value={txtpassword} onChange={(e) => setPassword(e.target.value)}></input>
                                </div>
                            </div>
                            <div className="row form-control">
                                <div className="col-sm-6">Confirm Password
                                </div>
                                <div className="col-sm-6">
                                    <input name="rpassword" minLength="8" maxLength="12" id="rpassword" type="password" value={txtConfrimPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col-sm-12">
                                    <button className="btn" >Register</button><button className="btn" onClick={() => setisLoggedIn(true)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )

}
export default SignUp