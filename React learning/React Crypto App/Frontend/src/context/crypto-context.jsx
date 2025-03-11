import { createContext, useState, useEffect, useContext } from "react";
import { fakeFecthPortfolio, fakeFetchCrypto } from "../api.js";
import { percentDifference } from "../utils.js";
import { v4 as uuidv4 } from 'uuid';

const CryptoContext = createContext({
  portfolio: [],
  cryptoData: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [cryptoData, setCryptoData] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  function mapPortfolio(portfolio, result) {
    return portfolio.map((elem) => {
      const coin = result.find((c) => c.name === elem.name);
      return {
        ...elem,
        grow: elem.price < coin.price,
        difference: percentDifference(elem.price, coin.price),
        totalAmount: elem.amount * coin.price,
        totalProfit: elem.amount * coin.price - elem.amount * elem.price,
        key: uuidv4(), // Генерация уникального ключа
      };
    });
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await fakeFetchCrypto();
      const portfolio = await fakeFecthPortfolio();

      setCryptoData(result);
      setPortfolio(mapPortfolio(portfolio, result));
      setLoading(false);
    }

    fetchData();
  }, []);

  function addPortfolioCoin(portfolioCoin) {
    setPortfolio((prev) => mapPortfolio([...prev, portfolioCoin], cryptoData))
  }

  return (
    <CryptoContext.Provider
      value={{ loading, cryptoData, portfolio, addPortfolioCoin }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
