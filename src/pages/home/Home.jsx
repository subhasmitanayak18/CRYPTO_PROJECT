import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import {Link} from 'react-router-dom'

const Home = () => {
const {allCoin, currency}= useContext(CoinContext);
const [displayCoin, setDisplayCoin] = useState([]);
const [input, setInput] = useState('');
const InputHandler = (event)=>{ const value = event.target.value;
  setInput(value);
  if(value ===""){
    setDisplayCoin(allCoin);
  } else {
    const filtered = allCoin.filter( item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setDisplayCoin(filtered);
  }
};
const searchHandler = async (event)=> {
   event.preventDefault();
   const coins = await allCoin.filter((item)=>{
    return item.name.toLowerCase().includes(input.toLowerCase())
  })
  setDisplayCoin(coins);
 }
useEffect(()=>{
  setDisplayCoin(allCoin);
},[allCoin])
const [activeTab, setActiveTab] = useState("marketcap");
const getFilteredCoins = () => {
  if (!displayCoin || displayCoin.length === 0) return [];

  switch (activeTab) {
    case "gainers":
      return [...displayCoin]
        .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
        .slice(0, 10);
    case "losers":
      return [...displayCoin]
        .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
        .slice(0, 10);
    case "marketcap":
    default:
      return [...displayCoin]
        .sort((a, b) => b.market_cap - a.market_cap)
        .slice(0, 10);
  }
};

  return (
    <div className='home'>
      <div className='a'>
        <h1> Largest<br/> Crypto Marketplace </h1>
        <p> Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
        <form onSubmit={searchHandler}>
          <input onChange={InputHandler} list='coinlist' value={input} type='text' placeholder="search crypto..." required/>
          <datalist id='coinlist'>{allCoin.map((item, index)=>(<option key={index} value={item.name}/>))}</datalist>
          <button type='submit'>Search</button>
        </form>
      </div>
      <div className="tabs">
  <button
    className={activeTab === "marketcap" ? "active" : ""}
    onClick={() => setActiveTab("marketcap")}
  >
    Top 10 by Market Cap
  </button>
  <button
    className={activeTab === "gainers" ? "active" : ""}
    onClick={() => setActiveTab("gainers")}
  >
    Top 10 Gainers
  </button>
  <button
    className={activeTab === "losers" ? "active" : ""}
    onClick={() => setActiveTab("losers")}
  >
    Top 10 Losers
  </button>
</div>

      <div className='cryp-tab'>
        <div className='tab-lay'>
          <p>#</p>
          <p>COINS</p>       
          <p>PRICE </p>
          <p style={{textAlign:"center"}}>24HOUR CHANGE</p>
          <p className='mar-cap'>MARKET CAP</p>
        </div>
        {
          getFilteredCoins().map((item, index) => (
            <Link to={`/coin/${item.id

              
            }`}className="tab-lay" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt={item.name} />
                <p>{item.name} - {item.symbol.toUpperCase()}</p>
              </div>
              <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
              <p className={`tab-lay ${item.price_change_percentage_24h>0?"green":"red"}`} key={index}>
                {Math.floor(item.price_change_percentage_24h*100)/100}
                </p>
              <p className='mar-cap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home;