import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const{setCurrency} = useContext(CoinContext)
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
  }
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
        <button>Sign Up<img src={arrow_icon} alt=""/></button>
      </div>
    </div>
  )
}

export default Navbar