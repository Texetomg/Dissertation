import React from 'react'
import Plot from 'react-plotly.js'
import { Divider} from '@material-ui/core'

const TrainPlot = ({ trainData }) => {
  if (trainData)  {
    return (
      <>
        <Divider />
        <Plot
          data={[
            {
              x: trainData.x,
              y: trainData.y,
              type: 'graph_plot',
              mode: 'lines'
            }
          ]}
          layout={{
            width: 920,
            height: 440,
            title: `Training Model`
          }}
        />
      </>
    )
  }
  return null
}

export default TrainPlot
