import React, {useState} from "react";
import "./Login.css";
import Service from "./Service";
import Modal from "react-modal";

function ForgotPswd(props){

    const [otpFlag, setOtpFlag]=useState(false)
    const [pswdFlag,setPswdFlag]=useState(false)
    const [userDetails, setUserDetails]=useState({
        email: "",
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
            alert("You are not our user, please register yourself.");
            props.onClose();
        }
                
    }

    function submitDetails(event){
        
        Service.CheckEmail(userDetails.email).then((response) => func1(response)).catch(error => console.log(error));
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
            setPswdFlag(true);
            setOtpFlag(false);
        }    
    }
    function submitOtp(event){

        Service.CheckOtp(userDetails.otp).then((response) => func2(response)).catch(error => console.log(error));
        event.preventDefault();
    }
    function func3(response)
    {
        alert(response);
        setPswdFlag(false);
        setUserDetails({
            email: "",
            password: "",
            otp: ""
        })
        props.onClose();
        // navigate('/', {replace: true});
    }
    function submitpswd(event){

        Service.ChangePswd(userDetails).then((response) => func3(response)).catch(error => console.log(error));
        event.preventDefault();
    }
    function Resend(event){
        Service.Resend().then((response)=>{}).catch(error => console.log(error));
        event.preventDefault();
    }

    
    if(!otpFlag && !pswdFlag)
    return (
        <Modal className="modal" isOpen={props.isOpen} onRequestClose={props.onClose} contentLabel="ForgotPswd Modal">
        <button className="close-button" onClick={props.onClose}>
          <span>&times;</span>
        </button>
        <div className="container">
            <form>
                <h2>Reset Password</h2>
                <div className="content">
                <label htmlFor="email">Email Id:</label> &nbsp;
                <input type="email" name="email" id="email" onChange={handleChange} value={userDetails.email}/> 
                </div>
                <br/>
                <div className="button">
                <button onClick={submitDetails} disabled={!userDetails.email}>Submit</button>
                </div>
            </form>
            <br/>
        </div>
        </Modal>
    );
    else if(otpFlag)
    return(
        <Modal className="modal" isOpen={props.isOpen} onRequestClose={props.onClose} contentLabel="ForgotPswd Modal">
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
                <button onClick={submitOtp}>Verify</button>
                </div>
                <br/>
                <div class="button">
                <button onClick={Resend}>Resend OTP</button>
                </div>
            </form>
        </div>
        </Modal>
    );
    else if(pswdFlag)
    return (
        <Modal className="modal" isOpen={props.isOpen} onRequestClose={props.onClose} contentLabel="ForgotPswd Modal">
        <button className="close-button" onClick={props.onClose}>
          <span>&times;</span>
        </button>
        <div className="container">
            <form>
                <div className="content">
                <label htmlFor="password">Enter New Password:</label> &nbsp;
                <input type="password" name="password" id="password" onChange={handleChange} value={userDetails.password}/>
                </div>
                <br/>
                <div className="button">
                <button onClick={submitpswd}>Submit</button>
                </div>
            </form>
        </div>
        </Modal>
    );
}
export default ForgotPswd;