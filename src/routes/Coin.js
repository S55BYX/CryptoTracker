import { useState } from "react";
import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Coin.css";
import ReactLoading from "react-loading";

function Coin() {
  const params = useParams();
  const [coin, setCoin] = useState("");
  const [loading, setLoading] = useState(true);
  const [rPosts, setRPosts] = useState("")
  const [rLoading, setRLoading] = useState(true)

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;
  const rUrl= `https://www.reddit.com/r/CryptoCurrency/search.json?q=${coin.name}&restrict_sr=1&sr_nsfw=&limit=4`

  useEffect(() => {
      axios.get(url).then(response => setCoin(response.data))
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);


  useEffect(() => {
  axios.get(rUrl).then(rep => setRPosts(rep.data.data.children))
  .finally(() => {
    setRLoading(false);
  })
    .catch((error) => console.log(error));
}, [coin]);

console.log(rPosts)

  return (
    <div>
      {loading ? (
        <ReactLoading type="spin" color="#3950fa" />
      ) : (
        <div className="coin-container">
          <div className="content">
            <h1>{coin.name}</h1>
          </div>
          <div className="content">
            <div className="rank">
              <span className="rank-btn">Rank # {coin.market_cap_rank}</span>
            </div>
            <div className="info">
              <div className="coin-heading">
                <img src={coin.image.small} alt="" />
              </div>
              <p>{coin.name}</p>
              <p>{coin.symbol}</p>
              <div className="coin-price">
                <p>${coin.market_data.current_price.usd.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="content">
            <table>
              <thead>
                <tr>
                  <th>1h</th>
                  <th>24h</th>
                  <th>7d</th>
                  <th>14d</th>
                  <th>30d</th>
                  <th>1y</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {
                      coin.market_data.price_change_percentage_1h_in_currency
                        .usd.toFixed(1)
                    }%
                  </td>
                  <td>
                    {
                      coin.market_data.price_change_percentage_24h_in_currency
                        .usd.toFixed(1)
                    }%
                  </td>
                  <td>
                    {
                      coin.market_data.price_change_percentage_7d_in_currency
                        .usd.toFixed(1)
                    }%
                  </td>
                  <td>
                    {
                      coin.market_data.price_change_percentage_14d_in_currency
                        .usd.toFixed(1)
                    }%
                  </td>
                  <td>
                    {
                      coin.market_data.price_change_percentage_30d_in_currency
                        .usd.toFixed(1)
                    }%
                  </td>
                  <td>
                    {
                      coin.market_data.price_change_percentage_1y_in_currency
                        .usd.toFixed(1)
                    }%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="content">
            <div className="stats">
              <div className="left">
                <div className="row">
                  <h4>24h Low</h4>
                  <p>{coin.market_data.low_24h.usd}</p>
                </div>
                <div className="left">
                  <div className="row">
                    <h4>24h high</h4>
                    <p>{coin.market_data.high_24h.usd}</p>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="row">
                  <h4>Market Cap</h4>
                  <p>{coin.market_data.market_cap.usd}</p>
                </div>
                <div className="row">
                  <h4>Circulating Supply</h4>
                  <p>{coin.market_data.circulating_supply.usd}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="about">
              <h3>News</h3>

              {rLoading ? (
    <ReactLoading type="spin" color="#3950fa" />
  ) : (
    <div>
      {rPosts.map(i => (
        <div onClick={() => window.open(i.data.url)} className="news">
          <img className="thumbnail" src={i.data.thumbnail == "self" ? "https://www.logo.wine/a/logo/Reddit/Reddit-Logomark-Color-Logo.wine.svg" : i.data.thumbnail }/>
        <p className="" key={i.data.display_name_prefixed}>
          {i.data.title} 
        </p>
        </div>
      ))}

    </div>
    
  )
}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Coin;
