import React from "react";
import CoinItem from "./CoinItem";
import "./Coins.css";
import Coin from '../routes/Coin'
import { Link } from "react-router-dom";

function coins(props) {
  return (
    // Heading ROW
    <div className="container">
      <div>
        <div className="heading">
          <p>#</p>
          <p className="coin-name">Coin</p>
          <p>price</p>
          <p>24h</p>
          <p className="hide-mobile">Volume</p>
          <p className="hide-mobile">Mkt Cap</p>
        </div>
        {/* The list of coins */}
        {props.coins.map((coins, idx) => (
          <Link to={`coin/${coins.id}`} element={<Coin />} key={idx}>
            <CoinItem coins={coins}  />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default coins;
