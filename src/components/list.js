import Users from './users';
import { useState, useEffect } from 'react';
import "../index.css"
const List = () => {
    // form data seeting
    const [users, setusers] = useState([]);

    //Preload setting
    useEffect(() => {
        fetch('http://localhost:3000/customer', { mode: 'cors' })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                setusers(data.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

   //Delete user date refresh after imetiate action 
    const deleteUser = (users) => {
        setusers(users);
    }

    //user list desing baed on users and user component 
    return (
        <>
            {
                <Users users={users} onDelete={deleteUser} />
            }
        </>
    )
}
export default List;