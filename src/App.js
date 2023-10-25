// Importing Components
import Header from './components/header'
import Login from './components/login'
import Footer from './components/footer'
import SignUp from './components/signup'
import List from './components/list'
import Activation from './components/activation'
// Importing React Hooks
import { useState, useEffect } from 'react';
// Importing Packages
import { Route, Routes } from "react-router-dom";
import Swal from "sweetalert2";

function App() {
    // All States
    const [loading, setloading] = useState(true); // Pre-loader before page renders

    // Pre-loader
    useEffect(() => {
        setTimeout(() => {
            setloading(false);
        }, 1000);
    }, [])

    const getLoggedUser = localStorage.getItem("loginkey");


    return (
        <>
            {
                loading ?
                    <div className="spinnerContainer">
                        <div className="spinner-grow text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> :
                    <div className="container">
                        <Header />
                        <Routes>
                            <Route path='/' element={<Login />} />
                            <Route path='/SignUp' element={<SignUp />} />
                            <Route path='/List' element={<List />} />
                            <Route path='/Activation' element={<Activation />} />
                        </Routes>
                        <Footer />
                    </div>
            }
        </>
    )
}
export default App;