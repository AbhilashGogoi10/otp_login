import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  console.log(inputRefs);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combineOtp = newOtp.join("");
    if (combineOtp.length === length) onOtpSubmit(combineOtp);

    // Move input to the next input field
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional validations
    if(index > 0 &&  !otp[index - 1]){
        inputRefs.current[otp.indexOf("")].focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if(e.key === "Backspace"
    && index > 0
    && !otp[index]
    && inputRefs.current[index - 1]
    )
    {
        inputRefs.current[index-1].focus();
    }
    
  };
  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            type="text"
            value={value}
            ref={(input) => (inputRefs.current[index] = input)}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otp_input"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
