import React, { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
 
    // phone validation
    const regex = /[^0-9]/g
    if(phoneNumber.length<10 || regex.test(phoneNumber)){
        alert("Invalid Phone Number")
        return;
    }else{

        setShowOtpInput(true)
    }
  };

  const onOtpSubmit=(otp)=>{
    console.log('Login Successful', otp)
  }
  return (
    <div>
      {!showOtpInput ? (<form onSubmit={handleSubmit}>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter Phone Number"
        />

        <button type="submit">Submit</button>
      </form> ): (<div>
        <p>Enter OTP send to {phoneNumber}</p>
        <OtpInput length={4} onOtpSubmit = {onOtpSubmit}/>
      </div>)}
    </div>
  );
};

export default PhoneOtpForm;
