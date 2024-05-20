function OTPGenerator() {
    
    const randomInteger = Math.floor(Math.random() * 1000000);
  
    return randomInteger;
}

module.exports = OTPGenerator