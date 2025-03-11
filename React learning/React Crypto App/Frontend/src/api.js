import { cryptoData, portfolioData } from "./data.js"
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': 'cGbUvTINRyCAXFpo90abYTKULDrYf9a7RaSruqgl4TQ='
    }
  };

export async function fakeFetchCrypto() {
    try{
    const response = await fetch("https://openapiv1.coinstats.app/coins", options)
    const { result } = await response.json()
    return result
    }
    catch(error) {
        alert(error)
    }
}

export function fakeFecthPortfolio() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(portfolioData)
        }, 2)
    })
}