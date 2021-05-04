import React from 'react'
import Plot from 'react-plotly.js'
import { Divider} from '@material-ui/core'

const ValidationPlot = ({ mainData, smaData, validateData }) => {
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
            }, {
              x: validateData.trainTimesstamps,
              y: validateData.trainData,
              type: 'graph_plot',
              mode: 'lines',
              name: 'Predicted (train)'
            }, {
              x: validateData.unseenTimesstamps,
              y: validateData.unseenData,
              type: 'graph_plot',
              mode: 'lines',
              name: 'Predicted (test)'
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

export default ValidationPlot
