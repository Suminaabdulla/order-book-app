import { useState, useEffect, useRef, useCallback } from 'react';

const useWebSocket = () => {
  const [currencies, setCurrencies] = useState([]);
  const [pair, setPair] = useState('');
  const [pastData, setPastData] = useState([]);
  const [bestBid, setBestBid] = useState(null);
  const [bestAsk, setBestAsk] = useState(null);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [webSocketData, setWebSocketData] = useState({});
  const ws = useRef(null);
  const wsConnected = useRef(false);

  const url = 'https://api.pro.coinbase.com';

  useEffect(() => {
    const initializeWebSocket = () => {
      ws.current = new WebSocket('wss://ws-feed.pro.coinbase.com');

      ws.current.onopen = () => {
        console.log('WebSocket connection opened');
        wsConnected.current = true;
        if (pair) {
          const subscribeMsg = {
            type: 'subscribe',
            product_ids: [pair],
            channels: ['level2_batch']
          };
          ws.current.send(JSON.stringify(subscribeMsg));
        }
      };

      ws.current.onclose = () => {
        console.log('WebSocket connection closed');
        wsConnected.current = false;
        setTimeout(initializeWebSocket, 1000);
      };

      ws.current.onmessage = (e) => {
        console.log('WebSocket message received');
        const data = JSON.parse(e.data);
        setWebSocketData(data);
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        ws.current.close();
      };
    };

    initializeWebSocket();

    const apiCall = async () => {
      const response = await fetch(url + '/products');
      const data = await response.json();
      const filtered = data.filter((pair) => pair.quote_currency === 'USD')
                            .sort((a, b) => a.base_currency.localeCompare(b.base_currency));
      setCurrencies(filtered);
    };

    apiCall();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleL2Update = useCallback((data) => {
    console.log('L2 Update Data:', data);
    let updatedBids = [...orderBook.bids];
    let updatedAsks = [...orderBook.asks];

    data.changes.forEach((change) => {
      const [side, priceStr, sizeStr] = change;
      const price = parseFloat(priceStr);
      const size = parseFloat(sizeStr);

      if (side === 'buy') {
        if (size === 0) {
          updatedBids = updatedBids.filter((bid) => bid.price !== price);
        } else {
          const existingBidIndex = updatedBids.findIndex((bid) => bid.price === price);
          if (existingBidIndex >= 0) {
            updatedBids[existingBidIndex].size = size;
          } else {
            updatedBids.push({ price, size });
          }
        }
      } else if (side === 'sell') {
        if (size === 0) {
          updatedAsks = updatedAsks.filter((ask) => ask.price !== price);
        } else {
          const existingAskIndex = updatedAsks.findIndex((ask) => ask.price === price);
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

    if (updatedBids.length > 0) {
      setBestBid(updatedBids[0]);
    }
    if (updatedAsks.length > 0) {
      setBestAsk(updatedAsks[0]);
    }
  }, [orderBook.bids, orderBook.asks]);

  useEffect(() => {
    if (!pair) return;

    const unsubscribeMsg = {
      type: 'unsubscribe',
      product_ids: [pair],
      channels: ['level2_batch']
    };

    const subscribeMsg = {
      type: 'subscribe',
      product_ids: [pair],
      channels: ['level2_batch']
    };

    if (ws.current && wsConnected.current) {
      ws.current.send(JSON.stringify(subscribeMsg));
    }

    const fetchHistoricalData = async () => {
      const historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
      const response = await fetch(historicalDataURL);
      const data = await response.json();
      setPastData(data);
    };

    fetchHistoricalData();

    return () => {
      if (ws.current && wsConnected.current) {
        ws.current.send(JSON.stringify(unsubscribeMsg));
      }
    };
  }, [pair, handleL2Update]);

  useEffect(() => {
    if (webSocketData.type && webSocketData.type === 'l2update' && webSocketData.product_id && webSocketData.product_id === pair) {
      handleL2Update(webSocketData);
    }
  }, [handleL2Update, pair, webSocketData]);

  const handleSelect = (value) => {
    setPair(value);
  };

  return { currencies, pair, pastData, handleSelect, bestBid, bestAsk, orderBook };
};

export default useWebSocket;
