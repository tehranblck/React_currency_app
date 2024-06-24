import React, { useState } from 'react'
import '../css/currency.css'
import { FaExchangeAlt } from "react-icons/fa";
import axios from 'axios';

function Currency() {
  let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
  let API_KEY = "fca_live_BzWb0YzjNsYhKAcjFNt62MUUxy0FPkYMplXoCL0f";

  const [amount, setAmount] = useState(0);
  const [currencyFrom, setCurrencyFrom] = useState("TRY");
  const [currencyTo, setCurrencyTo] = useState("USD");
  const [result, setResult] = useState(0);

  const getData = async () => {
    try {
      let response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${currencyFrom}`);
      setResult((response.data.data[currencyTo] * amount).toFixed(2));
    } catch (error) {
      console.log("hata: " + error);
    }
  };
  const swapCurrencies = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
    setResult(amount)
    setAmount(result)
  };

  return (
    <div className='container'>
      <div className='currency-div'>
        <h1 className='h1'>MONEY EXCHANGER APP</h1>
        <div className="form">
          <input
            className='input_1'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
          <select
            className='current-from'
            value={currencyFrom}
            onChange={(e) => setCurrencyFrom(e.target.value)}
          >
            <option value="TRY">TL</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="HKD">HKD</option>
            <option value="JPY">JPY</option>
          </select>
          <FaExchangeAlt  onClick={swapCurrencies} style={{ fontSize: '20px', color: "white",cursor:"pointer" }} />
          <select
            className='current-to'
            value={currencyTo}
            onChange={(e) => setCurrencyTo(e.target.value)}
          >
             <option value="TRY">TL</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="AUD">AUD</option>
            <option value="JPY">JPY</option>
          </select>
          <input
            value={result}
            onChange={(e) => setResult(e.target.value)}
            className='input_2'
            type="number"
          />
        </div>
        <div>
          <button onClick={getData}>Convert!</button>
        </div>
      </div>
    </div>
  );
}

export default Currency;
