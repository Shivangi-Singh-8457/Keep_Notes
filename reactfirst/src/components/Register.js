import React, {useState} from "react";
import "./Login.css";
import Service from "./Service";
import Modal from "react-modal";

function Register(props){

    const [otpFlag, setOtpFlag]=useState(false)
    const [userDetails, setUserDetails]=useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        otp: ""
    });

    function handleChange(event){
        const {value, name}=event.target;
        setUserDetails(prevValue=>({...prevValue, [name]: value}));
    } 

    function func1(response){
        
        if(response==="true")
            setOtpFlag(true);
        else
        {
            alert("You are an existing user, please login.");
            props.onClose();
        }
                
    }

    function submitDetails(event){
        
        Service.Register(userDetails.email).then((response) => func1(response)).catch(error => console.log(error));
        event.preventDefault();
        
    }
    function func2(response)
    {
        if(response==="false")
        {
            alert("Wrong OTP");
            setUserDetails(prevValue=>({...prevValue, "otp": ""}));
        }
        else
        {
            alert("You are successfully registered.")
            setUserDetails({
                name: "",
                email: "",
                phone: "",
                password: "",
                otp: ""
            })
            setOtpFlag(false);
            props.onClose();
        }    
    }
    function submitOtp(event){

        Service.RegisterOtp(userDetails).then((response) => func2(response)).catch(error => console.log(error));
        
        event.preventDefault();
    }

    function Resend(event){
        Service.Resend().then((response)=>{}).catch(error => console.log(error));
        event.preventDefault();
    }

    
    if(!otpFlag)
    return (
        <Modal className="modal" isOpen={props.isOpen}onRequestClose={props.onClose} contentLabel="Registration Modal">
        <button className="close-button" onClick={props.onClose}>
          <span>&times;</span>
        </button>
        
        <div className="container">
            <form>
                <h2>Sign Up</h2>
                <div className="content">
                <label htmlFor="name">Name:</label> &nbsp;
                <input type="text" id="name" name="name" onChange={handleChange} value={userDetails.name}/> 
                </div>
                <div className="content">
                <label htmlFor="email">Email Id:</label> &nbsp;
                <input type="email" name="email" id="email" onChange={handleChange} value={userDetails.email}/> 
                </div>
                <div className="content">
                <label htmlFor="phone">Phone No.:</label> &nbsp;
                <input type="text" name="phone" id="phone" onChange={handleChange} value={userDetails.phone}/> 
                </div>
                <div className="content">
                <label htmlFor="password">Password:</label> &nbsp;
                <input type="password" name="password" id="password" onChange={handleChange} value={userDetails.password}/> 
                </div>
                <br/>
                <div className="button">
                <button onClick={submitDetails} disabled={!userDetails.name || !userDetails.phone || !userDetails.email || !userDetails.password}>Submit</button>
                <br/><br/>
                <a href="#" onClick={props.onClose}>Already Registered?</a>
                </div>
            </form>
        </div>
        </Modal>
    );
    else
    return(
        <Modal className="modal" isOpen={props.isOpen} onRequestClose={props.onClose} contentLabel="Registration Modal">
        <button className="close-button" onClick={props.onClose}>
          <span>&times;</span>
        </button>
        <div className="container">
            <form>
                <div className="content">
                <label htmlFor="otp">Enter OTP sent through email:</label> &nbsp;
                <input type="text" name="otp" id="otp" onChange={handleChange} value={userDetails.otp}/>
                </div> 
                <br/>
                <div className="button">
                <button  onClick={submitOtp}>Verify</button>
                </div>
                <br/>
                <div className="button">
                <button onClick={Resend}>Resend OTP</button>
                </div>
            </form>
        </div>
        </Modal>
    );
}
export default Register;