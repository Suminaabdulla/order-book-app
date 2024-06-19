
import { useState, useEffect, useRef } from 'react';
import { formatData } from '../utils/helper';
import CryptoJS from 'crypto-js';

const useWebSocket = () => {
  const [currencies, setCurrencies] = useState([]);
  const [pair, setPair] = useState('');
  const [price, setPrice] = useState('0.00');
  const [pastData, setPastData] = useState({});
  const [bestBid, setBestBid] = useState(null);
  const [bestAsk, setBestAsk] = useState(null);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const ws = useRef(null);

  const url = 'https://api.pro.coinbase.com';
  const apiKey = process.env.REACT_APP_COINBASE_API_KEY;
  const apiSecret = process.env.REACT_APP_COINBASE_API_SECRET;
  const passphrase = process.env.REACT_APP_COINBASE_PASSPHRASE;

  const getAuthMessage = () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const message = timestamp + 'GET' + '/users/self/verify';
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, apiSecret);
    hmac.update(message);
    const signature = hmac.finalize().toString(CryptoJS.enc.Base64);

    return {
      type: 'subscribe',
      product_ids: [pair],
      channels: ['ticker', 'level2'],
      signature: signature,
      key: apiKey,
      passphrase: passphrase,
      timestamp: timestamp
    };
  };
  useEffect(() => {
    ws.current = new WebSocket('wss://ws-feed.pro.coinbase.com');

    let pairs = [];

    const apiCall = async () => {
      await fetch(url + '/products')
        .then((res) => res.json())
        .then((data) => (pairs = data));

      let filtered = pairs.filter((pair) => pair.quote_currency === 'USD');

      filtered = filtered.sort((a, b) => a.base_currency.localeCompare(b.base_currency));

      setCurrencies(filtered);
    };

    apiCall();
  }, []);

  useEffect(() => {
    if (!pair || !ws.current) return;

    // Unsubscribe from previous pair
    // let unsubscribeMsg = {
    //   type: 'unsubscribe',
    //   product_ids: [pair],
    //   channels: ['ticker']
    // };
    // ws.current.send(JSON.stringify(unsubscribeMsg));

    // Subscribe to new pair
    let subscribeMsg = {
      type: 'subscribe',
      product_ids: [pair],
      channels: ['ticker']
    };
    ws.current.send(JSON.stringify(subscribeMsg));
    // const subscribeMsg = getAuthMessage();
    // ws.current.send(JSON.stringify(subscribeMsg));

    let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
    const fetchHistoricalData = async () => {
      let dataArr = [];
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => (dataArr = data));
      let formattedData = formatData(dataArr);
      setPastData(formattedData);
    };

    fetchHistoricalData();

    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.type === 'ticker') {
        if (data.product_id === pair) {
          setPrice(data.price);
        setBestBid({ price: data.best_bid, size: data.best_bid_size , name : data?.product_id});
        setBestAsk({ price: data.best_ask, size: data.best_ask_size , name : data?.product_id});
        }
      } else if (data.type === 'l2update' && data.product_id === pair) {
        handleL2Update(data);
      }
    };

    // return () => {
    //   ws.current.send(JSON.stringify(unsubscribeMsg));
    // };
  }, [pair]);

  const handleL2Update = (data) => {

    let updatedBids = [...orderBook.bids];
    let updatedAsks = [...orderBook.asks];

    data.changes.forEach(change => {
      let [side, price, size] = change;
      price = parseFloat(price);
      size = parseFloat(size);

      if (side === 'buy') {
        if (size === 0) {
          updatedBids = updatedBids.filter(bid => bid.price !== price);
        } else {
          const existingBidIndex = updatedBids.findIndex(bid => bid.price === price);
          if (existingBidIndex >= 0) {
            updatedBids[existingBidIndex].size = size;
          } else {
            updatedBids.push({ price, size });
          }
        }
      } else if (side === 'sell') {
        if (size === 0) {
          updatedAsks = updatedAsks.filter(ask => ask.price !== price);
        } else {
          const existingAskIndex = updatedAsks.findIndex(ask => ask.price === price);
          if (existingAskIndex >= 0) {
            updatedAsks[existingAskIndex].size = size;
          } else {
            updatedAsks.push({ price, size });
          }
        }
      }
    });

    updatedBids.sort((a, b) => b.price - a.price);
    updatedAsks.sort((a, b) => a.price - b.price);
    setOrderBook({ bids: updatedBids, asks: updatedAsks });
  };

  const handleSelect = (value) => {
    setPair(value);
  };
  const dummyOrderBookData = {
    bids: [
      { price: 22.51, size: 100 },
      { price: 22.49, size: 150 },
      { price: 22.47, size: 250 },
      { price: 22.45, size: 100 },
      { price: 22.43, size: 250 },
      { price: 22.41, size: 300 },
      // Add more bid entries as needed
    ],
    asks: [
      { price: 22.52, size: 120 },
      { price: 22.54, size: 250 },
      { price: 22.56, size: 200 },
      { price: 22.58, size: 100 },
      { price: 22.6, size: 180 },
      { price: 22.62, size: 300 },
      // Add more ask entries as needed
    ],
  };
  
  return { currencies, pair, price, pastData, handleSelect, bestBid, bestAsk, orderBook : dummyOrderBookData };
};

export default useWebSocket;
