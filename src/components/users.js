import User from './user';
import { useState, useEffect } from 'react';
import "../index.css"
import Swal from "sweetalert2";
const Users = ({ users, onDelete }) => {
    const [usersList, setUsersList] = useState([]);

    //Preload setting
    useEffect(() => {
        if (users)
            setUsersList(users);
        else
            return users;
    });

    //Delete user 
    const deleteUser = async (id) => {
        await fetch(`http://localhost:3000/customer/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.status === 200) {
                setUsersList(users.filter((user) => user.id !== id));
                Swal.fire({
                    icon: 'success',
                    title: 'Delete Form',
                    text: 'You have successfully deleted a user!'
                });
            }
            onDelete(users.filter((user) => user.id !== id));

        });
    }

    //update user preview popup date
    const updateUser = async (id, user) => {
        await fetch(`http://localhost:3000/customer/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                email: user.email,
                password: user.password,
                createdAt: user.createdAt,
                updatedAt: new Date(),
                isactivate: user.isactivate,
                role: user.role,
                id: user.id,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((response) => {
            if (response.status === 200) {
                setUsersList(
                    users.filter((cuser) => {
                        if (cuser.id == id)
                            cuser = user;
                    })
                );
                Swal.fire({
                    icon: 'success',
                    title: 'Update Form',
                    text: 'You have successfully updated a user!'
                });

            }

        });;
    };

    //Edit user preview popup
    const editUser = async (id, user) => {
        let isactivate = (user.isactivate == "Y" ? "checked" : "");
        let isrole = (user.role == "A" ? "checked" : "");
        Swal.fire({
            title: 'Edit User',
            html: `Email: <input type="text" id="email" class="swal2-input" placeholder="email" value=${user.email}>
				   Passwor: <input type="password" id="password" class="swal2-input" placeholder="Password" value=${user.password}><br/>
				   Activation: <input type="checkbox" id="isactivate" class="swal2-checkbox" placeholder="Password" ${isactivate}>
				   Role: <input type="checkbox" id="role" class="swal2-checkbox" placeholder="Password" ${isrole}>
				   <input type="hidden"   id="id" class="swal2-input" placeholder="Password" value=${user.id}>`,
            confirmButtonText: 'Edit User',
            focusConfirm: false,
            preConfirm: () => {
                const txtuser = Swal.getPopup().querySelector('#email').value
                const txtpassword = Swal.getPopup().querySelector('#password').value
                const txtactivate = Swal.getPopup().querySelector('#isactivate').value == 'true' ? 'N' : 'Y';
                const txtrole = Swal.getPopup().querySelector('#role').value == 'true' ? 'A' : 'U';
                if (!txtuser && !txtpassword) {
                    Swal.showValidationMessage(`Fill in your email and password!`)
                } else if (!txtuser && txtpassword) {
                    Swal.showValidationMessage(`Fiill in your email!`)
                } else if (txtuser && !txtpassword) {
                    Swal.showValidationMessage(`Fiill in your password!`)
                }
                else {
                    return { email: txtuser, password: txtpassword, isactivate: txtactivate, role: txtrole }
                }
            }
        }).then((result) => {
            if (result.value) {
                user.email = result.value.email;
                user.password = result.value.password;
                user.isactivate = result.value.isactivate;
                user.role = result.value.role;
                updateUser(id, user);
            }
        })

    }

    //Users rows design 

    return (
        <>
            <div>
                <div className="task">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-2">
                                <p className="taskName">
                                    <span className="textBold">Id</span>
                                </p>
                            </div>
                            <div className="col-sm-2">
                                <p className="taskName">
                                    <span className="textBold">Email</span>
                                </p>
                            </div>
                            <div className="col-sm-2">
                                <p className="taskDate"><span className="textBold">Password</span>
                                </p>
                            </div>

                            <div className="col-sm-2">
                                <p className="taskDate"><span className="textBold">Created</span>
                                </p>
                            </div>
                            <div className="col-sm-2">
                                <p className="taskDate"><span className="textBold">Updated</span>
                                </p>
                            </div>
                            <div className="col-sm-1">
                                <p className="taskDate"><span className="textBold">Activate role</span>
                                </p>
                            </div>
                            <div className="col-sm-1">
                                <div className="row">
                                    <div className="col-sm-6">

                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            usersList.length > 0 ? (
                                usersList.map((user) => (
                                    <User key={user.id} user={user} onDelete={deleteUser} onEdit={editUser} />
                                ))) : ('No Task Found!')
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Users;