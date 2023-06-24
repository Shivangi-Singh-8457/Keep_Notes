import React, {useState} from "react";
import HighlightIcon from '@mui/icons-material/Highlight';
import Login from "./Login";
import Service from "./Service";
import Swal from 'sweetalert2';

function Header(props){
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    function logout()
    {
            Service.Logout().then((response) => {Swal.fire(response); props.setIsLoggedIn(false)}).catch(error => console.log(error));
    }

    return (
        <header>
            <h1><HighlightIcon/>Keep Notes</h1>
            <nav>
            <a href="/">Home</a>
            {props.isLoggedIn ?<a href="/#" onClick={logout}>Logout</a>:<a href="#" onClick={handleOpenModal}>Login</a>}
            </nav>
            <Login setIsLoggedIn={props.setIsLoggedIn} isOpen={showModal} onClose={handleCloseModal} />
        </header>
    );
}
export default Header;