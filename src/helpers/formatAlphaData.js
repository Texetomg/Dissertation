export const formatData = (data) => {
  const keys = Object.keys(data)
  const result = {
    symbol: '',
    lastRefreshed: '',
    timesstamps: [],
    prices: []
  }
  result.symbol = data[keys[0]]['2. Symbol']
  result.lastRefreshed = data[keys[0]]['3. Last Refreshed']
  for (let date in data[keys[1]]) {
    result.timesstamps.push(date)
    result.prices.push(data[keys[1]][date]['4. close'])
  }
  return result
}