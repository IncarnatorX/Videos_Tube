function generateOTP() {
  let otp = "";

  for (let i = 0; i < 6; i++) {
    otp += String(Math.floor(Math.random() * 6));
  }

  return otp;
}

export default generateOTP;
