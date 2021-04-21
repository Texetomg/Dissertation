import React from 'react'
import Plot from 'react-plotly.js'
import { Divider} from '@material-ui/core'

const AlphaPlot = ({ data }) => {
  const keys = Object.keys(data)

  const formatData = (data, keys) => {
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

  if (keys.length > 0)  {
    const formattedData = formatData(data, keys)
    return (
      <>
        <Divider />
        <Plot
          data={[
            {
              x: formattedData.timesstamps,
              y: formattedData.prices,
              type: 'graph_plot',
              mode: 'lines',
              marker: {color: 'red'},
            }
          ]}
          layout={{
            width: 920,
            height: 440,
            title: `${formattedData.symbol} (last refreshed: ${formattedData.lastRefreshed})`
          }}
        />
      </>
    )
  }
  return null
}

export default AlphaPlot
