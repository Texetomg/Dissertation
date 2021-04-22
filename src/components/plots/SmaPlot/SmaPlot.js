import React from 'react'
import Plot from 'react-plotly.js'
import { Divider} from '@material-ui/core'

const SmaPlot = ({ mainData, smaData }) => {
  if (mainData && smaData)  {
 
    const formattedSmaData = smaData.reduce((acc, curr) => (
      {
        avgs: [...acc.avgs, curr.avg],
        timesstamps: [...acc.timesstamps, curr.timestamp]
      }
    ), {avgs: [], timesstamps: []})
 
    return (
      <>
        <Divider />
        <Plot
          data={[
            {
              x: mainData.timesstamps,
              y: mainData.prices,
              type: 'graph_plot',
              mode: 'lines',
              name: 'Stock price'
            }, {
              x: formattedSmaData.timesstamps,
              y: formattedSmaData.avgs,
              type: 'graph_plot',
              mode: 'lines',
              name: 'SMA'
            }
          ]}
          layout={{
            width: 920,
            height: 440,
            title: `Stock price and SMA`
          }}
        />
      </>
    )
  }
  return null
}

export default SmaPlot
