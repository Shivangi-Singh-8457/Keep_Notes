import React, {useState} from "react";
import "./Login.css";
import Register from "./Register";
import Service from "./Service";
import Modal from "react-modal";
import ForgotPswd from "./ForgotPswd";


function Login(props){

    const [userDetails, setUserDetails]=useState({
        email: "",
        password: ""
    });

    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModal1 = () => {
        setShowModal1(true);
    };

    const handleCloseModal1 = () => {
        setShowModal1(false);
    };

    function handleChange(event){
        const {value, name}=event.target;
        setUserDetails(prevValue=>({...prevValue, [name]: value}));
    } 

    function func(response)
    {
        alert(response[0]);
        if(response[1]==="true")
        {
            props.setIsLoggedIn(true);
            props.onClose();
        }    
    }

    function submitDetails(event){
        
        event.preventDefault();
        Service.Login(userDetails).then((response) => func(response)).catch(error => console.log(error));
        setUserDetails({
            email: "",
            password: ""
        })
    }

     
    return (
        <Modal className="modal" isOpen={props.isOpen} onRequestClose={props.onClose} contentLabel="Login Modal">
           
        <button className="close-button" onClick={props.onClose}>
          <span>&times;</span>
        </button>
        <div className="container">
            <form>
                <h2>Sign In</h2>
                <div className="content">
                    <label htmlFor="email">Email Id:</label> &nbsp;
                    <input type="email" name="email" id="email" onChange={handleChange} value={userDetails.email}/>
                </div>
                <div className="content">
                    <label htmlFor="password">Password:</label> &nbsp;
                    <input type="password" name="password" id="password" onChange={handleChange} value={userDetails.password}/> 
                </div>
                <br/>
                <div className="button">
                    <button onClick={submitDetails} disabled={!userDetails.email || !userDetails.password}>Submit</button>
                    <br/><br/>
                    <a href='#' onClick={handleOpenModal1}>Forgot Password?</a>
                </div>
                <br/>
                <div className="button1">
                    <button onClick={handleOpenModal}>Create New Account</button>
                </div>
            </form>
        </div>
        
        <Register isOpen={showModal} onClose={handleCloseModal} />
        <ForgotPswd isOpen={showModal1} onClose={handleCloseModal1} />
        </Modal>
    );
}
export default Login;