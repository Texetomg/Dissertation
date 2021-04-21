import React from 'react'
import Plot from 'react-plotly.js'
import { Divider} from '@material-ui/core'

const AlphaPlot = ({ data }) => {
  if (data)  {
    return (
      <>
        <Divider />
        <Plot
          data={[
            {
              x: data.timesstamps,
              y: data.prices,
              type: 'graph_plot',
              mode: 'lines',
              name: 'Stock price'
            }
          ]}
          layout={{
            width: 920,
            height: 440,
            title: `${data.symbol} (last refreshed: ${data.lastRefreshed})`
          }}
        />
      </>
    )
  }
  return null
}

export default AlphaPlot
