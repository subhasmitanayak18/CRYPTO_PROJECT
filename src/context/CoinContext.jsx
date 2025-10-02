import { createContext, useEffect, useState } from "react"

export const CoinContext = createContext();

const CoinContextProvider =(props)=>{
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name:"usd",
        symbol: "$"
    })
    const fetchAllCoin = async ()=>{
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=50&page=1&sparkline=false`
      );
      const data = await response.json();
      setAllCoin(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };
    useEffect(()=>{
        fetchAllCoin();
    },[])
    const contextValue ={
        allCoin,currency,setCurrency

    }
    return(
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}
export default CoinContextProvider