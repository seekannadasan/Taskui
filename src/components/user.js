import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { decrypt } from 'n-krypta';
import "../index.css"
const User = ({ user, onDelete, onEdit }) => {

    //form data declaration
    const secret = 'my-secret';
    const [loggedIn, setloggedIn] = useState('');

    //secure password
    const securePassword = (password) => {
        let securepass = [...decryserKey(password, secret)];
        for (let i = 0; i < securepass.length; i++) {
            securepass[i] = '*';
        }
        return securepass;
    };

    //secure password
    const getrole = (password) => {
        return decryserKey(loggedIn).split('-')[1];
    };

    //current user key
    const decryserKey = (k) => {
        return decrypt(k, secret);
    };

    //Date formating YYYY-MM-DD
    const formattedDate = (date) => new Date(date).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split('/').reverse().join('-');

    const getLoggedUser = localStorage.getItem("loginkey");

    //Logged user key

    useEffect(() => {
        if (getLoggedUser == null) {
            setloggedIn('')
        } else {
            setloggedIn(getLoggedUser);
        }
    }, [])

    //User row design 
    return (
        <div className="row">
            <div className="col-sm-2">
                <p className="taskName">
                    {user.id}
                </p>
            </div>
            <div className="col-sm-2">
                <p className="taskDate">{user.email}
                </p>
            </div>
            <div className="col-sm-2">
                <p className="taskDate">{getrole(loggedIn) == 'A' ? decryserKey(user.password) : (decryserKey(loggedIn) != (user.email + '-' + user.role) ? securePassword(user.password) : decryserKey(user.password))}
                </p>
            </div>

            <div className="col-sm-2">
                <p className="taskDate">{formattedDate(user.createdAt)}
                </p>
            </div>
            <div className="col-sm-2">
                <p className="taskDate">{formattedDate(user.updatedAt)}
                </p>
            </div>
            <div className="col-sm-1">
                <p className="taskDate">{user.isactivate}{user.role}
                </p>
            </div>
            <div className="col-sm-1">
                <div className="row">
                    <div className="col-sm-2">
                        <p><FaTimes onClick={() => onDelete(user.id)} className="delIcon" disabled={getrole(loggedIn) == 'A' ? ("") : (decryserKey(loggedIn) != (user.email + '-' + user.role) ? "disabled" : "")} /></p>

                    </div>
                    <div className="col-sm-2">
                        <p><FaPencilAlt onClick={() => onEdit(user.id, user)} className="editIcon" disabled={getrole(loggedIn) == 'A' ? ("") : (decryserKey(loggedIn) != (user.email + '-' + user.role) ? "disabled" : "")} /></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default User;

