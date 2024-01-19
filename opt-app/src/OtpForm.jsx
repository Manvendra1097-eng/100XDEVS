import React, { useEffect, useRef, useState } from 'react';
import './App.css';
const OtpForm = ({ size = 4 }) => {
  const [otp, setOtp] = useState(new Array(size).fill(''));

  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  function onSubmit() {
    console.log(otp);
  }

  function hadleOnChange(e, index) {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // change focus
    if (value && index < otp.length - 1 && inputRefs.current[index + 1])
      inputRefs.current[index + 1].focus();
  }

  function hadleOnKeyDown(e, index) {
    if (
      e.key === 'Backspace' &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  }

  function handleOnClick(index) {
    if (inputRefs.current[index]) {
      inputRefs.current[index].setSelectionRange(1, 1);
    }
  }

  return (
    <div>
      <h2>Enter your otp</h2>
      <form className="form" onSubmit={onSubmit}>
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(input) => (inputRefs.current[index] = input)}
            type="text"
            value={value}
            onChange={(e) => hadleOnChange(e, index)}
            onKeyDown={(e) => hadleOnKeyDown(e, index)}
            onClick={() => handleOnClick(index)}
          />
        ))}
      </form>
    </div>
  );
};

export default OtpForm;
