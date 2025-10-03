import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Navbar = () => {
  const{setCurrency} = useContext(CoinContext);
  const[email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false); 

const currencyHandler = (event)=>{
    switch(event.target.value){
    case "usd": {
      setCurrency({name:"usd", symbol:"$"});
      break;
    }
     case "inr": {
      setCurrency({ name: "inr", symbol: "₹" });
      break;
    }
    case "eur": {
      setCurrency({ name: "eur", symbol: "€" });
      break;
    }
    case "gbp": {
      setCurrency({ name: "gbp", symbol: "£" });
      break;
    }
    case "jpy": {
      setCurrency({ name: "jpy", symbol: "¥" });
      break;
    }
    case "aud": {
      setCurrency({ name: "aud", symbol: "A$" });
      break;
    }
    case "cad": {
      setCurrency({ name: "cad", symbol: "C$" });
      break;
    }
    default: {
      setCurrency({name:"usd", symbol:"$"});
      break;
    }
  }
  };
 const signupHandler = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", userCredential.user);
      alert("Signup successful!");
      setEmail('');
      setPassword('');
      setShowSignup(false); // Close form
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  return (
   <div className='navbar'>
    <Link to={'/'}>
      <img src={logo} alt="" className='logo'/>
    </Link>
      <ul>
         <Link to={"/"}><li>Home</li></Link>
         <li>Features</li>
         <li>Pricing</li>
         <li>Blog</li>
      </ul>
      <div className='nav-right'>
        <select className='drop'onChange={currencyHandler}>
           <option value="usd">USD</option>
           <option value="inr">INR</option>
           <option value="eur">EUR</option>
           <option value="gbp">GBP</option>
           <option value="jpy">JPY</option>
           <option value="aud">AUD</option>
           <option value="cad">CAD</option>
        </select>
        {!showSignup && 
          <button onClick={() => setShowSignup(true)}>
            Sign Up <img src={arrow_icon} alt="" />
          </button>
        }

        {showSignup && (
          <div className='signup-form'>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signupHandler}>Sign Up</button>
            <button onClick={() => setShowSignup(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar;