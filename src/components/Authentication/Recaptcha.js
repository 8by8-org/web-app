import ReCAPTCHA from 'react-google-recaptcha'
import React, {useRef, useState} from 'react'

function Recaptcha() {

  const captcha = useRef(null);


  function onChange(value) {
    if(captcha.current.getValue()){
      console.log("user not a robot")
    }
  };

  return (
    <div>

        <ReCAPTCHA
          ref={captcha}
          sitekey="6Lccag4dAAAAAOQiKSb8IfqbPjV1XYPcSlhffPfK"
          onChange={onChange}
        />
    </div>
  );
}

export default Recaptcha;
